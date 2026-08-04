import type { Metadata } from "next";

import Landing from "@/components/landing";
import { LANGS, dict, langHref } from "@/lib/i18n";

/* Varsayilan dil (tr) kok URL'de durur — canli sitedeki yapi bu.
   Statik export'ta redirect() calismaz, o yuzden burada dogrudan render. */

export const metadata: Metadata = {
  title: dict.tr.htmlTitle,
  description: dict.tr.metaDescription,
  alternates: {
    canonical: "/",
    languages: Object.fromEntries(LANGS.map((l) => [l, langHref(l)])),
  },
  openGraph: {
    title: dict.tr.htmlTitle,
    description: dict.tr.metaDescription,
    images: ["/og.jpg"],
    locale: "tr",
    type: "website",
  },
};

export default function HomePage() {
  return <Landing lang="tr" />;
}
