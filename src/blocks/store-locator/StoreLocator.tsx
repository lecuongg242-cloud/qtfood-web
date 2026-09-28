"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { Container, Section, type Tone } from "@/components/ui/Section";
import { MapPin, Phone } from "@/components/ui/icons";
import type { StoreView } from "@/lib/data/stores";

export type StoreLocatorProps = { tone?: Tone; title: string; stores: StoreView[] };

/** Danh sách cơ sở + lọc theo tỉnh/thành. Không có cơ sở nào → không hiển thị. */
export function StoreLocator({ tone = "base", title, stores }: StoreLocatorProps) {
  const provinces = useMemo(() => [...new Set(stores.map((s) => s.province))], [stores]);
  const [province, setProvince] = useState<string | null>(null);
  const visible = province ? stores.filter((s) => s.province === province) : stores;

  if (stores.length === 0) return null;

  return (
    <Section tone={tone} className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.16] tracking-[-0.025em]">{title}</h2>
          <p className="text-muted">
            {stores.length} cơ sở · {provinces.length} tỉnh/thành
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Lọc theo tỉnh/thành">
          {[null, ...provinces].map((p) => (
            <button
              key={p ?? "all"}
              type="button"
              onClick={() => setProvince(p)}
              aria-pressed={province === p}
              className={clsx(
                "rounded-full border px-4 py-2 text-sm font-bold transition-colors duration-300",
                province === p ? "border-[#4cb448] bg-[#4cb448] text-[#0f230f]" : "border-line bg-card hover:border-[#4cb448]",
              )}
            >
              {p ?? "Tất cả"}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <li key={s.id} className="flex flex-col rounded-[1.5rem] border border-line bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{s.province}</p>
              <h3 className="mt-2 text-lg font-extrabold tracking-tight">{s.name}</h3>
              <p className="mt-2 flex gap-2 text-[0.95rem] leading-relaxed text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {s.address}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                {s.phone && (
                  <a href={`tel:${s.phone.replace(/[^\d+]/g, "")}`} className="btn btn-primary !px-4 !py-2.5 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>{s.phone}</span>
                  </a>
                )}
                <a
                  href={s.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.name}, ${s.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost !px-4 !py-2.5 text-sm"
                >
                  <span>Chỉ đường</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
