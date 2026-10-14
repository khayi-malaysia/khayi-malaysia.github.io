"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TRIPS, whatsappLink } from "@/lib/trips";
import { useLang } from "./LanguageProvider";
import { Navbar } from "./Navbar";
import { TripSlide } from "./TripSlide";
import { ArrowIcon, WhatsAppIcon } from "./Icons";

// Slide 0 = intro, 1..N = trips, N+1 = contact.
const SLIDE_COUNT = TRIPS.length + 2;

export function TripCarousel() {
  const { lang, t } = useLang();
  const scroller = useRef<HTMLDivElement>(null);
  const wheelLock = useRef(false);
  const animFrame = useRef(0);
  const [active, setActive] = useState(0);

  const goTo = useCallback((i: number) => {
    const el = scroller.current;
    if (!el) return;
    const target = Math.max(0, Math.min(SLIDE_COUNT - 1, i));
    const from = el.scrollLeft;
    const to = target * el.clientWidth;
    if (from === to) return;
    if (document.hidden) {
      el.scrollLeft = to;
      return;
    }

    // Native smooth scroll fights scroll-snap in Chrome, so animate manually with snap off.
    cancelAnimationFrame(animFrame.current);
    el.style.scrollSnapType = "none";
    const duration = 700;
    const start = performance.now();
    const ease = (x: number) => 1 - Math.pow(1 - x, 4);
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      el.scrollLeft = from + (to - from) * ease(p);
      if (p < 1) animFrame.current = requestAnimationFrame(step);
      else el.style.scrollSnapType = "";
    };
    animFrame.current = requestAnimationFrame(step);
  }, []);

  // Track which slide is in view.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () => setActive(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Mouse wheel (vertical) moves one slide at a time; keyboard arrows too.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // native horizontal (trackpad)
      const inner = (e.target as HTMLElement).closest("[data-vscroll]") as HTMLElement | null;
      if (inner && inner.scrollHeight > inner.clientHeight) {
        const atTop = inner.scrollTop <= 0;
        const atBottom = inner.scrollTop + inner.clientHeight >= inner.scrollHeight - 1;
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return;
      }
      e.preventDefault();
      if (wheelLock.current || Math.abs(e.deltaY) < 8) return;
      wheelLock.current = true;
      const current = Math.round(el.scrollLeft / el.clientWidth);
      goTo(current + (e.deltaY > 0 ? 1 : -1));
      setTimeout(() => (wheelLock.current = false), 900);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      const current = Math.round(el.scrollLeft / el.clientWidth);
      if (e.key === "ArrowRight") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [goTo]);

  const labelFor = (i: number) =>
    i === 0 ? "Home" : i === SLIDE_COUNT - 1 ? "Contact" : TRIPS[i - 1].i18n[lang].name;

  return (
    <main className="relative h-[100svh] overflow-hidden bg-ink">
      <Navbar onHome={() => goTo(0)} />

      <div
        ref={scroller}
        className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain"
      >
        {/* Intro */}
        <section className="relative h-[100svh] w-screen shrink-0 snap-start overflow-hidden" aria-label="Home">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(94,200,191,0.22)_0%,transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_90%,rgba(243,217,164,0.12)_0%,transparent_50%)]" />
          </div>

          <div
            data-vscroll
            className="no-scrollbar relative z-10 mx-auto flex h-full max-w-7xl flex-col [justify-content:safe_center] overflow-y-auto px-5 pb-24 pt-20 md:px-10 md:pb-28"
          >
            <span className="mb-[2.5svh] inline-flex w-fit shrink-0 animate-fade-in [@media(max-height:620px)]:hidden items-center gap-2 rounded-full border border-sea/30 bg-sea/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-sea">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sea" />
              {t.heroEyebrow}
            </span>
            <h1
              className={`max-w-5xl animate-fade-in font-black tracking-tight text-white ${lang === "my" ? "leading-[1.45]" : "leading-[1.1]"}`}
              style={{
                // Scale with both width and height so the island cards stay in view.
                fontSize:
                  lang === "my"
                    ? "clamp(1.6rem, min(5.5vw, 6svh), 4.25rem)"
                    : "clamp(2rem, min(7.5vw, 8svh), 5.75rem)",
              }}
            >
              {t.heroTitle}{" "}
              <span className="block w-fit bg-gradient-to-r pb-[0.2em] pr-[0.05em] from-sea via-sea to-sand bg-clip-text text-transparent">
                {t.heroAccent}
              </span>
            </h1>
            <p className="mt-[2svh] max-w-xl text-sm font-light leading-relaxed text-white/70 md:text-base">{t.heroSub}</p>

            <button
              onClick={() => goTo(1)}
              className="group mt-[3svh] flex w-fit shrink-0 items-center gap-3 rounded-2xl bg-sea px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-ink shadow-[0_20px_40px_rgba(94,200,191,0.25)] transition-all hover:-translate-y-0.5 hover:bg-sea-dark"
            >
              {t.explore}
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="mt-[4svh] grid shrink-0 grid-cols-3 gap-2.5 md:grid-cols-6 md:gap-4">
              {TRIPS.map((trip, i) => (
                <button
                  key={trip.id}
                  onClick={() => goTo(i + 1)}
                  className="group relative h-[clamp(84px,15svh,140px)] overflow-hidden rounded-2xl border border-white/10 md:h-[clamp(90px,20svh,250px)]"
                >
                  <Image
                    src={trip.image}
                    alt={trip.name}
                    fill
                    sizes="(max-width: 768px) 33vw, 16vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                  <span className="absolute inset-x-2 bottom-2 text-left text-[11px] font-bold leading-tight text-white md:inset-x-3 md:bottom-3 md:text-sm">
                    {trip.i18n[lang].name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {TRIPS.map((trip, i) => (
          <TripSlide key={trip.id} trip={trip} index={i} total={TRIPS.length} active={active === i + 1} />
        ))}

        {/* Contact */}
        <section className="relative h-[100svh] w-screen shrink-0 snap-start overflow-hidden" aria-label="Contact">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(37,211,102,0.14)_0%,transparent_60%)]" />
          <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 pb-28 pt-24 text-center">
            <h2 className="text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">{t.endTitle}</h2>
            <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/70 md:text-lg">{t.endSub}</p>
            <a
              href={whatsappLink(t.generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 flex items-center gap-3 rounded-2xl bg-[#25D366] px-8 py-4 text-sm font-extrabold text-ink shadow-[0_20px_40px_rgba(37,211,102,0.3)] transition-all hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t.endCta}
            </a>
            <p className="mt-4 font-mono text-sm tracking-wider text-white/40">+60 11-3959 4048</p>
            <p className="absolute bottom-24 text-[10px] font-bold uppercase tracking-[0.3em] text-white/25">
              &copy; {new Date().getFullYear()} {t.brand}. {t.rights}
            </p>
          </div>
        </section>
      </div>

      {/* Bottom controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 px-5 pb-6 md:px-10 md:pb-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="pointer-events-auto flex items-center gap-1.5">
            {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={labelFor(i)}
                title={labelFor(i)}
                className="group py-3"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-500 ${
                    active === i ? "w-8 bg-sea" : "w-3 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <span className="mr-2 hidden text-xs font-medium tracking-wide text-white/50 md:block">
              {active < SLIDE_COUNT - 1 && `${t.swipe} →`}
            </span>
            <button
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition-all hover:border-white/40 disabled:opacity-30"
            >
              <ArrowIcon dir="left" className="h-4 w-4" />
            </button>
            <button
              onClick={() => goTo(active + 1)}
              disabled={active === SLIDE_COUNT - 1}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition-all hover:scale-105 disabled:opacity-30"
            >
              <ArrowIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
