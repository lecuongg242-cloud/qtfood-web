import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Container, Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "@/components/ui/icons";

export type FeaturedProductsProps = {
  tone?: Tone;
  eyebrow: string;
  title: string;
  description: string;
  items: { title: string; text: string; image: string; href: string; tag: string }[];
};

export function FeaturedProducts({ tone = "base", eyebrow, title, description, items }: FeaturedProductsProps) {
  return (
    <Section tone={tone} className="py-24 lg:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} />
          <p data-reveal className="max-w-md text-lg leading-relaxed text-muted lg:pb-2">
            {description}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 lg:gap-10">
          {items.map((item, i) => (
            <Link
              key={item.title}
              href={item.href}
              data-reveal
              className={clsx("group block", i === 1 && "md:mt-20")}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-card">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#10240f] backdrop-blur">
                  {item.tag}
                </span>
                <span className="absolute bottom-5 right-5 grid h-14 w-14 translate-y-4 scale-75 place-items-center rounded-full bg-[#4cb448] text-[#0f230f] opacity-0 transition-all duration-500 ease-[var(--ease-soft)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                  <ArrowUpRight className="h-6 w-6" />
                </span>
                <span className="absolute bottom-5 left-6 text-[4.5rem] font-extrabold leading-none tracking-tighter text-white/90">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-accent">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
