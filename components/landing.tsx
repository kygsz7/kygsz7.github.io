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
  { layer: "2", yPercent: 28 }, // arkadaki iki telefon
  { layer: "3", yPercent: 12 }, // metin blogu
  { layer: "4", yPercent: 5 }, // ondeki telefon (en yakin)
];

/** Galeri bolumundeki ekranlar. Sira, dict.screenCaptions ile eslesir. */
const SCREENS = ["trip", "languages", "wildlife", "transport"];

/** Antalya fotograflari — public/photos/ altinda. */
/* Kiyi, antik kent ve muze kareleri donusumlu — galeri tek bir temaya
   sikismasin, uygulamanin kapsami gorunsun. Ilk kare iki sutun kaplar. */
const PHOTOS = [
  "magara",
  "side-heykeller",
  "turkuaz-koy",
  "side-muze-lahit",
  "kano-gunbatimi",
  "side-sutunlar",
  "gulet",
  "antalya-muze-lahit",
  "koy-kayalik",
  "gelidonya-feneri",
  "magara-kemer",
  "toroslar",
  "paddleboard",
  "kayalik-sahil",
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

/** Telefon cercevesi. Ekranlarin en-boy orani farkli oldugu icin
 *  sabit orana kirpiliyor, boylece hepsi ayni boyda gorunuyor. */
function Phone({
  src,
  className,
  priority,
}: {
  src: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={
        "aspect-[9/18] overflow-hidden rounded-[1.6rem] bg-[#0d0d10] p-[3px] shadow-2xl shadow-black/70 ring-1 ring-[#f5f0e8]/15 " +
        (className ?? "")
      }
    >
      <Image
        src={src}
        alt=""
        width={560}
        height={1120}
        priority={priority}
        sizes="(max-width: 1024px) 40vw, 220px"
        className="h-full w-full rounded-[1.45rem] object-cover object-top"
      />
    </div>
  );
}

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

          {/* Uc gercek uygulama ekrani, ust uste ve farkli derinlikte */}
          <div className="relative flex h-[380px] items-center justify-center sm:h-[460px] lg:h-[540px]">
            <div data-parallax-layer="2" className="absolute inset-0">
              <Phone
                src="/screenshots/map.webp"
                className="absolute left-0 top-8 w-[38%] -rotate-6 sm:top-10"
              />
              <Phone
                src="/screenshots/place.webp"
                className="absolute right-0 top-4 w-[38%] rotate-6"
              />
            </div>

            <div
              data-parallax-layer="4"
              className="absolute inset-0 flex justify-center"
            >
              <Phone
                src="/screenshots/discover.webp"
                priority
                className="absolute top-0 w-[44%]"
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

      {/* ── Uygulama ekranlari ── */}
      <section className="overflow-hidden border-t border-[#f5f0e8]/10 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="max-w-2xl font-serif text-4xl font-light leading-tight text-balance sm:text-5xl">
            {t.screensTitle}
          </h2>
          <p className="mt-4 max-w-xl font-sans leading-relaxed text-pretty text-[#f5f0e8]/55">
            {t.screensLede}
          </p>
        </div>

        {/* Dar ekranda yatay kaydirilir, genis ekranda hepsi sigar */}
        <ul className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] lg:justify-center lg:overflow-visible">
          {SCREENS.map((name, i) => (
            <li
              key={name}
              className="w-[46vw] max-w-[210px] shrink-0 snap-center sm:w-[30vw] lg:w-[180px]"
            >
              <Phone src={`/screenshots/${name}.webp`} />
              <p className="mt-4 font-sans text-xs leading-relaxed text-[#f5f0e8]/55">
                {t.screenCaptions[i]}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Antalya fotograflari ── */}
      <section className="border-t border-[#f5f0e8]/10 px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-2xl font-serif text-4xl font-light leading-tight text-balance sm:text-5xl">
            {t.photosTitle}
          </h2>
          <p className="mt-4 max-w-xl font-sans leading-relaxed text-pretty text-[#f5f0e8]/55">
            {t.photosLede}
          </p>

          <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {PHOTOS.map((name, i) => (
              <li
                key={name}
                // Ilk kare iki sutun kaplasin — izgaraya ritim katar
                className={i === 0 ? "col-span-2 sm:col-span-2" : undefined}
              >
                <Image
                  src={`/photos/${name}.webp`}
                  alt=""
                  width={900}
                  height={675}
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="h-full w-full rounded-lg object-cover"
                />
              </li>
            ))}
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
