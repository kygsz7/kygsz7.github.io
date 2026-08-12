/**
 * Gorsel dogrulama araci.
 *
 *   npx next build && npx serve out -p 4401   (veya: python -m http.server 4401)
 *   node scripts/shot.mjs
 *
 * Ekran goruntuleri .screenshots/ altina duser (git'e girmez).
 * Konsol hatalarini da yakalar — sessiz 404'leri boyle bulduk.
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.SHOT_BASE ?? "http://localhost:4401";
const OUT = path.resolve(".screenshots");
fs.mkdirSync(OUT, { recursive: true });

const targets = [
  ["desktop-tr", "/", { width: 1440, height: 900 }],
  ["mobile-tr", "/", { width: 390, height: 844 }],
  ["desktop-ru", "/ru.html", { width: 1440, height: 900 }],
  ["privacy-tr", "/privacy.html", { width: 1440, height: 900 }],
];

const browser = await chromium.launch();
const errors = [];

for (const [name, url, viewport] of targets) {
  const page = await browser.newPage({ viewport });
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`${name}: ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`${name}: ${e.message}`));

  await page.goto(BASE + url, { waitUntil: "networkidle" });

  // loading="lazy" gorseller ekrana girmeden yuklenmiyor; tam sayfa
  // goruntusunde alt bolumler bos cikiyordu. Once sayfayi bastan sona
  // kaydir, sonra basa don.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  await page.screenshot({
    path: path.join(OUT, `${name}-full.png`),
    fullPage: true,
  });
  await page.close();
}

await browser.close();
console.log(
  errors.length ? "KONSOL HATALARI:\n" + errors.join("\n") : "konsol hatasi yok"
);
