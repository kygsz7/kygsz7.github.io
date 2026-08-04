import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages statik dosya sunar; sunucu tarafi calismaz.
  // Bu ayar `next build` sonunda out/ klasorune duz HTML uretir.
  output: "export",

  // Statik export'ta Next'in resim optimizasyon sunucusu yok.
  images: { unoptimized: true },

  // /privacy -> out/privacy.html olarak ciksin (canli sitedeki URL bu).
  // trailingSlash: true olsaydi out/privacy/index.html olurdu ve
  // Play Console'a kayitli /privacy.html linki kirilirdi.
  trailingSlash: false,
};

export default nextConfig;
