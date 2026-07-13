"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/premium-primitives";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Why", href: "#why", id: "why" },
  { label: "How it works", href: "#process", id: "process" },
  { label: "FAQ", href: "#faq", id: "faq" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  // Hide on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (reduced || menuOpen) {
      setHidden(false);
      return;
    }
    if (latest > prev && latest > 160) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    function onHashChange() {
      setMenuOpen(false);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const sections = nav.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={reduced ? false : { y: -20, opacity: 0 }}
        animate={{
          y: hidden ? "-130%" : 0,
          opacity: 1,
        }}
        transition={
          reduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 380, damping: 34 }
        }
        className="fixed inset-x-0 top-0 z-50 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6"
      >
        {/* Morphing island: wide + transparent at top → compact glass pill on scroll */}
        <motion.div
          animate={reduced ? undefined : { maxWidth: scrolled ? 860 : 1024 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          style={reduced ? { maxWidth: 1024 } : undefined}
          className={cn(
            "relative mx-auto flex items-center justify-between gap-4 overflow-hidden rounded-2xl px-4 transition-[background-color,border-color,box-shadow,padding] duration-300 sm:px-5",
            scrolled
              ? "glass-panel py-2.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(129,140,248,0.12)]"
              : "border border-transparent bg-transparent py-3",
          )}
        >
          {/* Scroll progress bar */}
          <motion.div
            className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-accent via-violet to-accent"
            style={{ scaleX: scrollYProgress }}
            aria-hidden
          />

          <Link href="/" className="group flex items-center gap-2.5">
            <motion.span
              whileHover={reduced ? undefined : { rotate: -8, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-violet shadow-glow transition-shadow duration-300 group-hover:shadow-glow-lg"
            >
              <Sparkles className="h-4 w-4 text-white" />
            </motion.span>
            <span className="font-display text-xl tracking-tight text-foreground">BotWeb</span>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
            {nav.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:text-foreground",
                    isActive ? "text-foreground" : "text-muted",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-lg bg-accent-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      aria-hidden
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <MagneticButton
              as="a"
              href="#contact"
              variant="gradient"
              strength={0.22}
              className="hidden px-4 py-2 text-sm sm:inline-flex"
            >
              Get a free site
            </MagneticButton>
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-lg border border-border bg-card-solid/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:border-border-bright md:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-[rgba(3,3,6,0.96)] backdrop-blur-xl md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-[40vh] w-[80vw] -translate-x-1/2 rounded-full bg-[rgba(99,102,241,0.1)] blur-[100px]"
              aria-hidden
            />

            <nav
              className="relative mt-[calc(6rem+env(safe-area-inset-top))] flex flex-1 flex-col px-8"
              onClick={(e) => e.stopPropagation()}
              aria-label="Mobile"
            >
              <div className="flex flex-col gap-2">
                {nav.map((item, i) => (
                  <div key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "100%", opacity: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.4, ease: EASE.out }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-4 py-3 font-display text-3xl font-bold tracking-tight text-foreground transition-colors hover:text-accent-bright"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="font-mono text-xs font-medium text-[rgba(129,140,248,0.5)]">
                          0{i + 1}
                        </span>
                        {item.label}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.28, duration: 0.35, ease: EASE.out }}
                className="mt-10"
              >
                <Link
                  href="#contact"
                  className="btn-sheen flex min-h-[54px] cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent to-violet text-base font-semibold text-white shadow-glow"
                  onClick={() => setMenuOpen(false)}
                >
                  Get a free site
                </Link>
                <p className="mt-4 text-center text-xs text-[rgba(148,163,184,0.4)]">
                  Free for nonprofits · Built by student volunteers
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
