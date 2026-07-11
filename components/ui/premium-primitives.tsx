"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Ripple = { id: number; x: number; y: number };

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  variant?: "default" | "gradient";
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
};

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  variant = "default",
  as = "button",
  href,
  onClick,
  type = "button",
  disabled,
  fullWidth = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  function handleMove(e: React.MouseEvent) {
    if (reduced || disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  function handleClick(e: React.MouseEvent) {
    if (!reduced && !disabled && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const id = ++rippleId.current;
      setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    }
    onClick?.();
  }

  const surfaceClass = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-[filter,background-color,border-color,box-shadow,transform] duration-200 active:scale-[0.98]",
    variant === "gradient" &&
      "btn-sheen bg-gradient-to-r from-accent via-[#8b7cf6] to-violet text-white shadow-glow hover:shadow-glow-lg hover:brightness-110",
    fullWidth && "w-full",
    disabled && "opacity-60",
    className,
  );

  const inner = (
    <motion.span
      style={reduced || disabled ? undefined : { x: springX, y: springY }}
      className={surfaceClass}
    >
      {children}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() =>
              setRipples((rs) => rs.filter((item) => item.id !== r.id))
            }
            style={{ left: r.x, top: r.y }}
            className="pointer-events-none absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
            aria-hidden
          />
        ))}
      </AnimatePresence>
    </motion.span>
  );

  const wrapperClass = cn(
    "cursor-pointer select-none",
    fullWidth ? "flex w-full" : "inline-flex",
    disabled && "pointer-events-none",
  );

  const focusClass =
    "block rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={wrapperClass}>
      {as === "a" && href ? (
        <a href={href} className={cn(focusClass, fullWidth && "w-full")} onClick={handleClick}>
          {inner}
        </a>
      ) : (
        <button
          type={type}
          className={cn(focusClass, fullWidth && "w-full")}
          onClick={handleClick}
          disabled={disabled}
        >
          {inner}
        </button>
      )}
    </div>
  );
}

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  deepShadow?: boolean;
};

export function TiltCard({
  children,
  className,
  intensity = 12,
  deepShadow = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 260, damping: 24 });
  const springRotateY = useSpring(rotateY, { stiffness: 260, damping: 24 });

  function handleMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * intensity * 2);
    rotateX.set((0.5 - py) * intensity * 2);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div className={cn("group relative [perspective:1200px]", className)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={
          reduced
            ? undefined
            : {
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
              }
        }
        className={cn(
          "relative h-full w-full cursor-pointer",
          deepShadow && "drop-shadow-[0_32px_64px_-12px_rgba(0,0,0,0.65)]",
        )}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[rgba(129,140,248,0.1)] via-transparent to-[rgba(167,139,250,0.05)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {children}
      </motion.div>
    </div>
  );
}

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  lift?: boolean;
};

export function GlassCard({ children, className, hover = true, lift = true }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={hover ? handleMove : undefined}
      className={cn(
        "glass-card group/card relative overflow-hidden rounded-2xl shadow-card",
        hover &&
          "transition-[box-shadow,border-color,transform] duration-300 hover:border-border-bright hover:shadow-glow",
        hover && lift && "motion-safe:hover:-translate-y-1",
        className,
      )}
    >
      {hover && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{
            background:
              "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(129, 140, 248, 0.1), transparent 70%)",
          }}
          aria-hidden
        />
      )}
      {children}
    </div>
  );
}

type BadgePillProps = {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  pulse?: boolean;
};

export function BadgePill({ children, className, glow = false, pulse = false }: BadgePillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border-bright bg-accent-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-bright",
        glow && "shadow-glow-sm",
        className,
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-bright" />
        </span>
      )}
      {children}
    </span>
  );
}
