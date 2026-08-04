import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Privacy from "@/components/privacy";
import { DEFAULT_LANG, LANGS, dict, privacyHref, type Lang } from "@/lib/i18n";

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
    title: `${t.privacy.title} — Antalya Cebinde`,
    description: t.privacy.intro,
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: Object.fromEntries(LANGS.map((l) => [l, privacyHref(l)])),
    },
  };
}

export default async function PrivacyLangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isSubLang(lang)) notFound();
  return <Privacy lang={lang} />;
}
