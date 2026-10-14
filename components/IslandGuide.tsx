"use client";

import Image from "next/image";
import Link from "next/link";
import { GUIDES, type Credit } from "@/lib/places";
import { TRIPS, type Trip } from "@/lib/trips";
import { useLang } from "./LanguageProvider";
import { Navbar } from "./Navbar";
import { InquiryCard } from "./InquiryCard";
import { ArrowIcon, PinIcon, SunIcon } from "./Icons";

function CreditLine({ credit, label }: { credit: Credit; label?: string }) {
  return (
    <a
      href={credit.source}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[10px] text-white/35 transition-colors hover:text-white/70"
    >
      {label ? `${label} — ` : "📷 "}
      {credit.author} · {credit.license}
    </a>
  );
}

export function IslandGuide({ trip }: { trip: Trip }) {
  const { lang, t } = useLang();
  const info = trip.i18n[lang];
  const guide = GUIDES[trip.id];
  const others = TRIPS.filter((x) => x.id !== trip.id);

  return (
    <main className="min-h-screen bg-ink">
      <Navbar />

      {/* Hero */}
      <section className="relative flex h-[72svh] min-h-[420px] items-end overflow-hidden">
        <Image src={trip.image} alt={trip.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-10 md:px-10 md:pb-14">
          <Link
            href={`/#${trip.id}`}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:border-white/50"
          >
            <ArrowIcon dir="left" className="h-3.5 w-3.5" />
            {t.allIslands}
          </Link>
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-white/80">
            <span className="flex items-center gap-1.5">
              <PinIcon className="h-3.5 w-3.5 text-sea" />
              {info.region}
            </span>
            <span className="flex items-center gap-1.5">
              <SunIcon className="h-3.5 w-3.5 text-sand" />
              {t.bestTime}: {info.season}
            </span>
          </div>
          <h1
            className="font-black leading-[0.95] tracking-tight text-white drop-shadow-2xl"
            style={{ fontSize: "clamp(2.5rem, min(9vw, 11svh), 6.5rem)" }}
          >
            {trip.name}
          </h1>
          {lang === "my" && <p className="mt-3 text-xl font-semibold text-sea md:text-2xl">{info.name}</p>}
          <p className="mt-3 max-w-2xl text-base font-medium text-sand md:text-xl">{info.tagline}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-5 py-12 md:px-10 md:py-16">
        <div className="grid gap-8 md:grid-cols-[1fr_320px] md:gap-12">
          <div>
            <p className="text-lg font-light leading-relaxed text-white/80 md:text-xl">{info.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {info.highlights.map((h) => (
                <span key={h} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/85">
                  {h}
                </span>
              ))}
            </div>
          </div>
          <div className="h-fit rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-sea">⛴ {t.gettingThere}</p>
            <p className="text-sm leading-relaxed text-white/75">{guide.i18n[lang].gettingThere}</p>
          </div>
        </div>
      </section>

      {/* Places */}
      <section className="mx-auto max-w-6xl px-5 pb-8 md:px-10">
        <div className="mb-10 flex items-end justify-between gap-4 border-b border-white/10 pb-5">
          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">{t.placesTitle}</h2>
          <span className="font-mono text-sm text-white/40">{String(guide.places.length).padStart(2, "0")}</span>
        </div>

        <div className="space-y-14 md:space-y-24">
          {guide.places.map((place, i) => {
            const p = place.i18n[lang];
            return (
              <article key={place.image} className="grid items-center gap-6 md:grid-cols-2 md:gap-14">
                <figure className={i % 2 === 1 ? "md:order-2" : ""}>
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                    <Image
                      src={place.image}
                      alt={place.i18n.en.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-2">
                    <CreditLine credit={place.credit} />
                  </figcaption>
                </figure>
                <div>
                  <p className="mb-3 font-mono text-sm tracking-[0.3em] text-sea">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="text-2xl font-extrabold leading-snug tracking-tight text-white md:text-4xl">{p.name}</h3>
                  {lang === "my" && <p className="mt-1 text-sm font-medium text-white/40">{place.i18n.en.name}</p>}
                  <p className="mt-4 text-base font-light leading-relaxed text-white/75 md:text-lg">{p.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Plan */}
      <section className="relative mt-16 overflow-hidden border-y border-white/5 py-16 md:mt-24 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(94,200,191,0.14)_0%,transparent_60%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1fr_400px] md:px-10">
          <div>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">{t.planTrip}</h2>
            <p className="mt-4 max-w-md text-base font-light leading-relaxed text-white/70">{t.planTripSub}</p>
          </div>
          <InquiryCard trip={trip} />
        </div>
      </section>

      {/* Other islands */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-10">
        <h2 className="mb-6 text-xl font-extrabold text-white md:text-2xl">{t.allIslands}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {others.map((o) => (
            <Link
              key={o.id}
              href={`/islands/${o.id}/`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
            >
              <Image
                src={o.image}
                alt={o.name}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <span className="absolute inset-x-3 bottom-3 text-sm font-bold leading-tight text-white">
                {o.i18n[lang].name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-5 py-10 md:px-10">
        <div className="mx-auto max-w-6xl">
          <details className="text-white/40">
            <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] hover:text-white/70">
              {t.photoCredits}
            </summary>
            <ul className="mt-3 space-y-1">
              <li>
                <CreditLine credit={guide.heroCredit} label={trip.name} />
              </li>
              {guide.places.map((pl) => (
                <li key={pl.image}>
                  <CreditLine credit={pl.credit} label={pl.i18n.en.name} />
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[10px] text-white/30">Images via Wikimedia Commons; resized from the originals.</p>
          </details>
          <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/25">
            &copy; {new Date().getFullYear()} {t.brand}. {t.rights}
          </p>
        </div>
      </footer>
    </main>
  );
}
