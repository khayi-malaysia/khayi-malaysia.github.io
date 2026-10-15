"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LANGS } from "@/lib/i18n";
import { whatsappLink } from "@/lib/trips";
import { useLang } from "./LanguageProvider";
import { ChevronIcon, GlobeIcon, WhatsAppIcon } from "./Icons";

export function Navbar({ onHome }: { onHome?: () => void }) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Only the guide pages scroll vertically; give the bar a backdrop there so text doesn't run under it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/5 bg-ink/85 py-3 backdrop-blur-lg md:py-4" : "py-4 md:py-6"
      }`}
    >
      {/* Same width and side padding as the hero content so the logo lines up with the text below. */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 md:px-10">
        <Link
          href="/"
          onClick={(e) => {
            if (onHome) {
              e.preventDefault();
              onHome();
            }
          }}
          className="group flex items-center gap-2.5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.png`}
            alt="Travel in Malaysia"
            className="h-24 w-24 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-105 md:h-32 md:w-32"
          />
        </Link>

        <div className="flex items-center gap-2">
          <div ref={ref} className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={open}
              className="flex h-10 items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3.5 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:border-white/30"
            >
              <GlobeIcon className="h-4 w-4 text-sea" />
              <span>{current.short}</span>
              <ChevronIcon className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            <div
              role="listbox"
              className={`absolute right-0 mt-2 w-40 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-ink/90 p-1.5 shadow-2xl backdrop-blur-xl transition-all duration-200 ${
                open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  role="option"
                  aria-selected={l.code === lang}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    l.code === lang ? "bg-sea/15 text-sea" : "text-white/80 hover:bg-white/5"
                  }`}
                >
                  {l.label}
                  <span className="text-[10px] font-bold tracking-widest opacity-60">{l.short}</span>
                </button>
              ))}
            </div>
          </div>

          <a
            href={whatsappLink(t.generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center gap-2 rounded-full bg-[#25D366] px-3.5 text-xs font-bold text-ink transition-transform hover:-translate-y-0.5 sm:px-4"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{t.chat}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
