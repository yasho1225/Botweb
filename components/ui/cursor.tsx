"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Custom glow cursor — replaces native on desktop.
 * A small sharp dot tracks instantly; a large soft halo trails
 * behind with spring physics. Swaps to a larger ring on links/buttons.
 */
export function CustomCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const haloX = useSpring(mx, { stiffness: 80, damping: 18 });
  const haloY = useSpring(my, { stiffness: 80, damping: 18 });

  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Touch tablets can hit md: widths — only run for true mouse/trackpad input
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a,button,[data-cursor-hover]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [enabled, mx, my]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing glow halo */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 md:block"
        style={{ x: haloX, y: haloY }}
        animate={{
          scale: clicking ? 0.7 : hovering ? 2.2 : 1,
          opacity: hidden ? 0 : hovering ? 0.5 : 0.2,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="h-12 w-12 rounded-full border border-[rgba(129,140,248,0.6)] bg-[rgba(129,140,248,0.1)] blur-sm" />
      </motion.div>

      {/* Sharp dot — tracks instantly via style, not spring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 md:block"
        style={{ x: mx, y: my }}
        animate={{
          scale: clicking ? 0.5 : hovering ? 0 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
      >
        <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_6px_2px_rgba(129,140,248,0.6)]" />
      </motion.div>
    </>
  );
}
