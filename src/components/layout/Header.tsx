"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import type { NavItem } from "@/lib/data/settings";
import type { Hotline } from "@/content/types";
import { Logo } from "./Logo";
import { Close, Menu, Phone } from "@/components/ui/icons";

export function Header({ nav, primaryCta, mainHotline }: { nav: NavItem[]; primaryCta: NavItem; mainHotline: Hotline }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Đóng menu khi đổi trang (điều chỉnh state trong render thay vì effect)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  return (
    <>
      <header
        data-tone={open ? "deep" : scrolled ? "base" : "hero"}
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ease-[var(--ease-soft)]",
          scrolled && !open
            ? "bg-[color-mix(in_srgb,var(--bg)_82%,transparent)]! py-2.5 shadow-[0_1px_0_var(--line)] backdrop-blur-xl"
            : "bg-transparent! py-5",
        )}
      >
        <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" aria-label="QT FOOD – Trang chủ" className="shrink-0">
            <Logo preload className={clsx("transition-[width] duration-500", scrolled ? "w-[92px]" : "w-[112px]")} />
          </Link>

          <nav aria-label="Menu chính" className="hidden xl:block">
            <ul className="flex items-center gap-5 whitespace-nowrap text-[0.94rem] font-semibold min-[1400px]:gap-7">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="link-underline py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${mainHotline.number}`}
              className="hidden items-center gap-2 whitespace-nowrap text-sm font-bold lg:inline-flex xl:hidden min-[1400px]:inline-flex"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-line">
                <Phone className="h-4 w-4" />
              </span>
              {mainHotline.display}
            </a>
            <Link href={primaryCta.href} className="btn btn-primary hidden whitespace-nowrap !py-3 sm:inline-flex">
              {primaryCta.label}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Đóng menu" : "Mở menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-line xl:hidden"
            >
              {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile toàn màn hình */}
      <div
        data-tone="deep"
        aria-hidden={!open}
        className={clsx(
          "fixed inset-0 z-40 flex flex-col justify-between px-6 pb-10 pt-28 transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] xl:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <ul className="space-y-1">
          {nav.map((item, i) => (
            <li
              key={item.href}
              className="overflow-hidden"
            >
              <Link
                href={item.href}
                tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                className={clsx(
                  "block py-1.5 text-[2.1rem] font-extrabold tracking-tight transition-transform duration-700 ease-[var(--ease-out-expo)]",
                  open ? "translate-y-0" : "translate-y-full",
                  isActive(item.href) && "text-accent",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="space-y-4 text-muted">
          <a href={`tel:${mainHotline.number}`} className="flex items-center gap-3 text-lg font-bold text-ink">
            <Phone className="h-5 w-5" /> {mainHotline.display}
          </a>
          <Link href={primaryCta.href} tabIndex={open ? 0 : -1} className="btn btn-primary">
            {primaryCta.label}
          </Link>
        </div>
      </div>
    </>
  );
}
