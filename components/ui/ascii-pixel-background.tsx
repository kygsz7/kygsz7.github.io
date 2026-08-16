"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas2D piksel-mozaik arka plani (21st.dev "ascii" tarifi, renderMode="pixel").
 *
 * PERFORMANS: cellSize=3 ile 1440x700 kanvasta ~112.000 hucre var. Kare
 * basina o kadar fillRect cizmek 60fps'i tasir. Bunun yerine:
 *   1) kaynak fotograf cols x rows (ornegin 480x233) kucuk bir kanvasa
 *      drawImage ile indirgeniyor — tarayici bunu donanimda yapiyor ve
 *      her piksel zaten hucrenin ortalama rengi oluyor
 *   2) animasyon ve renk ayarlari o kucuk ImageData uzerinde donuyor
 *      (~112k piksel, kare basina 1-2 ms)
 *   3) sonuc imageSmoothingEnabled=false ile buyutuluyor — piksel gorunumu
 *      bedava geliyor
 */

type Pfx = { enabled: boolean; intensity: number };

export type AsciiPixelProps = {
  src: string;
  cellSize?: number;
  brightness?: number; // -100..100
  contrast?: number; // 0..200, 100 = notr
  /** Verilmezse --background token'i kullanilir. */
  bgColor?: string;
  bgOpacity?: number; // 0..100
  animated?: boolean;
  animSpeed?: number; // 0..100
  animIntensity?: number; // 0..100
  bloom?: Pfx;
  vignette?: Pfx;
  className?: string;
};

export default function AsciiPixelBackground({
  src,
  cellSize = 3,
  brightness = 12,
  contrast = 115,
  bgColor,   // verilmezse --background token'indan okunur
  bgOpacity = 90,
  animated = true,
  animSpeed = 100,
  animIntensity = 60,
  bloom = { enabled: true, intensity: 25 },
  vignette = { enabled: true, intensity: 38 },
  className,
}: AsciiPixelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Tema degistiginde kanvas da degissin: rengi token'dan oku
    const cssVar = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
    const bg = bgColor ?? cssVar("--background", "#1a1a1f");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const moving = animated && !reduced;

    // Hucre izgarasi icin kucuk kanvaslar
    const small = document.createElement("canvas");
    const sctx = small.getContext("2d", { willReadFrequently: true });
    if (!sctx) return;

    let base: ImageData | null = null; // kaynagin indirgenmis hali
    let work: ImageData | null = null; // her karede uzerine yazilan kopya
    let raf = 0;
    let img: HTMLImageElement | null = null;
    let disposed = false;

    // brightness/contrast'i 256 girisli tabloya onceden hesapla —
    // piksel basina carpma/toplama yapmaktan cok daha ucuz
    const lut = new Uint8ClampedArray(256);
    {
      const c = contrast / 100;
      const b = (brightness / 100) * 255;
      for (let i = 0; i < 256; i++) {
        lut[i] = Math.max(0, Math.min(255, (i - 128) * c + 128 + b));
      }
    }

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      canvas.width = w;
      canvas.height = h;

      small.width = Math.max(1, Math.floor(w / cellSize));
      small.height = Math.max(1, Math.floor(h / cellSize));

      if (img) {
        // Kaynagi hucre izgarasina indirge: her piksel = hucre ortalamasi
        sctx.imageSmoothingEnabled = true;
        sctx.clearRect(0, 0, small.width, small.height);
        drawCover(sctx, img, small.width, small.height);
        base = sctx.getImageData(0, 0, small.width, small.height);
        work = sctx.createImageData(small.width, small.height);
      }
      ctx.imageSmoothingEnabled = false;
    };

    const render = (t: number) => {
      if (disposed || !base || !work) return;
      const sw = small.width;
      const sh = small.height;
      const src8 = base.data;
      const dst8 = work.data;

      // Dalga: satir bazli parlaklik modulasyonu. Faz satira gore kayiyor,
      // boylece yukaridan asagi akan bir dalga olusuyor.
      const amp = moving ? (animIntensity / 100) * 0.45 : 0;
      const speed = (animSpeed / 100) * 0.0016;
      const phase = t * speed;

      for (let y = 0; y < sh; y++) {
        const wave = amp === 0 ? 1 : 1 + amp * Math.sin(phase + y * 0.09);
        for (let x = 0; x < sw; x++) {
          const i = (y * sw + x) << 2;
          dst8[i] = lut[src8[i]] * wave;
          dst8[i + 1] = lut[src8[i + 1]] * wave;
          dst8[i + 2] = lut[src8[i + 2]] * wave;
          dst8[i + 3] = 255;
        }
      }
      sctx.putImageData(work, 0, 0);

      const w = canvas.width;
      const h = canvas.height;

      // bgMode "solid": once duz zemin, sonra mozaik bgOpacity ile ustune
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      ctx.globalAlpha = bgOpacity / 100;
      ctx.drawImage(small, 0, 0, w, h);
      ctx.globalAlpha = 1;

      // Bloom: ayni kareyi bulanik ve toplamali harmanla
      if (bloom.enabled && bloom.intensity > 0) {
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = (bloom.intensity / 100) * 0.5;
        ctx.filter = `blur(${Math.round(cellSize * 4)}px)`;
        ctx.drawImage(small, 0, 0, w, h);
        ctx.filter = "none";
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }

      // Vignette: kenarlari zemine karartir, kutu kenari gorunmesin
      if (vignette.enabled && vignette.intensity > 0) {
        const g = ctx.createRadialGradient(
          w / 2, h / 2, Math.min(w, h) * 0.15,
          w / 2, h / 2, Math.max(w, h) * 0.72
        );
        const a = vignette.intensity / 100;
        g.addColorStop(0, "rgba(0,0,0,0)");
        g.addColorStop(1, `rgba(0,0,0,${a})`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      if (moving) raf = requestAnimationFrame(render);
    };

    img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (disposed) return;
      layout();
      if (moving) raf = requestAnimationFrame(render);
      else render(0);
    };
    img.src = src;

    const ro = new ResizeObserver(() => {
      layout();
      if (!moving) render(0);
    });
    ro.observe(canvas);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [src, cellSize, brightness, contrast, bgColor, bgOpacity, animated,
      animSpeed, animIntensity, bloom.enabled, bloom.intensity,
      vignette.enabled, vignette.intensity]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}

/** object-fit: cover davranisini drawImage ile taklit eder. */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number
) {
  const ir = img.width / img.height;
  const cr = w / h;
  let dw = w;
  let dh = h;
  if (ir > cr) dw = h * ir;
  else dh = w / ir;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}
