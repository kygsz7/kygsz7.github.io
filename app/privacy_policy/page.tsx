import type { Metadata } from "next";

import Privacy from "@/components/privacy";
import { dict } from "@/lib/i18n";

/* ⚠ Bu sayfa out/privacy_policy.html olarak cikar.
   Canli sitede ayni icerik hem /privacy.html hem /privacy_policy.html
   adresinde duruyordu (md5'leri ayni). Hangisinin nereye verildigi
   bilinmedigi icin ikisi de korunuyor.
   Kanonik adres /privacy — arama motorlari icerigi tek sayar. */

export const metadata: Metadata = {
  title: `${dict.tr.privacy.title} — Antalya Cebinde`,
  description: dict.tr.privacy.intro,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyAliasPage() {
  return <Privacy lang="tr" />;
}
