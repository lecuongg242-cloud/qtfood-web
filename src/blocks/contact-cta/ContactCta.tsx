import Image from "next/image";
import { Container, Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Mail, MapPin, Phone } from "@/components/ui/icons";

export type ContactCtaProps = {
  tone?: Tone;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  hotlines: { number: string; display: string; contact: string }[];
  email: string;
  address: string;
  zalo: string;
};

export function ContactCta({ tone = "base", eyebrow, title, description, image, hotlines, email, address, zalo }: ContactCtaProps) {
  return (
    <Section tone={tone} className="py-24 lg:py-32">
      <Container>
        <div className="grid overflow-hidden rounded-[2rem] border border-line bg-card lg:grid-cols-2">
          <div data-clip className="relative min-h-[280px] lg:min-h-full">
            <Image src={image} alt="Đặc sản QT FOOD" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="p-8 sm:p-12 lg:p-14">
            <SectionHeading eyebrow={eyebrow} title={title} description={description} />
            <ul className="mt-9 space-y-3">
              {hotlines.map((h) => (
                <li key={h.number} data-reveal>
                  <a
                    href={`tel:${h.number}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-line px-5 py-4 transition-colors duration-300 hover:border-[#4cb448] hover:bg-[#4cb448]/10"
                  >
                    <span className="flex items-center gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-btn text-btn-ink">
                        <Phone className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xl font-extrabold tracking-tight">{h.display}</span>
                        <span className="text-sm text-muted">{h.contact}</span>
                      </span>
                    </span>
                    <span className="text-sm font-bold text-accent transition-transform duration-300 group-hover:translate-x-1">
                      Gọi ngay →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <ul data-reveal className="mt-8 space-y-3 text-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                {address}
              </li>
              <li>
                <a href={`mailto:${email}`} className="flex gap-3 hover:text-accent">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {email}
                </a>
              </li>
            </ul>
            <div data-reveal className="mt-9">
              <Button href={zalo} external>
                Nhắn tin Zalo
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
