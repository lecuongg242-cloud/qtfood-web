import { company, mainHotline } from "@/content/site";
import { Phone, Zalo } from "@/components/ui/icons";

export function FloatingContact() {
  const items = [
    { href: company.social.zalo[0].url, label: "Chat Zalo", bg: "#0068ff", icon: <Zalo className="text-[0.72rem] text-white" /> },
    { href: `tel:${mainHotline.number}`, label: `Gọi ${mainHotline.display}`, bg: "#ed1c24", icon: <Phone className="h-5 w-5 text-white" /> },
  ];
  return (
    <div className="floating-contact fixed bottom-5 right-5 z-40 flex flex-col gap-3 transition-[bottom] duration-300">
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          target={it.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={it.label}
          className="group relative grid h-13 w-13 place-items-center rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
          style={{ background: it.bg }}
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full motion-safe:animate-[pulse-ring_2.2s_ease-out_infinite]"
            style={{ background: it.bg }}
          />
          <span className="relative">{it.icon}</span>
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-[#10240f] px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
            {it.label}
          </span>
        </a>
      ))}
    </div>
  );
}
