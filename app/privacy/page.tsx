import type { Metadata } from "next";

import Privacy from "@/components/privacy";
import { LANGS, dict, privacyHref } from "@/lib/i18n";

/* ⚠ Bu sayfa out/privacy.html olarak cikar.
   Canli sitede gizlilik politikasi bu adreste ve link Play Console'a
   kayitli. Rota adi degistirilirse Google'in politika kontrolu kirilir. */

export const metadata: Metadata = {
  title: `${dict.tr.privacy.title} — Antalya Cebinde`,
  description: dict.tr.privacy.intro,
  alternates: {
    canonical: "/privacy",
    languages: Object.fromEntries(LANGS.map((l) => [l, privacyHref(l)])),
  },
};

export default function PrivacyTrPage() {
  return <Privacy lang="tr" />;
}
