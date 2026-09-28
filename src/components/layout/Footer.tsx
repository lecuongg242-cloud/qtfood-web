import Image from "next/image";
import Link from "next/link";
import { company, nav } from "@/content/site";
import { img } from "@/content/data";
import { Container } from "@/components/ui/Section";
import { Facebook, Mail, MapPin, Phone, TikTok, Zalo } from "@/components/ui/icons";
import { Logo } from "./Logo";

export function Footer() {
  const zalo = company.social.zalo[0];
  return (
    <footer data-tone="deep" className="relative overflow-hidden pt-40">
      <Image
        src={img("decor/nui-doi.jpg")}
        alt=""
        aria-hidden
        width={1774}
        height={887}
        className="decor absolute inset-x-0 top-0 h-auto w-full opacity-[0.14]"
      />
      <Container className="relative">
        <div className="grid gap-12 border-b border-line pb-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_0.9fr]">
          <div>
            <Logo className="w-[150px]" />
            <p className="mt-6 max-w-sm text-muted">{company.slogan}.</p>
            <p className="mt-2 text-sm text-muted">
              {company.legalName} · MST {company.taxCode}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-accent">Liên hệ</h3>
            <ul className="mt-5 space-y-4 text-[0.95rem]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>{company.address}</span>
              </li>
              {company.hotlines.map((h) => (
                <li key={h.number}>
                  <a href={`tel:${h.number}`} className="flex gap-3 hover:text-accent">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span>
                      <strong>{h.display}</strong> <span className="text-muted">({h.contact})</span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${company.email}`} className="flex gap-3 hover:text-accent">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {company.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-accent">Khám phá</h3>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              {nav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-accent">Kết nối</h3>
            <div className="mt-5 flex gap-3">
              {[
                { href: company.social.facebook.url, label: "Facebook", icon: <Facebook className="h-5 w-5" /> },
                { href: company.social.tiktok.url, label: "TikTok", icon: <TikTok className="h-5 w-5" /> },
                { href: zalo.url, label: "Zalo", icon: <Zalo className="text-[0.7rem]" /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-12 w-12 place-items-center rounded-full border border-line transition-colors duration-300 hover:border-[#4cb448] hover:bg-[#4cb448] hover:text-[#0f230f]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted">{company.social.facebook.label}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-8 text-sm text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {company.legalName}. Bảo lưu mọi quyền.</p>
          <p>{company.tagline}.</p>
        </div>
      </Container>
    </footer>
  );
}
