"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Scroll'a bagli parallax kabi.
 *
 * Icindeki her `data-parallax-layer="<n>"` elemani, `layers` icinde o isim
 * icin verilen yPercent degeri kadar kayar. Kucuk deger = yavas = uzak katman.
 *
 * Kaynak fikir: Osmo'nun parallax demosu. Burada yeniden kullanilabilir bir
 * primitife cevrildi; gorseller disaridan children olarak veriliyor.
 */

type LayerSpec = { layer: string; yPercent: number };

const DEFAULT_LAYERS: LayerSpec[] = [
  { layer: "1", yPercent: 70 },
  { layer: "2", yPercent: 55 },
  { layer: "3", yPercent: 40 },
  { layer: "4", yPercent: 10 },
];

type Props = {
  children: ReactNode;
  layers?: LayerSpec[];
  /** Lenis yumusak scroll'u tum sayfaya uygular. Tek bir yerde acilmali. */
  smoothScroll?: boolean;
  className?: string;
};

export function ParallaxLayers({
  children,
  layers = DEFAULT_LAYERS,
  smoothScroll = true,
  className,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Hareket azaltma tercihi varsa parallax da yumusak scroll da devrede olmaz.
    // Lenis native scroll'u ele gecirdigi icin bu bir erisilebilirlik gereksinimi.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });

      layers.forEach((spec, i) => {
        const els = root.querySelectorAll(
          `[data-parallax-layer="${spec.layer}"]`
        );
        if (els.length) {
          tl.to(els, { yPercent: spec.yPercent, ease: "none" }, i ? "<" : undefined);
        }
      });
    }, root);

    let lenis: Lenis | undefined;
    let onTick: ((time: number) => void) | undefined;

    if (smoothScroll) {
      lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      onTick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      // ctx.revert() sadece bu bilesenin olusturdugu tween/trigger'lari temizler;
      // ScrollTrigger.getAll().forEach(kill) sayfadaki digerlerini de oldururdu.
      ctx.revert();
      if (onTick) gsap.ticker.remove(onTick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis?.destroy();
    };
  }, [layers, smoothScroll]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
