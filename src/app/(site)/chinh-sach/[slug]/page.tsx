import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { PageHero } from "@/blocks/page-hero/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { Phone } from "@/components/ui/icons";
import { img } from "@/content/data";
import { company } from "@/content/site";
import { getPolicies, getPolicy } from "@/lib/data/policies";

type Params = PageProps<"/chinh-sach/[slug]">;

export async function generateStaticParams() {
  const policies = await getPolicies();
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPolicy(slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, alternates: { canonical: p.href } };
}

const updated = (iso: string) =>
  new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(iso));

export default async function PolicyPage({ params }: Params) {
  const { slug } = await params;
  const policy = await getPolicy(slug);
  if (!policy) notFound();
  const policies = await getPolicies();

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Chính sách" }, { label: policy.title }]}
        eyebrow="Chính sách"
        title={policy.title}
        description={policy.summary}
        decor={img("decor/nui-doi.jpg")}
      />
      <Section tone="base" className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[17rem_1fr] lg:gap-20">
          <aside className="order-last lg:order-none">
            <nav aria-label="Các chính sách" className="lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Chính sách</p>
              <ul className="mt-4 space-y-1 border-l border-line">
                {policies.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={p.href}
                      aria-current={p.slug === slug ? "page" : undefined}
                      className={
                        p.slug === slug
                          ? "-ml-px block border-l-2 border-[#4cb448] py-2 pl-4 text-sm font-bold leading-snug text-ink"
                          : "-ml-px block border-l-2 border-transparent py-2 pl-4 text-sm leading-snug text-muted transition-colors duration-300 hover:text-ink"
                      }
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <article className="max-w-3xl">
            <div className="prose-qt">
              <RichText data={policy.body} />
            </div>
            <div className="mt-12 rounded-2xl border border-line bg-card p-6">
              <p className="font-extrabold tracking-tight">Cần hỗ trợ thêm?</p>
              <p className="mt-2 text-muted">Liên hệ QT FOOD để được giải đáp trực tiếp.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {company.hotlines.map((h) => (
                  <a key={h.number} href={`tel:${h.number}`} className="btn btn-ghost !py-2.5 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>
                      {h.display} ({h.contact})
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <p className="mt-8 text-sm text-muted">Cập nhật lần cuối: {updated(policy.updatedAt)}</p>
          </article>
        </Container>
      </Section>
    </>
  );
}
