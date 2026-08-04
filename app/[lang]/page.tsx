import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Landing from "@/components/landing";
import { DEFAULT_LANG, LANGS, dict, langHref, type Lang } from "@/lib/i18n";

/* Sadece varsayilan olmayan diller burada: /en, /ru.
   Turkce kok URL'de (app/page.tsx). */
const SUB_LANGS = LANGS.filter((l) => l !== DEFAULT_LANG);

export function generateStaticParams() {
  return SUB_LANGS.map((lang) => ({ lang }));
}

export const dynamicParams = false;

function isSubLang(v: string): v is Lang {
  return (SUB_LANGS as readonly string[]).includes(v);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isSubLang(lang)) return {};
  const t = dict[lang];
  return {
    title: t.htmlTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(LANGS.map((l) => [l, langHref(l)])),
    },
    openGraph: {
      title: t.htmlTitle,
      description: t.metaDescription,
      images: ["/og.jpg"],
      locale: lang,
      type: "website",
    },
  };
}

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isSubLang(lang)) notFound();
  return <Landing lang={lang} />;
}
