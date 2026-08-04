# antalya-cebinde.live

[Antalya Cebinde](https://play.google.com/store/apps/details?id=com.antalyaceb.antalya_cebinde)
uygulamasının tanıtım sitesi. Next.js 16 · Tailwind v4 · statik export · GitHub Pages.

## Adresler

| URL | Kaynak |
|---|---|
| `/` | Türkçe tanıtım sayfası |
| `/en`, `/ru` | İngilizce, Rusça |
| `/privacy.html`, `/privacy_policy.html` | Gizlilik politikası (aynı içerik) |
| `/en/privacy`, `/ru/privacy` | Çevrilmiş politika |
| `/antalya-privacy/` | **Bu repo değil** — ayrı `antalya-privacy` reposu |

> ⚠️ Play Console'a kayıtlı gizlilik politikası URL'i
> `https://kygsz7.github.io/antalya-privacy` — o ayrı bir repo.
> **Silme.** Bu repodaki değişiklikler ona dokunmaz.

## Silinmemesi gereken dosyalar

`public/` altındakiler build çıktısına aynen kopyalanır:

| Dosya | Kaybolursa |
|---|---|
| `CNAME` | Özel alan adı düşer, site `kygsz7.github.io`'ya döner |
| `app-ads.txt` | AdMob doğrulaması bozulur |
| `.nojekyll` | GitHub Pages Jekyll çalıştırır, `_next/` klasörünü yoksayar → **site stilsiz ve JS'siz açılır** |

`.github/workflows/deploy.yml` her yayından önce bunları kontrol eder,
eksikse deploy'u durdurur.

## Geliştirme

```bash
npm install
npm run dev            # http://localhost:3000

npm run build          # out/ klasörüne statik HTML
npx serve out -p 4401  # çıktıyı yerelde dene
npm run shot           # Playwright ile ekran görüntüsü + konsol hatası kontrolü
```

## İçerik nerede

Tüm metinler tek dosyada: [lib/i18n.ts](lib/i18n.ts) — üç dil yan yana.
Yeni özellik/ekran eklemek için oradaki dizilere ekle.

Görseller `public/` altında, hepsi WebP:
- `screenshots/` — uygulama ekranları (Play Store listesinden)
- `photos/` — Antalya fotoğrafları

## Deploy

`main` dalına push → GitHub Actions build alır → Pages'e çıkar.

**İlk kurulumda bir kez yapılması gereken:** Settings → Pages → Source
ayarını **"GitHub Actions"** yap. Şu an "Deploy from a branch" ise site
hâlâ eski kök dizindeki `index.html`'i sunar.

## Kök dizindeki eski dosyalar

`index.html`, `privacy.html`, `privacy_policy.html`, `CNAME`, `app-ads.txt`
— sitenin Next.js öncesi hâli. Pages kaynağı "GitHub Actions"a geçene kadar
yayında olan bunlar; geçişte kesinti olmasın diye duruyorlar.
Geçiş yapıldıktan ve site doğrulandıktan sonra silinebilirler.
