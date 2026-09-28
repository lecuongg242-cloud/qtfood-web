import { Container, Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/form/LeadForm";
import { Check, Phone, Zalo } from "@/components/ui/icons";

export type LeadFormSectionProps = {
  tone?: Tone;
  id?: string;
  kind: "franchise" | "contact";
  eyebrow: string;
  title: string;
  description: string;
  points?: string[];
  hotlines: { number: string; display: string; contact: string }[];
  zalo: string;
  provinces?: string[];
  budgets?: string[];
  topics?: string[];
};

export function LeadFormSection({
  tone = "brand",
  id,
  kind,
  eyebrow,
  title,
  description,
  points,
  hotlines,
  zalo,
  provinces,
  budgets,
  topics,
}: LeadFormSectionProps) {
  return (
    <Section tone={tone} id={id} className="scroll-mt-20 py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          {points && (
            <ul className="mt-8 space-y-3">
              {points.map((p) => (
                <li key={p} data-reveal className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-btn text-btn-ink">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          )}
          <div data-reveal className="mt-10 space-y-3">
            {hotlines.map((h) => (
              <a
                key={h.number}
                href={`tel:${h.number}`}
                className="flex items-center gap-4 rounded-2xl border border-line bg-card px-5 py-4 transition-colors duration-300 hover:border-[#4cb448]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-btn text-btn-ink">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-lg font-extrabold tracking-tight">{h.display}</span>
                  <span className="text-sm text-muted">{h.contact}</span>
                </span>
              </a>
            ))}
            <a
              href={zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-line bg-card px-5 py-4 transition-colors duration-300 hover:border-[#0068ff]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#0068ff] text-white">
                <Zalo className="text-[0.7rem]" />
              </span>
              <span className="font-bold">Nhắn tin Zalo</span>
            </a>
          </div>
        </div>
        <div data-reveal>
          <LeadForm kind={kind} provinces={provinces} budgets={budgets} topics={topics} hotline={hotlines[0]} />
        </div>
      </Container>
    </Section>
  );
}
