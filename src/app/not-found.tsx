import { Container, Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { HorseMark } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <Section tone="hero" className="flex min-h-[80svh] items-center pb-20 pt-40">
      <Container className="text-center">
        <HorseMark className="mx-auto h-16 w-auto text-[#4cb448]" />
        <h1 className="mt-8 text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold tracking-tight">Trang đang được xây dựng</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          Nội dung này sẽ sớm ra mắt. Trong lúc chờ, mời bạn quay lại trang chủ.
        </p>
        <div className="mt-9">
          <Button href="/">Về trang chủ</Button>
        </div>
      </Container>
    </Section>
  );
}
