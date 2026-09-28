import { Container, Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type StepsProps = {
  tone?: Tone;
  eyebrow?: string;
  title: string;
  description?: string;
  items: { title: string; text: string }[];
};

/** Quy trình theo bước — đường nối "vẽ" dần theo cuộn (data-draw). */
export function Steps({ tone = "alt", eyebrow, title, description, items }: StepsProps) {
  return (
    <Section tone={tone} className="py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <ol className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-6">
          {/* đường nối ngang (desktop) / dọc (mobile) */}
          <span aria-hidden className="absolute left-[27px] top-2 h-[calc(100%-2rem)] w-0.5 bg-[var(--line)] lg:left-0 lg:top-[27px] lg:h-0.5 lg:w-full" />
          <span
            aria-hidden
            data-draw
            className="absolute left-[27px] top-2 h-[calc(100%-2rem)] w-0.5 origin-top bg-[#4cb448] lg:left-0 lg:top-[27px] lg:h-0.5 lg:w-full lg:origin-left"
          />
          {items.map((step, i) => (
            <li key={step.title} data-reveal className="relative grid grid-cols-[56px_1fr] gap-5 lg:block">
              <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border-2 border-[#4cb448] bg-bg text-lg font-extrabold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="lg:mt-6">
                <h3 className="text-lg font-extrabold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
