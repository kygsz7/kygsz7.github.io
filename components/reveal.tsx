"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll ile beliren sarmalayici.
 *
 * Sayfa sunucu bileseni; animasyon istemci tarafinda calismali. Bu kucuk
 * istemci sarmalayici sayesinde landing.tsx sunucu bileseni olarak kaliyor,
 * "use client" tum agaca yayilmiyor.
 *
 * once={true}: bir kez belirir, tekrar tekrar oynamaz — asagi yukari
 * kaydirirken yanip sonme olusmasin.
 */
type Props = {
  children: ReactNode;
  /** Sirali gecikme — bir listedeki ogeler pesi sira belirsin. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
};

export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    // Hareket azaltma tercihi: animasyon yok, icerik dogrudan gorunur.
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

/** Alt ogeleri sirayla belirten kap. Reveal.Item ile birlikte kullanilir. */
const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function RevealList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <ul className={className}>{children}</ul>;

  return (
    <motion.ul
      className={className}
      variants={listVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </motion.ul>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <li className={className}>{children}</li>;

  return (
    <motion.li className={className} variants={itemVariants}>
      {children}
    </motion.li>
  );
}
