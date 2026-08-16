import Image from "next/image";
import Link from "next/link";

import {
  APPSTORE_URL,
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  LANGS,
  LANG_NAMES,
  LANG_NAV_LABEL,
  LANG_SHORT,
  PLAY_URL,
  langHref,
  privacyHref,
  type Dict,
  type Lang,
} from "@/lib/i18n";

export function Header({ lang }: { lang: Lang }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/10 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3.5">
        <Link
          href={langHref(lang)}
          prefetch={false}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.webp"
            alt=""
            width={32}
            height={32}
            // Uygulama ikonu yuvarlak kare — daire maskesi kosaleri keserdi
            className="h-8 w-8 rounded-[0.5rem] ring-1 ring-foreground/15"
          />
          <span className="font-serif text-lg leading-none whitespace-nowrap">
            Antalya Cebinde
          </span>
        </Link>

        <nav
          className="ml-auto flex items-center gap-0.5"
          aria-label={LANG_NAV_LABEL[lang]}
        >
          {LANGS.map((l) => (
            <Link
              key={l}
              href={langHref(l)}
              hrefLang={l}
              // Statik export'ta dinamik segmentin RSC payload'i uretilmiyor;
              // prefetch her ziyarette 404 istegi doguruyordu.
              prefetch={false}
              aria-current={l === lang ? "page" : undefined}
              aria-label={LANG_NAMES[l]}
              className={
                "cursor-pointer rounded-full px-2.5 py-2 font-sans text-xs transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-3 " +
                (l === lang
                  ? "text-primary"
                  : "text-foreground/60 hover:text-foreground")
              }
            >
              <span className="sm:hidden">{LANG_SHORT[l]}</span>
              <span className="hidden sm:inline">{LANG_NAMES[l]}</span>
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
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-3.5 font-sans text-sm font-semibold text-primary-foreground shadow-lg shadow-black/40 transition-all duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
      >
        <GooglePlayIcon />
        {t.hero.play}
      </a>

      {APPSTORE_URL && (
        <a
          href={APPSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border border-border/25 px-7 py-3.5 font-sans text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
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
    <footer className="border-t border-border/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <span className="font-sans text-xs text-foreground/55">
          © {new Date().getFullYear()} Antalya Cebinde · {t.footer.rights}
        </span>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-xs">
          <Link
            href={privacyHref(lang)}
            prefetch={false}
            className="cursor-pointer text-foreground/50 underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {t.footer.privacy}
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-1.5 text-foreground/50 underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            <InstagramIcon />
            @{INSTAGRAM_HANDLE}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="cursor-pointer text-foreground/50 underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {t.footer.contact}
          </a>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
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
