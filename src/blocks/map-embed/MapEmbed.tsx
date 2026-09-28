import { Container, Section, type Tone } from "@/components/ui/Section";
import { MapPin } from "@/components/ui/icons";

export type MapEmbedProps = {
  tone?: Tone;
  title: string;
  address: string;
  geo: { lat: number; lng: number };
};

/** Bản đồ Google nhúng, tải lười (chỉ tải khi cuộn tới). */
export function MapEmbed({ tone = "base", title, address, geo }: MapEmbedProps) {
  const q = `${geo.lat},${geo.lng}`;
  return (
    <Section tone={tone} className="pb-24 lg:pb-32">
      <Container>
        <div data-reveal className="overflow-hidden rounded-[2rem] border border-line bg-card">
          <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
              <div>
                <h2 className="text-lg font-extrabold tracking-tight">{title}</h2>
                <p className="text-muted">{address}</p>
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost shrink-0"
            >
              <span>Chỉ đường</span>
            </a>
          </div>
          <iframe
            title={`Bản đồ: ${title}`}
            src={`https://maps.google.com/maps?q=${q}&z=15&hl=vi&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[380px] w-full border-0 sm:h-[460px]"
          />
        </div>
      </Container>
    </Section>
  );
}
