"use client";

import { useState } from "react";
import Image from "next/image";
import { type Trip, whatsappLink } from "@/lib/trips";
import { useLang } from "./LanguageProvider";
import { PinIcon, SunIcon, WhatsAppIcon } from "./Icons";

const formatPrice = (n: number) => `RM ${n.toLocaleString("en-MY")}`;
const CUSTOM = -1;
const MAX_PAX = 99;

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
  const [selected, setSelected] = useState(0); // index into trip.packages, or CUSTOM
  const [customPax, setCustomPax] = useState(2);
  const [date, setDate] = useState("");
  const info = trip.i18n[lang];

  const isCustom = selected === CUSTOM;
  const pax = isCustom ? customPax : (trip.packages[selected] ?? trip.packages[0]).pax;
  // A custom size that matches a configured package still shows that package's price.
  const price = trip.packages.find((p) => p.pax === pax)?.price ?? null;
  const columns = Math.min(trip.packages.length + 1, 5);
  const setCustom = (n: number) => setCustomPax(Math.max(1, Math.min(MAX_PAX, Math.round(n) || 1)));

  // Admin always sees the English island name so it's easy to identify.
  const message = t.message(lang === "my" ? `${trip.name} (${info.name})` : trip.name, pax, date);

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
          </div>

          {/* Inquiry card */}
          <div
            className={`rounded-3xl border border-white/10 bg-ink/55 p-4 shadow-2xl backdrop-blur-xl md:p-6 ${reveal}`} style={delay(400)}
          >
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">{t.groupSize}</p>
              <p className="text-right">
                {price != null ? (
                  <>
                    <span className="text-xl font-extrabold text-white">{formatPrice(price)}</span>
                    <span className="ml-1 text-xs text-white/50">{t.perPerson}</span>
                  </>
                ) : (
                  <span className="text-sm font-semibold text-sand">{t.onRequest}</span>
                )}
              </p>
            </div>

            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
              role="radiogroup"
              aria-label={t.groupSize}
            >
              {trip.packages.map(({ pax: p }, i) => (
                <button
                  key={i}
                  role="radio"
                  aria-checked={selected === i}
                  onClick={() => setSelected(i)}
                  className={`flex flex-col items-center rounded-2xl border py-2.5 transition-all ${
                    selected === i
                      ? "border-sea bg-sea text-ink shadow-[0_8px_24px_rgba(94,200,191,0.35)]"
                      : "border-white/10 bg-white/5 text-white hover:border-white/30"
                  }`}
                >
                  <span className="text-lg font-extrabold leading-none">{p}</span>
                  <span className={`mt-1 text-[10px] font-medium ${selected === i ? "text-ink/70" : "text-white/50"}`}>
                    {t.pax(p).replace(String(p), "").trim()}
                  </span>
                </button>
              ))}
              <button
                role="radio"
                aria-checked={isCustom}
                onClick={() => setSelected(CUSTOM)}
                className={`flex flex-col items-center rounded-2xl border border-dashed py-2.5 transition-all ${
                  isCustom
                    ? "border-sea bg-sea text-ink shadow-[0_8px_24px_rgba(94,200,191,0.35)]"
                    : "border-white/25 bg-white/5 text-white hover:border-white/50"
                }`}
              >
                <span className="text-lg font-extrabold leading-none">+</span>
                <span className={`mt-1 text-[10px] font-medium ${isCustom ? "text-ink/70" : "text-white/50"}`}>
                  {t.custom}
                </span>
              </button>
            </div>

            {isCustom && (
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => setCustom(customPax - 1)}
                  aria-label="−"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5 text-xl text-white hover:border-white/30"
                >
                  −
                </button>
                <label className="relative flex-1">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={MAX_PAX}
                    value={customPax}
                    onChange={(e) => setCustom(Number(e.target.value))}
                    aria-label={t.groupSize}
                    className="h-11 w-full rounded-2xl border border-sea/50 bg-white/5 pl-4 pr-16 text-center text-lg font-extrabold text-white outline-none [appearance:textfield] focus:border-sea [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/50">
                    {t.pax(customPax).replace(String(customPax), "").trim()}
                  </span>
                </label>
                <button
                  onClick={() => setCustom(customPax + 1)}
                  aria-label="+"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5 text-xl text-white hover:border-white/30"
                >
                  +
                </button>
              </div>
            )}

            <label className="mt-4 block">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                {t.travelDate}
              </span>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none [color-scheme:dark] focus:border-sea"
              />
            </label>

            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] py-3.5 text-sm font-extrabold text-ink shadow-[0_12px_32px_rgba(37,211,102,0.3)] transition-all hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t.inquire}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
