import { Container, Section, type Tone } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/slugify";
import { PolicyToc } from "./PolicyToc";

export type PolicyArticleProps = {
  tone?: Tone;
  intro: string;
  sections: {
    title: string;
    intro?: string;
    items?: { title: string; text: string }[];
    cta?: { label: string; href: string };
  }[];
};

/** Văn bản dài chia mục + mục lục bám theo khi cuộn (desktop). */
export function PolicyArticle({ tone = "base", intro, sections }: PolicyArticleProps) {
  const toc = sections.map((s) => ({ id: slugify(s.title), title: s.title }));
  return (
    <Section tone={tone} className="py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[17rem_1fr] lg:gap-20">
        <aside className="hidden lg:block">
          <PolicyToc items={toc} />
        </aside>
        <article className="max-w-3xl">
          <p data-reveal className="text-xl leading-relaxed text-pretty">
            {intro}
          </p>
          {sections.map((s, i) => (
            <section key={s.title} id={toc[i].id} className="scroll-mt-28 border-t border-line pt-12 mt-12">
              <h2 data-split className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold leading-[1.2] tracking-tight text-balance">
                {s.title}
              </h2>
              {s.intro && (
                <p data-reveal className="mt-5 text-lg leading-relaxed text-muted">
                  {s.intro}
                </p>
              )}
              {s.items && (
                <ul className="mt-7 space-y-4">
                  {s.items.map((item) => (
                    <li key={item.title} data-reveal className="rounded-2xl border border-line bg-card p-6">
                      <h3 className="font-extrabold tracking-tight">{item.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
                    </li>
                  ))}
                </ul>
              )}
              {s.cta && (
                <div data-reveal className="mt-8">
                  <Button href={s.cta.href}>{s.cta.label}</Button>
                </div>
              )}
            </section>
          ))}
        </article>
      </Container>
    </Section>
  );
}
