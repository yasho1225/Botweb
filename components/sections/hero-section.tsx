"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { MagneticButton } from "@/components/ui/premium-primitives";
import { EASE } from "@/lib/motion";

const HEADLINE_LINE_1 = ["Every", "mission"];
const HEADLINE_LINE_2 = ["deserves", "to", "be", "seen."];

// Faint org names scattered in the background — only visible inside the spotlight
const HIDDEN_WORDS = [
  { text: "food banks", left: "8%", top: "18%", rotate: -8 },
  { text: "shelters", left: "78%", top: "14%", rotate: 6 },
  { text: "school clubs", left: "4%", top: "68%", rotate: 5 },
  { text: "arts orgs", left: "84%", top: "62%", rotate: -5 },
  { text: "charities", left: "16%", top: "88%", rotate: -4 },
  { text: "community groups", left: "66%", top: "86%", rotate: 7 },
] as const;

const HEADLINE_CLASS =
  "font-display font-bold text-[clamp(2.7rem,7.5vw,6.5rem)] leading-[1.06] tracking-[-0.04em]";

// ─── Atmospheric particles (2D canvas — cheap, 60fps, no 3D engine) ──────────

function Particles({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let raf = 0;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.4,
      speed: Math.random() * 0.9 + 0.25, // upward drift
      drift: (Math.random() - 0.5) * 0.3, // sideways wander
      opacity: Math.random() * 0.3 + 0.06,
      tint: Math.random() < 0.7 ? "129,140,248" : "167,139,250",
      phase: Math.random() * Math.PI * 2, // twinkle offset
    }));

    function resize() {
      const rect = parent!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas!.width = W * DPR;
      canvas!.height = H * DPR;
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let last = performance.now();
    function tick(now: number) {
      const dt = Math.min(now - last, 50) / 16.7; // normalize to 60fps frames
      last = now;
      ctx!.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.y -= p.speed * 0.0006 * dt;
        p.x += p.drift * 0.0002 * dt;
        if (p.y < -0.02) {
          p.y = 1.02;
          p.x = Math.random();
        }
        if (p.x < -0.02) p.x = 1.02;
        else if (p.x > 1.02) p.x = -0.02;

        const twinkle = 0.75 + 0.25 * Math.sin(now * 0.001 + p.phase);
        ctx!.beginPath();
        ctx!.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.tint},${p.opacity * twinkle})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    function onVisibility() {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />;
}

// ─── Headline (rendered twice: dim base + vivid masked overlay) ──────────────

