"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { blurUp, fadeUp, maskUp, scaleIn } from "@/lib/motion";

type RevealVariant = "fadeUp" | "blurUp" | "scaleIn" | "maskUp";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
};

export function Reveal({ children, delay = 0, className, variant = "fadeUp" }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const variants =
    variant === "blurUp"
      ? blurUp
      : variant === "scaleIn"
        ? scaleIn
        : variant === "maskUp"
          ? maskUp
          : fadeUp;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={variants}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: delay * 0.08 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  variant = "fadeUp",
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
}) {
  const variants =
    variant === "blurUp"
      ? blurUp
      : variant === "scaleIn"
        ? scaleIn
        : variant === "maskUp"
          ? maskUp
          : fadeUp;

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

export function RevealMask({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={maskUp}
      >
        {children}
      </motion.div>
    </div>
  );
}
