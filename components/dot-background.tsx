/* eslint-disable @typescript-eslint/no-explicit-any --
   Three.js CDN'den runtime'da yukleniyor, statik tipi yok.
   Bkz. components/ui/modern-login-signup.tsx icindeki ayni not. */
"use client";

import { useEffect, useRef } from "react";

const THREE_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

/** Ayni script'i iki bilesen ayni anda isterse tek yukleme yapilsin. */
let threeLoader: Promise<any> | null = null;

function loadThree(): Promise<any> {
  if ((window as any).THREE) return Promise.resolve((window as any).THREE);
  if (threeLoader) return threeLoader;

  threeLoader = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = THREE_CDN;
    script.async = true;
    script.onload = () => resolve((window as any).THREE);
    script.onerror = () => {
      threeLoader = null;
      reject(new Error("three.js yuklenemedi"));
    };
    document.head.appendChild(script);
  });
  return threeLoader;
}

/** "#00B4D8" -> [0, 0.706, 0.847] */
function hexToRgb01(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

type Props = {
  /** Nokta rengi. Varsayilan: marka turkuazi. */
  color?: string;
  className?: string;
};

export default function DotBackground({
  color = "#00B4D8",
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Hareket azaltma tercihini sayan kullanicilara animasyon gosterme.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = true;
    let renderer: any;
    let geometry: any;
    let material: any;
    let animationId = 0;
    let removeResize: (() => void) | undefined;

    const init = (THREE: any) => {
      const canvas = canvasRef.current;
      if (!canvas || !active) return;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms = {
        u_time: { value: 0 },
        u_resolution: {
          value: new THREE.Vector2(
            window.innerWidth * 2,
            window.innerHeight * 2
          ),
        },
        u_opacities: {
          value: [0.2, 0.2, 0.3, 0.35, 0.45, 0.5, 0.6, 0.75, 0.9, 1.0],
        },
        u_color: { value: new THREE.Vector3(...hexToRgb01(color)) },
        u_total_size: { value: 20.0 },
        u_dot_size: { value: 5.0 },
      };

      material = new THREE.ShaderMaterial({
        vertexShader: `
          precision mediump float;
          uniform vec2 u_resolution;
          out vec2 fragCoord;
          void main() {
            gl_Position = vec4(position, 1.0);
            fragCoord = (position.xy + 1.0) * 0.5 * u_resolution;
            fragCoord.y = u_resolution.y - fragCoord.y;
          }
        `,
        fragmentShader: `
          precision mediump float;
          in vec2 fragCoord;

          uniform float u_time;
          uniform float u_opacities[10];
          uniform vec3 u_color;
          uniform float u_total_size;
          uniform float u_dot_size;
          uniform vec2 u_resolution;

          out vec4 fragColor;

          float PHI = 1.61803398874989484820459;
          float random(vec2 xy) {
              return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
          }

          void main() {
              vec2 st = fragCoord.xy;
              st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));
              st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));

              float opacity = step(0.0, st.x) * step(0.0, st.y);

              vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

              float frequency = 5.0;
              float show_offset = random(st2);
              float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency));
              opacity *= u_opacities[int(rand * 10.0)];
              opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
              opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

              float animation_speed_factor = 2.0;
              vec2 center_grid = u_resolution / 2.0 / u_total_size;
              float dist_from_center = distance(center_grid, st2);
              float intro = dist_from_center * 0.012 + (random(st2) * 0.2);

              opacity *= step(intro, u_time * animation_speed_factor);
              opacity *= clamp((1.0 - step(intro + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);

              fragColor = vec4(u_color, opacity);
              fragColor.rgb *= fragColor.a;
          }
        `,
        uniforms,
        glslVersion: THREE.GLSL3,
        blending: THREE.CustomBlending,
        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneFactor,
        transparent: true,
      });

      geometry = new THREE.PlaneGeometry(2, 2);
      scene.add(new THREE.Mesh(geometry, material));

      const start = performance.now();
      const animate = () => {
        if (!active) return;
        animationId = requestAnimationFrame(animate);
        uniforms.u_time.value = (performance.now() - start) / 1000;
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.u_resolution.value.set(
          window.innerWidth * 2,
          window.innerHeight * 2
        );
      };
      window.addEventListener("resize", onResize);
      removeResize = () => window.removeEventListener("resize", onResize);
    };

    loadThree()
      .then(init)
      // CDN erisilemezse sayfa animasyonsuz calismaya devam etsin.
      .catch(() => {});

    return () => {
      active = false;
      if (removeResize) removeResize();
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, [color]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
