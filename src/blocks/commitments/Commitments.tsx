import { Container, Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { commitmentIcons } from "@/components/ui/icons";

export type CommitmentsProps = {
  tone?: Tone;
  eyebrow: string;
  title: string;
  items: { title: string; subtitle: string; text: string }[];
};

export function Commitments({ tone = "alt", eyebrow, title, items }: CommitmentsProps) {
  return (
    <Section tone={tone} className="py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} align="center" />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = commitmentIcons[i % commitmentIcons.length];
            return (
              <article
                key={item.title}
                data-reveal
                className="group relative overflow-hidden rounded-[1.5rem] border border-line bg-card p-7 transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-2 hover:shadow-[0_24px_48px_-24px_rgb(16_36_15/0.35)]"
              >
                <span className="relative grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-[#4cb448]/12 text-accent transition-colors duration-500 group-hover:text-[#0f230f]">
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-[#4cb448] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
                  <Icon className="relative h-8 w-8" />
                </span>
                <h3 className="mt-7 text-[1.65rem] font-extrabold uppercase leading-none tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm font-bold uppercase tracking-[0.14em] text-accent">{item.subtitle}</p>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{item.text}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
