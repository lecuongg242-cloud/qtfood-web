import { Container, Section, type Tone } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { HorseMark } from "@/components/ui/icons";

export type VisionMissionProps = {
  tone?: Tone;
  vision: string;
  missions: { to: string; text: string }[];
};

export function VisionMission({ tone = "alt", vision, missions }: VisionMissionProps) {
  return (
    <Section tone={tone} className="overflow-hidden py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.35fr_1fr] lg:gap-16">
          <div data-reveal>
            <Eyebrow>Tầm nhìn</Eyebrow>
          </div>
          <blockquote className="relative">
            <HorseMark className="absolute -left-2 -top-10 h-20 w-auto text-[#4cb448]/15 sm:-top-12 sm:h-28" />
            <p
              data-split
              className="relative text-[clamp(1.2rem,3.2vw,2.6rem)] font-bold leading-[1.45] tracking-[-0.01em] text-pretty lg:font-extrabold lg:leading-[1.28] lg:tracking-[-0.02em] lg:text-balance"
            >
              {vision}
            </p>
          </blockquote>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[0.35fr_1fr] lg:gap-16">
          <div data-reveal>
            <Eyebrow>Sứ mệnh</Eyebrow>
          </div>
          <ol className="grid gap-5 md:grid-cols-3">
            {missions.map((m, i) => (
              <li
                key={m.to}
                data-reveal
                className="rounded-[1.5rem] border border-line bg-card p-7 transition-transform duration-500 ease-[var(--ease-soft)] hover:-translate-y-1.5"
              >
                <span className="text-sm font-extrabold text-accent">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-extrabold tracking-tight">{m.to}</h3>
                <p className="mt-3 leading-relaxed text-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
