import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { HorseMark } from "@/components/ui/icons";

export const metadata: Metadata = { title: "Không tìm thấy trang", robots: { index: false } };

const links = [
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Nhượng quyền", href: "/nhuong-quyen" },
  { label: "Hệ thống cơ sở", href: "/he-thong-co-so" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

export default function NotFound() {
  return (
    <Section tone="hero" className="flex min-h-[80svh] items-center pb-20 pt-40">
      <Container className="text-center">
        <HorseMark className="mx-auto h-16 w-auto text-[#4cb448]" />
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-accent">Lỗi 404</p>
        <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold tracking-tight text-balance">Không tìm thấy trang</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted text-pretty">
          Trang bạn tìm có thể đã được đổi địa chỉ hoặc không còn tồn tại. Mời bạn quay lại trang chủ hoặc xem các mục dưới đây.
        </p>
        <div className="mt-9">
          <Button href="/">Về trang chủ</Button>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[0.95rem] font-semibold">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="link-underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
