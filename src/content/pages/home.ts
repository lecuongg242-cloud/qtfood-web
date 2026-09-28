import type { Block } from "@/blocks";
import type { SiteData } from "../types";
import { content, franchiseGallery, img } from "../data";
import { certificationsBlock } from "./shared";
import type { PostCardData } from "@/components/post/PostCard";
import { productMeta } from "@/components/product/ProductCard";
import type { ProductView } from "@/lib/data/products";

const { home, about, franchise } = content;

const benefits = franchise.sections.find((s) => s.items)?.items ?? [];

/**
 * Trang chủ — `site`: dữ liệu chung từ admin (công ty, chứng nhận, số liệu); `posts`: 3 bài mới nhất;
 * `products`: sản phẩm đã xuất bản trong CMS (món mới tự hiện ở "Nổi bật" / "Chế biến sẵn").
 */
export const homeBlocks = ({ company, certification, stats }: SiteData, posts: PostCardData[], products: ProductView[]): Block[] => [
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
        { value: stats.stores, suffix: "+", label: "cơ sở nhượng quyền" },
        { value: 100, suffix: "%", label: "thịt ngựa tươi sạch" },
        { value: stats.products, suffix: "", label: "đặc sản từ thịt ngựa" },
      ],
      images: {
        main: img("products/pho-ngua-3.jpg"),
        mainAlt: "Phở ngựa QT FOOD",
        secondary: img("products/lau-ngua-3.jpg"),
        secondaryAlt: "Lẩu ngựa QT FOOD",
      },
      badge: "QT FOOD • QT FOOD • QT FOOD • QT FOOD •",
      decor: img("decor/nui-doi-ruong-bac-thang.jpg"),
    },
  },
  {
    type: "featuredProducts",
    props: {
      eyebrow: "Sản phẩm nổi bật",
      title: "Hương vị *đặc sản* làm nên thương hiệu",
      description:
        `Những món làm nên tên tuổi QT FOOD — phục vụ tại hơn ${stats.stores} cơ sở nhượng quyền và đóng gói mang về cho mọi gia đình.`,
      // Sản phẩm bật "Nổi bật ở trang chủ" (tối đa 3); món gốc dùng đoạn giới thiệu & ảnh đã biên tập trong qtfood.json
      items: products
        .filter((p) => p.featured)
        .slice(0, 3)
        .map((p) => {
          const curated = home.featured.find((f) => f.product === p.slug);
          const image = curated ? img(curated.image) : (p.images[1] ?? p.images[0])?.src;
          return {
            title: p.name,
            text: curated?.text ?? p.summary,
            image: image ?? img("brand/banner-nhuong-quyen-lau-pho-ngua.jpg"),
            href: p.href,
            tag: p.category.slug === "mon-an" ? "Món tại quán" : "Chế biến sẵn",
          };
        }),
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
  ...certificationsBlock(certification, "base"),
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
      items: products
        .filter((p) => p.category.slug === "che-bien-san")
        .map((p) => ({
          name: p.name,
          href: p.href,
          image: p.images[0]?.src ?? img("brand/banner-nhuong-quyen-lau-pho-ngua.jpg"),
          summary: p.summary,
          price: p.priceLabel,
          unit: p.specs.priceUnit ?? undefined,
          meta: productMeta(p.specs),
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
      stat: { value: stats.stores, suffix: "+", label: "cơ sở" },
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
    type: "newsList",
    props: {
      tone: "base",
      eyebrow: "Tin tức & hoạt động",
      title: "Câu chuyện *QT FOOD*",
      posts,
      cta: { label: "Xem tất cả tin tức", href: "/tin-tuc" },
    },
  },
  {
    type: "contactCta",
    props: {
      tone: posts.length ? "alt" : "base",
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
