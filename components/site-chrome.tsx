import Image from "next/image";
import Link from "next/link";

import {
  APPSTORE_URL,
  CONTACT_EMAIL,
  LANGS,
  LANG_NAMES,
  PLAY_URL,
  langHref,
  privacyHref,
  type Dict,
  type Lang,
} from "@/lib/i18n";

export function Header({ lang, t }: { lang: Lang; t: Dict }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#f5f0e8]/10 bg-[#1a1a1f]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3.5">
        <Link
          href={langHref(lang)}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.webp"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full ring-1 ring-[#f5f0e8]/20"
          />
          <span className="font-serif text-lg leading-none">
            Antalya Cebinde
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-0.5" aria-label={t.nav.features}>
          {LANGS.map((l) => (
            <Link
              key={l}
              href={langHref(l)}
              hrefLang={l}
              aria-current={l === lang ? "page" : undefined}
              className={
                "cursor-pointer rounded-full px-3 py-2 font-sans text-xs transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B4D8] " +
                (l === lang
                  ? "text-[#00B4D8]"
                  : "text-[#f5f0e8]/45 hover:text-[#f5f0e8]")
              }
            >
              {LANG_NAMES[l]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function StoreButtons({ t }: { t: Dict }) {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <a
        href={PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#00B4D8] px-7 py-3.5 font-sans text-sm font-semibold text-[#08222b] shadow-lg shadow-black/40 transition-all duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B4D8] sm:w-auto"
      >
        <GooglePlayIcon />
        {t.hero.play}
      </a>

      {APPSTORE_URL && (
        <a
          href={APPSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border border-[#f5f0e8]/25 px-7 py-3.5 font-sans text-sm font-semibold text-[#f5f0e8] transition-colors duration-200 hover:bg-[#f5f0e8]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B4D8] sm:w-auto"
        >
          <AppleIcon />
          {t.hero.ios}
        </a>
      )}
    </div>
  );
}

export function Footer({ lang, t }: { lang: Lang; t: Dict }) {
  return (
    <footer className="border-t border-[#f5f0e8]/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <span className="font-sans text-xs text-[#f5f0e8]/35">
          © {new Date().getFullYear()} Antalya Cebinde · {t.footer.rights}
        </span>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-xs">
          <Link
            href={privacyHref(lang)}
            className="cursor-pointer text-[#f5f0e8]/50 underline-offset-4 transition-colors hover:text-[#f5f0e8] hover:underline"
          >
            {t.footer.privacy}
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="cursor-pointer text-[#f5f0e8]/50 underline-offset-4 transition-colors hover:text-[#f5f0e8] hover:underline"
          >
            {t.footer.contact}
          </a>
        </div>
      </div>
    </footer>
  );
}

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden>
      <path
        fill="currentColor"
        d="M3.6 1.9a1.5 1.5 0 0 0-.5 1.1v18a1.5 1.5 0 0 0 .5 1.1l.1.1 10.1-10.1v-.2L3.7 1.8l-.1.1zm13.7 13.6-3.5-3.5L3.6 22.1c.4.4 1 .5 1.8.1l11.9-6.7zm.0-7-11.9-6.7c-.8-.4-1.4-.4-1.8.1l10.2 10.1 3.5-3.5zm-.1.1-3.4 3.4v.2l3.4 3.4.1-.1 4-2.3c1.2-.7 1.2-1.8 0-2.4l-4.1-2.2z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.56.04 2.88.75 3.65 1.89-3.08 1.75-2.58 5.61.35 6.75-1.01 2.37-2.39 4.39-4.29 4.29zM12.03 7.25c-.15-2.23 1.66-4.07 3.72-4.25.36 2.38-1.92 4.34-3.72 4.25z" />
    </svg>
  );
}
