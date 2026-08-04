import Image from "next/image";
import {
  CalendarDays,
  Compass,
  Headphones,
  HeartPulse,
  Lightbulb,
  Map,
  Route,
  TramFront,
  UtensilsCrossed,
} from "lucide-react";

import DotBackground from "@/components/dot-background";
import { Footer, Header, StoreButtons } from "@/components/site-chrome";
import { ParallaxLayers } from "@/components/ui/parallax-scrolling";
import { dict, type Lang } from "@/lib/i18n";

/* Modul seviyesinde sabit — her render'da yeni dizi olusup
   ParallaxLayers'in effect'ini yeniden tetiklemesin. */
const HERO_LAYERS = [
  { layer: "1", yPercent: 46 }, // nokta zemin (en uzak)
  { layer: "2", yPercent: 26 }, // poster
  { layer: "3", yPercent: 10 }, // baslik blogu
  { layer: "4", yPercent: 4 }, // CTA (en on)
];

/** Ozellik sirasiyla eslesen ikonlar. Emoji kullanilmiyor — SVG. */
const ICONS = [
  Map,
  Route,
  Headphones,
  UtensilsCrossed,
  CalendarDays,
  TramFront,
  Lightbulb,
  HeartPulse,
];

export default function Landing({ lang }: { lang: Lang }) {
  const t = dict[lang];

  return (
    <div lang={lang} className="flex min-h-screen flex-col">
      <Header lang={lang} />

      {/* ── Hero (parallax) ──
          Katman derinligi: 1 = en arka (en cok kayar), 4 = en on. */}
      <ParallaxLayers layers={HERO_LAYERS} className="relative overflow-hidden">
        <div
          data-parallax-layer="1"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <DotBackground className="h-full w-full opacity-40" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(26,26,31,0.85) 0%, rgba(26,26,31,0.45) 45%, #1a1a1f 100%)",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-36">
          {/* Metin */}
          <div
            data-parallax-layer="3"
            className="text-center lg:text-left"
          >
            <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.25em] text-[#00B4D8]">
              {t.hero.badge}
            </p>

            <h1 className="mt-5 font-serif text-5xl font-light leading-[1.05] tracking-tight text-balance sm:text-6xl xl:text-7xl">
              {t.hero.title}
            </h1>

            <p className="mx-auto mt-7 max-w-lg font-sans text-base leading-relaxed text-pretty text-[#f5f0e8]/65 lg:mx-0">
              {t.hero.lede}
            </p>

            <div data-parallax-layer="4" className="mt-10">
              <div className="lg:[&>div]:justify-start">
                <StoreButtons t={t} />
              </div>
              <p className="mt-5 font-sans text-xs text-[#f5f0e8]/60">
                {t.hero.note}
              </p>
            </div>
          </div>

          {/* Poster — uygulamanin acilis gorseli */}
          <div data-parallax-layer="2" className="flex justify-center">
            <div className="relative w-[min(78vw,320px)] rotate-[1.5deg] sm:w-[340px] lg:w-full lg:max-w-[380px]">
              <Image
                src="/poster.webp"
                alt=""
                width={800}
                height={1422}
                priority
                sizes="(max-width: 1024px) 78vw, 380px"
                className="h-auto w-full rounded-2xl shadow-2xl shadow-black/70 ring-1 ring-[#f5f0e8]/15"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 55%, rgba(26,26,31,0.75) 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </ParallaxLayers>

      {/* ── Ozellikler ── */}
      <section
        id="features"
        className="border-t border-[#f5f0e8]/10 px-6 py-24 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.25em] text-[#00B4D8]">
            {t.nav.features}
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl font-light leading-tight text-balance sm:text-5xl">
            {t.featuresTitle}
          </h2>
          <p className="mt-4 max-w-xl font-sans leading-relaxed text-pretty text-[#f5f0e8]/55">
            {t.featuresLede}
          </p>

          <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {t.features.map((f, i) => {
              const Icon = ICONS[i] ?? Compass;
              return (
                <li key={f.title}>
                  <Icon
                    aria-hidden
                    strokeWidth={1.25}
                    className="h-7 w-7 text-[#00B4D8]"
                  />
                  <h3 className="mt-5 font-serif text-xl font-medium leading-snug">
                    {f.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-sm leading-relaxed text-[#f5f0e8]/55">
                    {f.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── Kapanis ── */}
      <section className="border-t border-[#f5f0e8]/10 px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-4xl font-light leading-tight text-balance sm:text-5xl">
            {t.cta.title}
          </h2>
          <p className="mt-4 font-sans text-[#f5f0e8]/55">{t.cta.body}</p>
          <div className="mt-10">
            <StoreButtons t={t} />
          </div>
        </div>
      </section>

      <Footer lang={lang} t={t} />
    </div>
  );
}
