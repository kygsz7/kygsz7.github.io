import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

/* Instagram Sans istenmisti; Meta'nin tescilli fontu, halka acik lisansi yok
   (Colophon Foundry ile ozel uretim). En yakin serbest lisansli karsiligi
   Rubik: ayni yuvarlak-geometrik karakter, degisken agirlik.

   Kiril sart — RU sayfasi var. Bu yuzden Poppins ve DM Sans elendi
   (Instagram Sans'e yakinlar ama Kiril tasimiyorlar), ayni sebeple daha
   once Bebas Neue ve DM Sans kullanilmamisti.

   Baslik ve govde ayni aileden: font-serif -> --font-sans eslesmesi
   app/globals.css icindeki @theme blogunda. */
const sans = Rubik({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://antalya-cebinde.live"),
  title: "Antalya Cebinde — Antalya Gezi Rehberi",
  description:
    "Antalya'nın plajları, antik kentleri, koyları ve mekanları tek uygulamada. 128 mekan, 147 etkinlik. Ücretsiz.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
