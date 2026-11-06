import "server-only";
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { content } from "@/content/data";
import { nav as defaultNav, primaryCta as defaultCta } from "@/content/site";
import type { Company, Hotline } from "@/content/types";

export type NavItem = { label: string; href: string };
export type SiteSettings = { company: Company; nav: NavItem[]; primaryCta: NavItem; mainHotline: Hotline };

const pick = <T,>(value: T | null | undefined, fallback: T): T => (value === null || value === undefined || value === "" ? fallback : value);

/**
 * Thông tin chung (global `site-settings` trong admin). Trường nào chưa nhập → dùng dữ liệu gốc trong content/qtfood.json,
 * nên website vẫn đúng khi DB mới tạo / chưa seed. Thông tin Tổng giám đốc (ceo) chưa có trong admin → lấy từ JSON.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const base = content.company;
  const payload = await getPayload({ config });
  const s = await payload.findGlobal({ slug: "site-settings", depth: 0 });

  const hotlines = (s.hotlines ?? [])
    .filter((h) => h.number && h.display)
    .map((h) => ({ number: h.number.replace(/[^\d+]/g, ""), display: h.display, contact: h.contact ?? "" }));
  const zalo = (s.zalo ?? []).filter((z): z is { label: string; url: string } => Boolean(z.url && z.label));

  const company: Company = {
    ...base,
    legalName: pick(s.legalName, base.legalName),
    brand: pick(s.brand, base.brand),
    positioning: pick(s.positioning, base.positioning),
    slogan: pick(s.slogan, base.slogan),
    tagline: pick(s.tagline, base.tagline),
    taxCode: pick(s.taxCode, base.taxCode),
    email: pick(s.email, base.email),
    address: pick(s.address, base.address),
    geo: { lat: pick(s.geo?.lat, base.geo.lat), lng: pick(s.geo?.lng, base.geo.lng) },
    hotlines: hotlines.length ? hotlines : base.hotlines,
    social: {
      facebook: { label: pick(s.facebook?.label, base.social.facebook.label), url: pick(s.facebook?.url, base.social.facebook.url) },
      tiktok: { label: pick(s.tiktok?.label, base.social.tiktok.label), url: pick(s.tiktok?.url, base.social.tiktok.url) },
      zalo: zalo.length ? zalo : base.social.zalo,
    },
  };

  const nav = (s.nav ?? []).filter((n) => n.label && n.href).map((n) => ({ label: n.label, href: n.href }));
  return {
    company,
    nav: nav.length ? nav : defaultNav,
    primaryCta: { label: pick(s.primaryCta?.label, defaultCta.label), href: pick(s.primaryCta?.href, defaultCta.href) },
    mainHotline: company.hotlines[0],
  };
});
