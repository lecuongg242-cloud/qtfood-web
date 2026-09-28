import { Container, Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { ShieldCheck } from "@/components/ui/icons";

export type CertificationsProps = {
  tone?: Tone;
  eyebrow: string;
  title: string;
  description: string;
  standard: string;
  standardName: string;
  facts: { label: string; value: string }[];
  documents: { title: string; image: string; width: number; height: number }[];
};

export function Certifications({
  tone = "alt",
  eyebrow,
  title,
  description,
  standard,
  standardName,
  facts,
  documents,
}: CertificationsProps) {
  return (
    <Section tone={tone} className="py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" />

        <div className="mt-16 grid items-center gap-12 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.15fr] lg:gap-10">
          {documents.map((doc, i) => (
            <div key={doc.image} data-reveal className="mx-auto w-full max-w-[340px]">
              <DocumentCard
                src={doc.image}
                title={doc.title}
                width={doc.width}
                height={doc.height}
                tilt={i % 2 === 0 ? "left" : "right"}
              />
            </div>
          ))}

          <aside data-reveal className="rounded-[1.75rem] border border-line bg-card p-8 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-btn text-btn-ink">
                <ShieldCheck className="h-7 w-7" />
              </span>
              <div>
                <p className="text-2xl font-extrabold tracking-tight">{standard}</p>
                <p className="text-sm font-semibold text-accent">{standardName}</p>
              </div>
            </div>
            <dl className="mt-7 divide-y divide-[var(--line)] border-t border-line">
              {facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5 text-[0.95rem]">
                  <dt className="text-muted">{f.label}</dt>
                  <dd className="font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
