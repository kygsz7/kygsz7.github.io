# Bilesenler

## ui/modern-login-signup.tsx + demo.tsx

Giris/kayit ekrani bileseni. **Su an hicbir rotaya bagli degil** —
canli sitede /login.html olusmasin diye `app/login/page.tsx` kaldirildi.
(Icinde "Vercel account" metni ve yer tutucu logo var; tanitim sitesinde
yayinlanmasi istenmedi.)

Geri acmak icin `app/login/page.tsx` olustur:

```tsx
import DemoOne from "@/components/demo";
export default function LoginPage() { return <DemoOne />; }
```

## ui/parallax-scrolling.tsx

Scroll'a bagli parallax kabi (GSAP ScrollTrigger + Lenis).
`landing.tsx` icindeki hero bunu kullaniyor.
`prefers-reduced-motion` varsa hem parallax hem yumusak scroll devre disi.
