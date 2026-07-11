"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/premium-primitives";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Why", href: "#why", id: "why" },
  { label: "What we build", href: "#what", id: "what" },
  { label: "How it works", href: "#process", id: "process" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    function onHashChange() {
      setMenuOpen(false);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
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
        initial={reduced ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE.out }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6"
      >
        <div
          className={cn(
            "relative mx-auto flex max-w-5xl items-center justify-between gap-4 overflow-hidden rounded-xl px-4 py-3 transition-all duration-300 sm:px-5",
            scrolled
              ? "glass-panel shadow-card"
              : "bg-transparent",
          )}
        >
          {/* Scroll progress bar */}
          <motion.div
            className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-accent via-violet to-accent"
            style={{ scaleX: scrollYProgress }}
            aria-hidden
          />

          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-violet shadow-glow transition-shadow duration-300 group-hover:shadow-glow-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
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
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-accent to-violet"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      aria-hidden
                    />
                  )}
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
              Request a site
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
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[rgba(3,3,6,0.9)] backdrop-blur-md md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.28, ease: EASE.out }}
              className="mx-4 mt-[calc(4.5rem+env(safe-area-inset-top))] overflow-hidden rounded-xl border border-glass-border glass-panel p-3 shadow-card"
              onClick={(e) => e.stopPropagation()}
              aria-label="Mobile"
            >
              <div className="flex flex-col gap-1">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.22, ease: EASE.out }}
                  >
                    <Link
                      href={item.href}
                      className="flex min-h-[48px] cursor-pointer items-center rounded-lg px-4 text-base font-medium text-foreground transition-colors hover:bg-accent-soft hover:text-accent-bright"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.25, ease: EASE.out }}
                  className="mt-2 border-t border-[rgba(148,163,184,0.05)] pt-2"
                >
                  <Link
                    href="#contact"
                    className="flex min-h-[48px] cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-accent to-violet text-base font-semibold text-white shadow-glow"
                    onClick={() => setMenuOpen(false)}
                  >
                    Request a site
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
