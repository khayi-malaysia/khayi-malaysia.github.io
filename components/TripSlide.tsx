"use client";

import Image from "next/image";
import Link from "next/link";
import type { Trip } from "@/lib/trips";
import { useLang } from "./LanguageProvider";
import { InquiryCard } from "./InquiryCard";
import { ArrowIcon, PinIcon, SunIcon } from "./Icons";

export function TripSlide({
  trip,
  index,
  total,
  active,
}: {
  trip: Trip;
  index: number;
  total: number;
  active: boolean;
}) {
  const { lang, t } = useLang();
  const info = trip.i18n[lang];

  const reveal = `transition-all duration-700 ease-out ${active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`;
  const delay = (ms: number) => ({ transitionDelay: active ? `${ms}ms` : "0ms" });

  return (
    <section
      aria-label={trip.name}
      className="relative h-[100svh] w-screen shrink-0 snap-start overflow-hidden"
    >
      <Image
        src={trip.image}
        alt={trip.name}
        fill
        sizes="100vw"
        priority={index === 0}
        className={`object-cover transition-transform duration-[6000ms] ease-out ${active ? "scale-100" : "scale-110"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      <div data-vscroll className="no-scrollbar relative z-10 mx-auto flex h-full max-w-7xl flex-col [justify-content:safe_flex-end] overflow-y-auto px-5 pb-24 pt-20 md:px-10 md:pb-28">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_340px] md:gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
          {/* Trip info */}
          <div>
            <p className={`mb-3 font-mono text-xs tracking-[0.3em] text-white/60 md:mb-5 ${reveal}`} style={delay(0)}>
              <span className="text-sea">{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
            </p>
            <div className={`mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-white/80 ${reveal}`} style={delay(75)}>
              <span className="flex items-center gap-1.5">
                <PinIcon className="h-3.5 w-3.5 text-sea" />
                {info.region}
              </span>
              <span className="flex items-center gap-1.5">
                <SunIcon className="h-3.5 w-3.5 text-sand" />
                {t.bestTime}: {info.season}
              </span>
            </div>
            <h2
              className={`font-black leading-[0.95] tracking-tight text-white drop-shadow-2xl ${reveal}`}
              style={{ ...delay(150), fontSize: "clamp(2.25rem, min(9vw, 10svh), 6rem)" }}
            >
              {trip.name}
            </h2>
            {lang === "my" && (
              <p className={`mt-2 text-xl font-semibold text-sea md:text-2xl ${reveal}`} style={delay(200)}>{info.name}</p>
            )}
            <p className={`mt-[1.5svh] max-w-xl text-base font-medium leading-relaxed text-sand md:text-xl ${reveal}`} style={delay(250)}>
              {info.tagline}
            </p>
            <p className={`mt-2 hidden max-w-xl text-sm font-light leading-relaxed text-white/75 sm:block [@media(max-height:600px)]:hidden md:text-base ${reveal}`} style={delay(300)}>
              {info.description}
            </p>
            <div className={`mt-[2svh] flex flex-wrap gap-2 max-sm:[@media(max-height:760px)]:hidden ${reveal}`} style={delay(350)}>
              {info.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md"
                >
                  {h}
                </span>
              ))}
            </div>
            <Link
              href={`/islands/${trip.id}/`}
              className={`group mt-[2svh] inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-ink shadow-lg transition-all hover:gap-3 ${reveal}`}
              style={delay(375)}
            >
              {t.explorePlaces}
              <ArrowIcon className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Inquiry card */}
          <InquiryCard trip={trip} className={reveal} style={delay(400)} />
        </div>
      </div>
    </section>
  );
}
