import Link from "next/link";

import { Footer, Header } from "@/components/site-chrome";
import { CONTACT_EMAIL, dict, langHref, type Lang } from "@/lib/i18n";

export default function Privacy({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const p = t.privacy;

  return (
    <div lang={lang} className="flex min-h-screen flex-col">
      <Header lang={lang} t={t} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-20">
        <h1 className="font-serif text-4xl font-light leading-tight sm:text-5xl">
          {p.title}
        </h1>
        <p className="mt-3 font-sans text-xs uppercase tracking-[0.18em] text-[#f5f0e8]/40">
          {p.updated}
        </p>

        <p className="mt-10 font-sans leading-relaxed text-[#f5f0e8]/70">
          {p.intro}
        </p>

        {p.sections.map((s) => (
          <section key={s.heading} className="mt-12">
            <h2 className="font-serif text-2xl font-normal text-[#00B4D8]">
              {s.heading}
            </h2>

            {s.body && (
              <p className="mt-3 font-sans leading-relaxed text-[#f5f0e8]/70">
                {s.body}
              </p>
            )}

            {s.items && (
              <ul className="mt-4 space-y-2.5">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="relative pl-5 font-sans text-[0.95rem] leading-relaxed text-[#f5f0e8]/70 before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-[#00B4D8]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <p className="mt-12">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-sans font-medium text-[#00B4D8] underline underline-offset-4 transition-opacity hover:opacity-75"
          >
            {CONTACT_EMAIL}
          </a>
        </p>

        <Link
          href={langHref(lang)}
          className="mt-14 inline-block font-sans text-sm text-[#f5f0e8]/45 underline-offset-4 transition-colors hover:text-[#f5f0e8] hover:underline"
        >
          ← {p.back}
        </Link>
      </main>

      <Footer lang={lang} t={t} />
    </div>
  );
}
