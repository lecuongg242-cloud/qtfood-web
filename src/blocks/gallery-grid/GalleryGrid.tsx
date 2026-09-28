import { Container, Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGridClient } from "./GalleryGridClient";

export type GalleryGridProps = {
  tone?: Tone;
  eyebrow?: string;
  title: string;
  description?: string;
  images: { src: string; alt: string }[];
  /** số ảnh hiện ban đầu; còn lại mở bằng nút "Xem thêm" */
  initial?: number;
};

export function GalleryGrid({ tone = "base", eyebrow, title, description, images, initial = 12 }: GalleryGridProps) {
  return (
    <Section tone={tone} className="py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" />
        <GalleryGridClient images={images} initial={initial} />
      </Container>
    </Section>
  );
}
