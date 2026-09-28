/**
 * Nhập dữ liệu ban đầu từ content/qtfood.json (+ posts.json, policies.json) vào Payload.
 * Chạy: pnpm seed   (chạy lại nhiều lần được — chỉ tạo phần còn thiếu, KHÔNG ghi đè dữ liệu đã sửa trong admin;
 *                    sản phẩm đã có mà chưa có ảnh thì được bổ sung ảnh)
 *       SEED_OVERWRITE=1 pnpm seed   → ghi đè thông tin chung, nhóm & sản phẩm bằng dữ liệu trong content/ (cẩn thận trên production)
 * Ảnh chỉ được tải lên khi đã có BLOB_READ_WRITE_TOKEN (Vercel Blob).
 */
import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import config from "../payload.config";
import { nav, primaryCta } from "../content/site";

type BodyBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list" | "checklist"; items: string[] };
type SeedProduct = {
  slug: string;
  category: string;
  name: string;
  headline?: string;
  summary: string;
  highlights?: string[];
  body?: BodyBlock[];
  specs?: { netWeight?: string; shelfLife?: string; storage?: string; usage?: string; price?: number; priceUnit?: string };
  images: string[];
};

const root = process.cwd();
const readJson = (file: string) => JSON.parse(fs.readFileSync(path.join(root, "content", file), "utf8"));
const data = readJson("qtfood.json");
type SeedPost = { slug: string; title: string; category: string; publishedAt: string; cover: string; excerpt: string; body: BodyBlock[] };
type SeedPolicy = { slug: string; title: string; summary: string; body: BodyBlock[] };

// ---------- Lexical ----------
const base = { direction: "ltr" as const, format: "" as const, indent: 0, version: 1 };
const text = (value: string) => ({ type: "text", text: value, format: 0, detail: 0, mode: "normal", style: "", version: 1 });
const toLexical = (blocks: BodyBlock[]) => ({
  root: {
    ...base,
    type: "root",
    children: blocks.map((b) => {
      if (b.type === "p") return { ...base, type: "paragraph", textFormat: 0, textStyle: "", children: [text(b.text)] };
      if (b.type === "h2" || b.type === "h3") return { ...base, type: "heading", tag: b.type, children: [text(b.text)] };
      return {
        ...base,
        type: "list",
        listType: "bullet",
        tag: "ul",
        start: 1,
        children: b.items.map((item, i) => ({ ...base, type: "listitem", value: i + 1, children: [text(item)] })),
      };
    }),
  },
});