function Word({
  children,
  delay,
  animated,
  reduced,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  animated: boolean;
  reduced: boolean;
  className?: string;
}) {
  return (
    <span className="inline-block overflow-hidden align-top">
      <motion.span
        initial={animated && !reduced ? { y: "110%" } : false}
        animate={{ y: "0%" }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Headline({
  vivid,
  animated,
  reduced,
}: {
  vivid: boolean;
  animated: boolean;
  reduced: boolean;
}) {
  const base = vivid ? "text-foreground" : "text-[rgba(248,250,252,0.15)]";
  const accent = vivid ? "gradient-text" : "text-[rgba(248,250,252,0.15)]";
  // Only the dim base layer is a real heading; the vivid overlay is decorative
  const Tag = vivid ? "div" : "h1";

  return (
    <Tag className={HEADLINE_CLASS} aria-hidden={vivid || undefined}>
      <span className="flex flex-wrap justify-center gap-x-[0.26em]">
        {HEADLINE_LINE_1.map((w, i) => (
          <Word
            key={w}
            delay={0.2 + i * 0.09}
            animated={animated}
            reduced={reduced}
            className={base}
          >
            {w}
          </Word>
        ))}
      </span>
      <span className="flex flex-wrap justify-center gap-x-[0.26em]">
        {HEADLINE_LINE_2.map((w, i) => (
          <Word
            key={w}
            delay={0.38 + i * 0.09}
            animated={animated}
            reduced={reduced}
            className={w === "seen." ? accent : base}
          >
            {w}
          </Word>
        ))}
      </span>
    </Tag>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function HeroSection() {
  const reduced = !!useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  // Once the user moves the mouse, the intro sweep stops driving the light
  const interacted = useRef(false);

  // Spotlight position — one pair per coordinate space (section bg / headline)
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);
  const hx = useMotionValue(-400);
  const hy = useMotionValue(80);
  const sgx = useSpring(gx, { stiffness: 140, damping: 22 });
  const sgy = useSpring(gy, { stiffness: 140, damping: 22 });
  const shx = useSpring(hx, { stiffness: 140, damping: 22 });
  const shy = useSpring(hy, { stiffness: 140, damping: 22 });

  const headMask = useMotionTemplate`radial-gradient(250px circle at ${shx}px ${shy}px, black 25%, transparent 100%)`;
  const gridMask = useMotionTemplate`radial-gradient(340px circle at ${sgx}px ${sgy}px, black 20%, transparent 100%)`;

  // Mouse parallax: layers shift at different rates for depth
  const px = useMotionValue(0); // -0.5 … 0.5 across section
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 60, damping: 20 });
  const spy = useSpring(py, { stiffness: 60, damping: 20 });
  const bgShiftX = useTransform(spx, (v) => v * 22);
  const bgShiftY = useTransform(spy, (v) => v * 14);
  const contentShiftX = useTransform(spx, (v) => v * -8);
  const contentShiftY = useTransform(spy, (v) => v * -5);

  // Scroll-linked exit
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const exitScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const exitOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);

  function handleMove(e: React.MouseEvent) {
    interacted.current = true;
    const sr = sectionRef.current?.getBoundingClientRect();
    const hr = headRef.current?.getBoundingClientRect();
    if (sr) {
      gx.set(e.clientX - sr.left);
      gy.set(e.clientY - sr.top);
      px.set((e.clientX - sr.left) / sr.width - 0.5);
      py.set((e.clientY - sr.top) / sr.height - 0.5);
    }
    if (hr) {
      hx.set(e.clientX - hr.left);
      hy.set(e.clientY - hr.top);
    }
  }

  // Cinematic intro: one light sweep travels across the headline, then parks
  // center. Touch devices get a gentle endless sweep instead.
  useEffect(() => {
    const hr = headRef.current?.getBoundingClientRect();
    const sr = sectionRef.current?.getBoundingClientRect();
    if (!hr || !sr) return;
    const headOffsetX = hr.left - sr.left;
    const headOffsetY = hr.top - sr.top;

    if (reduced) {
      hx.set(hr.width / 2);
      hy.set(hr.height / 2);
      gx.set(sr.width / 2);
      gy.set(sr.height * 0.4);
      return;
    }

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (fine) {
      hy.set(hr.height * 0.52);
      const sweep = animate(hx, [-260, hr.width + 260], {
        duration: 2.1,
        delay: 1.05,
        ease: [0.45, 0.05, 0.3, 0.95],
        onUpdate: (v) => {
          if (interacted.current) {
            sweep.stop();
            return;
          }
          gx.set(v + headOffsetX);
          gy.set(hr.height * 0.52 + headOffsetY);
        },
      });
      sweep.then(() => {
        if (!interacted.current) {
          animate(hx, hr.width / 2, { duration: 1.1, ease: "easeOut" });
          animate(hy, hr.height * 0.5, { duration: 1.1, ease: "easeOut" });
          animate(gx, sr.width / 2, { duration: 1.1, ease: "easeOut" });
          animate(gy, headOffsetY + hr.height / 2, { duration: 1.1, ease: "easeOut" });
        }
      });
      return () => sweep.stop();
    }

    // Touch: slow endless figure-sweep
    const w = hr.width;
    const h = hr.height;
    const sweepX = animate(hx, [w * 0.15, w * 0.85, w * 0.35, w * 0.7, w * 0.15], {
      duration: 14,
      repeat: Infinity,
      ease: "easeInOut",
      onUpdate: (v) => gx.set(v + headOffsetX),
    });
    const sweepY = animate(hy, [h * 0.3, h * 0.45, h * 0.8, h * 0.2, h * 0.3], {
      duration: 14,
      repeat: Infinity,
      ease: "easeInOut",
      onUpdate: (v) => gy.set(v + headOffsetY),
    });
    return () => {
      sweepX.stop();
      sweepY.stop();
    };
  }, [reduced, gx, gy, hx, hy]);

  function up(delay: number) {
    if (reduced) return {};
    return {
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay, ease: EASE.out },
    };
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={reduced ? undefined : handleMove}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-[calc(6rem+env(safe-area-inset-top,0px))]"
      aria-label="Hero"
    >
      {/* ── Depth layer 1: dim dot grid (parallax, slowest) ── */}
      <motion.div
        style={reduced ? undefined : { x: bgShiftX, y: bgShiftY }}
        className="pointer-events-none absolute -inset-8"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(148,163,184,0.06) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </motion.div>

      {/* ── Depth layer 2: vivid world, revealed only inside the spotlight ── */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="pointer-events-none absolute inset-0"
        style={
          reduced
            ? { opacity: 0.35 }
            : { WebkitMaskImage: gridMask, maskImage: gridMask }
        }
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(129,140,248,0.5) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(99,102,241,0.16), transparent 70%)",
          }}
        />
        {HIDDEN_WORDS.map(({ text, left, top, rotate }) => (
          <span
            key={text}
            className="absolute hidden font-display text-lg font-semibold text-[rgba(167,139,250,0.5)] sm:block"
            style={{ left, top, transform: `rotate(${rotate}deg)` }}
          >
            {text}
          </span>
        ))}
      </motion.div>

      {/* ── Depth layer 3: floating particles ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Particles reduced={reduced} />
      </div>

      {/* Grain */}
      <div className="noise-overlay pointer-events-none absolute inset-0" aria-hidden />

      {/* ── Content (parallax, inverse shift) ── */}
      <motion.div
        style={
          reduced
            ? undefined
            : { scale: exitScale, opacity: exitOpacity, x: contentShiftX, y: contentShiftY }
        }
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        {/* Status badge */}
        <motion.div {...up(0.05)}>
          <span className="mb-10 inline-flex items-center gap-2 rounded-full border border-[rgba(74,222,128,0.22)] bg-[rgba(74,222,128,0.06)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(74,222,128,0.9)]">
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[rgba(74,222,128,0.6)] motion-reduce:animate-none" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[rgba(74,222,128,0.9)]" />
            </span>
            Now accepting applications
          </span>
        </motion.div>

        {/* ── Spotlight headline ── */}
        <div ref={headRef} className="relative">
          <Headline vivid={false} animated reduced={reduced} />
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="pointer-events-none absolute inset-0"
            style={reduced ? undefined : { WebkitMaskImage: headMask, maskImage: headMask }}
          >
            <Headline vivid animated={false} reduced={reduced} />
          </motion.div>
        </div>

        {/* Hint — desktop only */}
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.4 }}
          className="mt-5 hidden text-[11px] font-medium uppercase tracking-[0.2em] text-[rgba(148,163,184,0.3)] md:block"
        >
          Move your cursor to light it up
        </motion.p>

        {/* Subtext */}
        <motion.p
          {...up(0.85)}
          className="mx-auto mt-7 max-w-[30rem] text-pretty text-base leading-relaxed text-muted sm:text-lg"
        >
          BotWeb is a student volunteer organization. We design, build, and
          launch professional websites with AI chatbots for nonprofits and
          community organizations —{" "}
          <span className="font-semibold text-[rgba(248,250,252,0.75)]">
            completely free.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div {...up(1.0)} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <MagneticButton
            as="a"
            href="#contact"
            variant="gradient"
            strength={0.3}
            className="min-h-[52px] px-9 py-3.5 text-sm sm:min-h-0"
          >
            Apply for a free site
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#why"
            strength={0.2}
            className="min-h-[52px] border border-[rgba(148,163,184,0.14)] bg-[rgba(7,7,15,0.5)] px-7 py-3.5 text-sm text-foreground backdrop-blur-sm hover:border-[rgba(148,163,184,0.28)] sm:min-h-0"
          >
            See what we build
          </MagneticButton>
        </motion.div>

        {/* Social proof */}
        <motion.div
          {...up(1.15)}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {[
            { color: "rgba(74,222,128,0.8)", label: "8+ orgs served" },
            { color: "rgba(129,140,248,0.8)", label: "No fees, ever" },
            { color: "rgba(167,139,250,0.8)", label: "Live in 6–8 weeks" },
          ].map(({ color, label }) => (
            <span
              key={label}
              className="flex items-center gap-2 text-[11px] text-[rgba(148,163,184,0.5)]"
            >
              <span
                className="h-1 w-1 shrink-0 rounded-full"
                style={{ background: color }}
                aria-hidden
              />
              {label}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll nudge */}
      <motion.div {...up(1.5)} className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden>
        <motion.div
          animate={reduced ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-[rgba(148,163,184,0.25)]"
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em]">Scroll</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.div>
      </motion.div>

      {/* Fade into content */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030306] to-transparent"
        aria-hidden
      />
    </section>
  );
}
