import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

/* Her iki font da Kiril destekliyor — Rusca sayfa icin sart.
   Canli sitedeki Bebas Neue ve DM Sans'ta Kiril YOK, bu yuzden kullanilmiyor. */
const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
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
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