async function run() {
  const payload = await getPayload({ config });
  const log = (msg: string) => payload.logger.info(`[seed] ${msg}`);
  const canUpload = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  const overwrite = process.env.SEED_OVERWRITE === "1";

  // 1. Thông tin chung (chỉ khi chưa nhập)
  const c = data.company;
  const current = await payload.findGlobal({ slug: "site-settings", depth: 0 });
  if (current.legalName && !overwrite) log("Thông tin chung (đã có, bỏ qua)");
  else await payload.updateGlobal({
    slug: "site-settings",
    data: {
      legalName: c.legalName,
      brand: c.brand,
      positioning: c.positioning,
      slogan: c.slogan,
      tagline: c.tagline,
      taxCode: c.taxCode,
      email: c.email,
      address: c.address,
      geo: c.geo,
      hotlines: c.hotlines,
      facebook: c.social.facebook,
      tiktok: c.social.tiktok,
      zalo: c.social.zalo,
      nav,
      primaryCta,
    },
  });
  if (!current.legalName || overwrite) log("Thông tin chung ✓");

  // 2. Nhóm sản phẩm
  const categoryIds: Record<string, number | string> = {};
  for (const [i, cat] of (data.productCategories as { slug: string; name: string; note: string }[]).entries()) {
    const found = await payload.find({ collection: "product-categories", where: { slug: { equals: cat.slug } }, limit: 1 });
    const doc = found.docs[0] && !overwrite
      ? found.docs[0]
      : found.docs[0]
      ? await payload.update({ collection: "product-categories", id: found.docs[0].id, data: { name: cat.name, note: cat.note, order: i } })
      : await payload.create({ collection: "product-categories", data: { name: cat.name, slug: cat.slug, note: cat.note, order: i } });
    categoryIds[cat.slug] = doc.id;
  }
  log(`Nhóm sản phẩm: ${Object.keys(categoryIds).length} ✓`);

  // 3. Ảnh (chỉ khi có Vercel Blob)
  const mediaIds = new Map<string, number | string>();
  const uploadImage = async (rel: string, alt: string) => {
    if (!canUpload) return undefined;
    if (mediaIds.has(rel)) return mediaIds.get(rel);
    const filename = path.basename(rel);
    const existing = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1 });
    const doc = existing.docs[0] ?? (await payload.create({ collection: "media", data: { alt }, filePath: path.join(root, "public/images", rel) }));
    mediaIds.set(rel, doc.id);
    return doc.id;
  };

  // 4. Sản phẩm
  const featured = new Set((data.home.featured as { product: string }[]).map((f) => f.product));
  for (const [i, p] of (data.products as SeedProduct[]).entries()) {
    const images = (await Promise.all(p.images.map((img, n) => uploadImage(img, `${p.name} – ảnh ${n + 1}`)))).filter(
      (id): id is number | string => id !== undefined,
    );
    const doc = {
      name: p.name,
      slug: p.slug,
      headline: p.headline,
      summary: p.summary,
      highlights: (p.highlights ?? []).map((t) => ({ text: t })),
      body: p.body?.length ? toLexical(p.body) : undefined,
      specs: p.specs ?? {},
      category: categoryIds[p.category],
      featured: featured.has(p.slug),
      // Phạm vi ISO 22000:2018 (WCERT): sản xuất & kinh doanh nem lợn, nem ngựa
      isoBadge: p.slug === "nem-ngua",
      order: i,
      _status: "published" as const,
      ...(images.length ? { images } : {}),
    };
    const found = await payload.find({ collection: "products", where: { slug: { equals: p.slug } }, limit: 1, draft: true });
    const existing = found.docs[0];
    if (!existing) {
      await payload.create({ collection: "products", data: doc as never });
      log(`Sản phẩm: ${p.name}${images.length ? ` (${images.length} ảnh)` : ""} ✓`);
    } else if (overwrite) {
      await payload.update({ collection: "products", id: existing.id, data: doc as never });
      log(`Sản phẩm: ${p.name} (ghi đè) ✓`);
    } else if (!existing.images?.length && images.length) {
      await payload.update({ collection: "products", id: existing.id, data: { images } as never });
      log(`Sản phẩm: ${p.name} (bổ sung ${images.length} ảnh) ✓`);
    } else {
      log(`Sản phẩm: ${p.name} (đã có, bỏ qua)`);
    }
  }

  // 5. Tin tức (chỉ tạo mới — không ghi đè bài đã sửa trong admin)
  for (const p of readJson("posts.json").posts as SeedPost[]) {
    const found = await payload.find({ collection: "posts", where: { slug: { equals: p.slug } }, limit: 1, draft: true });
    if (found.docs[0]) {
      log(`Bài viết: ${p.title} (đã có, bỏ qua)`);
      continue;
    }
    const cover = await uploadImage(p.cover, p.title);
    await payload.create({
      collection: "posts",
      data: {
        title: p.title,
        slug: p.slug,
        category: p.category as "tin-tuc",
        publishedAt: new Date(p.publishedAt).toISOString(),
        excerpt: p.excerpt,
        body: toLexical(p.body) as never,
        _status: "published",
        ...(cover ? { cover } : {}),
      } as never,
    });
    log(`Bài viết: ${p.title} ✓`);
  }

  // 6. Chính sách chung (chỉ tạo mới)
  for (const [i, p] of (readJson("policies.json").policies as SeedPolicy[]).entries()) {
    const found = await payload.find({ collection: "policies", where: { slug: { equals: p.slug } }, limit: 1 });
    if (found.docs[0]) {
      log(`Chính sách: ${p.title} (đã có, bỏ qua)`);
      continue;
    }
    await payload.create({
      collection: "policies",
      data: { title: p.title, slug: p.slug, summary: p.summary, body: toLexical(p.body) as never, order: i },
    });
    log(`Chính sách: ${p.title} ✓`);
  }

  // 7. Chứng nhận — cần ảnh văn bản (Blob); chưa có Blob thì website dùng tạm dữ liệu trong qtfood.json
  type SeedCert = { standard: string; name: string; holder: string; number: string; decision: string; issuer: string; scope: string; location: string; issued: string; expires: string; surveillance: string; documents: { title: string; image: string }[] };
  for (const [i, c] of (data.certifications as SeedCert[]).entries()) {
    const found = await payload.find({ collection: "certifications", where: { number: { equals: c.number } }, limit: 1 });
    if (found.docs[0]) {
      log(`Chứng nhận: ${c.standard} (đã có, bỏ qua)`);
      continue;
    }
    if (!canUpload) {
      log(`Chứng nhận: ${c.standard} — chờ Vercel Blob để tải ảnh văn bản`);
      continue;
    }
    const documents = [];
    for (const d of c.documents) documents.push({ title: d.title, image: (await uploadImage(d.image, d.title)) as number });
    // Ngày chỉ có ngày → lưu 12:00 giờ VN để không lệch ngày khi đổi múi giờ
    const at = (day: string) => new Date(`${day}T12:00:00+07:00`).toISOString();
    await payload.create({
      collection: "certifications",
      data: {
        standard: c.standard,
        name: c.name,
        holder: c.holder,
        number: c.number,
        decision: c.decision,
        issuer: c.issuer,
        scope: c.scope,
        location: c.location,
        surveillance: c.surveillance,
        issuedAt: at(c.issued),
        expiresAt: at(c.expires),
        documents,
        active: true,
        order: i,
      },
    });
    log(`Chứng nhận: ${c.standard} ✓`);
  }

  if (!canUpload) log("Chưa có BLOB_READ_WRITE_TOKEN → bỏ qua ảnh. Chạy lại `pnpm seed` sau khi gắn Vercel Blob để tải ảnh lên.");
  log("Hoàn tất.");
  process.exit(0);
}

// `payload run` thoát ngay sau khi import → phải await ở top-level
try {
  await run();
} catch (err) {
  console.error(err);
  process.exit(1);
}
