import type { Block } from "@/blocks";
import { content, formatDate, formatPrice, franchiseGallery, img, productBySlug } from "../data";

const { company, home, about, franchise } = content;
const iso = content.certifications[0];

const productHref = (slug: string) => {
  const p = productBySlug(slug);
  return `/san-pham/${p?.category ?? "mon-an"}/${slug}`;
};

const processed = content.products.filter((p) => p.category === "che-bien-san");
const benefits = franchise.sections.find((s) => s.items)?.items ?? [];

export const homeBlocks: Block[] = [
  {
    type: "hero",
    props: {
      eyebrow: "Đặc sản thịt ngựa vùng đất Tổ",
      title: "Thương hiệu nhượng quyền *Lẩu ngựa* & *Phở ngựa*",
      lead:
        "Từ nguồn thịt ngựa tươi sạch tuyển chọn kỹ lưỡng, QT FOOD mang đến Lẩu ngựa, Phở ngựa cùng các đặc sản Nem, Giò, Mọc ngựa — không chỉ thơm ngon mà còn bổ dưỡng.",
      primary: { label: "Đăng ký nhượng quyền", href: "/nhuong-quyen" },
      secondary: { label: "Khám phá sản phẩm", href: "/san-pham" },
      stats: [
        { value: 50, suffix: "+", label: "cơ sở nhượng quyền" },
        { value: 100, suffix: "%", label: "thịt ngựa tươi sạch" },
        { value: content.products.length, suffix: "", label: "đặc sản từ thịt ngựa" },
      ],
      images: {
        main: img("products/pho-ngua-3.jpg"),
        mainAlt: "Phở ngựa QT FOOD",
        secondary: img("products/lau-ngua-3.jpg"),
        secondaryAlt: "Lẩu ngựa QT FOOD",
      },
      badge: "Không chỉ thơm ngon • mà còn bổ dưỡng •",
      decor: img("decor/nui-doi-ruong-bac-thang.jpg"),
    },
  },
  {
    type: "featuredProducts",
    props: {
      eyebrow: "Sản phẩm nổi bật",
      title: "Hương vị *đặc sản* làm nên thương hiệu",
      description:
        "Ba món làm nên tên tuổi QT FOOD — phục vụ tại hơn 50 cơ sở nhượng quyền và đóng gói mang về cho mọi gia đình.",
      items: home.featured.map((f) => ({
        title: f.title,
        text: f.text,
        image: img(f.image),
        href: productHref(f.product),
        tag: productBySlug(f.product)?.category === "mon-an" ? "Món tại quán" : "Chế biến sẵn",
      })),
    },
  },
  {
    type: "commitments",
    props: {
      tone: "alt",
      eyebrow: "Cam kết",
      title: "Bốn cam kết trong *từng sản phẩm*",
      items: home.commitments,
    },
  },
  {
    type: "certifications",
    props: {
      tone: "base",
      eyebrow: "Chứng nhận",
      title: "Chứng nhận và *cam kết chất lượng*",
      description: `Hệ thống quản lý an toàn thực phẩm của ${iso.holder} được đánh giá và chứng nhận phù hợp tiêu chuẩn ${iso.standard}.`,
      standard: iso.standard,
      standardName: iso.name,
      facts: [
        { label: "Số chứng nhận", value: iso.number },
        { label: "Đơn vị cấp", value: iso.issuer },
        { label: "Phạm vi", value: iso.scope },
        { label: "Hiệu lực", value: `${formatDate(iso.issued)} – ${formatDate(iso.expires)}` },
        { label: "Giám sát", value: iso.surveillance },
      ],
      documents: iso.documents.map((d) => ({ title: d.title, image: img(d.image), width: 898, height: 1280 })),
    },
  },
  {
    type: "aboutTeaser",
    props: {
      tone: "alt",
      eyebrow: "Về QT FOOD",
      title: "Tiên phong đặc sản *thịt ngựa tươi*",
      intro: about.intro,
      image: img(about.teamPhoto),
      imageAlt: "Đội ngũ QT FOOD",
      lines: about.businessLines.items,
      quote: {
        text: `${company.ceo.quote[0].keyword} là ${company.ceo.quote[0].text.replace(/^Là /, "").toLowerCase()}. ${company.ceo.quote[1].keyword} là ${company.ceo.quote[1].text.replace(/^Là /, "").toLowerCase()}.`,
        author: company.ceo.name,
        role: company.ceo.title,
      },
      cta: { label: "Câu chuyện QT FOOD", href: "/gioi-thieu" },
    },
  },
  {
    type: "productList",
    props: {
      tone: "base",
      eyebrow: "Chế biến sẵn",
      title: "Mua về thưởng thức, *làm quà biếu*",
      description: "Đóng gói hút chân không tiện lợi, giữ trọn vị ngon — giao tận nơi trên toàn quốc.",
      cta: { label: "Xem tất cả sản phẩm", href: "/san-pham" },
      items: processed.map((p) => ({
        name: p.name,
        href: productHref(p.slug),
        image: img(p.images[0]),
        summary: p.summary,
        price: p.specs?.price ? formatPrice(p.specs.price) : undefined,
        unit: p.specs?.priceUnit,
        meta: [p.specs?.netWeight && `KLT ${p.specs.netWeight}`, p.specs?.shelfLife && `HSD ${p.specs.shelfLife.replace(/ (kể )?từ.*/, "")}`].filter(
          Boolean,
        ) as string[],
      })),
    },
  },
  {
    type: "coreValues",
    props: {
      tone: "alt",
      eyebrow: "Giá trị cốt lõi",
      statement: "Xây dựng QT FOOD trên *4 chữ vàng* — Tín, Tâm, Tinh, Tiến.",
      items: about.coreValues.items,
    },
  },
  {
    type: "franchiseTeaser",
    props: {
      eyebrow: "Nhượng quyền thương hiệu",
      stat: { value: 50, suffix: "+", label: "cơ sở" },
      title: "cơ sở nhượng quyền — *kết nối đam mê*, bứt phá thành công",
      intro:
        "Mô hình Lẩu ngựa – Phở ngựa đã được kiểm chứng trên khắp các tỉnh thành. QT FOOD đồng hành cùng đối tác từ chọn mặt bằng, đào tạo, nguồn nguyên liệu đến marketing.",
      benefits,
      gallery: franchiseGallery(),
      primary: { label: "Nhận hồ sơ nhượng quyền", href: "/nhuong-quyen" },
      secondary: { label: "Chính sách nhượng quyền", href: "/nhuong-quyen/chinh-sach" },
    },
  },
  {
    type: "contactCta",
    props: {
      eyebrow: "Liên hệ",
      title: "Sẵn sàng *đồng hành* cùng QT FOOD?",
      description: "Gọi ngay để được tư vấn nhượng quyền, đặt hàng sỉ lẻ hoặc giải đáp mọi thắc mắc.",
      image: img("products/nem-ngua-dia-1.jpg"),
      hotlines: company.hotlines,
      email: company.email,
      address: company.address,
      zalo: company.social.zalo[0].url,
    },
  },
];
