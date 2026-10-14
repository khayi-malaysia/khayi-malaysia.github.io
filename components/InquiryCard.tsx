"use client";

import { useEffect, useState } from "react";
import { type Trip, whatsappLink } from "@/lib/trips";
import { useLang } from "./LanguageProvider";
import { WhatsAppIcon } from "./Icons";

// Local date as YYYY-MM-DD (toISOString would give the UTC date, which can be yesterday in Malaysia).
const localToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const formatPrice = (n: number) => `RM ${n.toLocaleString("en-MY")}`;
const CUSTOM = -1;
const MAX_PAX = 99;

export function InquiryCard({
  trip,
  className = "",
  style,
}: {
  trip: Trip;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { lang, t } = useLang();
  const [selected, setSelected] = useState(0); // index into trip.packages, or CUSTOM
  const [customPax, setCustomPax] = useState(2);
  const [date, setDate] = useState("");
  const [today, setToday] = useState("");
  // Set on the client so the static build doesn't bake in its build date.
  useEffect(() => setToday(localToday()), []);
  const info = trip.i18n[lang];

  const isCustom = selected === CUSTOM;
  const pax = isCustom ? customPax : (trip.packages[selected] ?? trip.packages[0]).pax;
  // A custom size that matches a configured package still shows that package's price.
  const price = trip.packages.find((p) => p.pax === pax)?.price ?? null;
  const columns = Math.min(trip.packages.length + 1, 5);
  const setCustom = (n: number) => setCustomPax(Math.max(1, Math.min(MAX_PAX, Math.round(n) || 1)));

  // Admin always sees the English island name so it's easy to identify.
  const message = t.message(lang === "my" ? `${trip.name} (${info.name})` : trip.name, pax, date);

  return (
    <div
      className={`rounded-3xl border border-white/10 bg-ink/55 p-4 shadow-2xl backdrop-blur-xl md:p-6 ${className}`}
      style={style}
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

      <label className="mt-4 block min-w-0">
        <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
          {t.travelDate}
        </span>
        <input
          type="date"
          value={date}
          min={today || undefined}
          // iOS Safari ignores `min`, so reject past dates here too.
          onChange={(e) => {
            const v = e.target.value;
            setDate(v && v < localToday() ? localToday() : v);
          }}
          className="block h-11 w-full min-w-0 max-w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 text-left text-sm text-white outline-none [color-scheme:dark] focus:border-sea [&::-webkit-date-and-time-value]:text-left [&::-webkit-date-and-time-value]:min-h-[1.25rem]"
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
  );
}
