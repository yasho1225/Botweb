"use client";

import { useReducedMotion, useScroll } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const SceneCanvas = dynamic(() => import("./scene-canvas"), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Lazily mounts the 3D scene after first paint. Renders nothing when the user
 * prefers reduced motion or WebGL is unavailable, leaving the 2D
 * SiteBackground as the graceful fallback.
 */
export function SceneRoot() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      scrollRef.current = v;
    });
  }, [scrollYProgress]);

  useEffect(() => {
    if (!supportsWebGL()) return;
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);

    // Defer the 3D chunk until the browser is idle so it never competes
    // with first paint.
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(id);
  }, []);

  if (reduced || !ready) return null;

  return <SceneCanvas scrollRef={scrollRef} isMobile={isMobile} />;
}
