"use client";

import { useEffect, useRef, useState } from "react";
import { LANGS } from "@/lib/i18n";
import { whatsappLink } from "@/lib/trips";
import { useLang } from "./LanguageProvider";
import { ChevronIcon, GlobeIcon, WhatsAppIcon } from "./Icons";

export function Navbar({ onHome }: { onHome: () => void }) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8 md:py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <button onClick={onHome} className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-sea text-ink shadow-[0_8px_24px_rgba(94,200,191,0.35)] transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
              <path d="M12 14V6M12 6c-2.5-2-5.5-1.5-7 0M12 6c2.5-2 5.5-1.5 7 0M12 6c-1-2-3-3-5-3M12 6c1-2 3-3 5-3" />
            </svg>
          </span>
          <span className="flex items-baseline gap-2 whitespace-nowrap">
            <span className="text-base font-extrabold uppercase tracking-[0.18em] text-white sm:text-lg">Khayi</span>
            <span className="text-base font-bold text-sea sm:text-lg">ခရီး</span>
          </span>
        </button>

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
