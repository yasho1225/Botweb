"use client";

import { useReducedMotion } from "framer-motion";

export const EASE = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  spring: { type: "spring" as const, stiffness: 260, damping: 28 },
  springFast: { type: "spring" as const, stiffness: 400, damping: 30 },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE.out },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE.out },
  },
};

export const blurUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, delay: i * 0.1, ease: EASE.out },
  }),
};

export const maskUp = {
  hidden: { opacity: 0, y: "100%" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: EASE.out },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE.out },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE.out },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE.out } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: EASE.inOut } },
};

export function useMotionSafe() {
  const reduced = useReducedMotion();
  return {
    reduced: !!reduced,
    duration: reduced ? 0 : undefined,
    initial: reduced ? false : undefined,
  };
}

export function motionProps(reduced: boolean) {
  if (reduced) {
    return { initial: false as const, animate: undefined, transition: { duration: 0 } };
  }
  return {};
}
