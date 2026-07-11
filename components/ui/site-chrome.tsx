type SectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
};

/**
 * Fixed backdrop behind everything: base radial mesh, two slow-drifting
 * aurora blobs, a masked dot lattice, and film grain to kill gradient
 * banding. Pure CSS — zero JS cost, GPU-composited.
 */
export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 site-bg" aria-hidden>
      {/* Primary aurora — top-center, indigo. Uses arbitrary rgba so the opacity mod actually works */}
      <div className="absolute left-1/2 top-[-18%] h-[65vh] w-[80vw] -translate-x-1/2 animate-aurora-drift rounded-full bg-[rgba(99,102,241,0.22)] blur-[120px] motion-reduce:animate-none" />
      {/* Secondary — right side, violet */}
      <div className="absolute right-[-8%] top-[22%] h-[52vh] w-[44vw] animate-aurora-drift-slow rounded-full bg-[rgba(167,139,250,0.18)] blur-[100px] motion-reduce:animate-none" />
      {/* Tertiary — bottom left, cyan */}
      <div className="absolute bottom-[10%] left-[-10%] h-[40vh] w-[40vw] animate-aurora-drift rounded-full bg-[rgba(34,211,238,0.08)] blur-[120px] motion-reduce:animate-none" />
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(129,140,248,0.5)] to-transparent" />
    </div>
  );
}

export function SectionHeader({ label, title, description, align = "center" }: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {label && (
        <span className="section-label">
          <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
          {label}
        </span>
      )}
      <h2 className="font-display text-balance text-3xl tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
