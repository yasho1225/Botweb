"use client";

import { Navbar } from "@/components/nav/navbar";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { ProcessSection } from "@/components/sections/process-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { StatementSection } from "@/components/sections/statement-section";
import { WhySection } from "@/components/sections/why-section";
import { CustomCursor } from "@/components/ui/cursor";
import { SiteBackground } from "@/components/ui/site-chrome";

export function BotWebHome() {
  return (
    // bg-background intentionally removed from this wrapper — it blocks the
    // fixed 3D canvas (z:-10) and aurora (z:-20). Body provides the base color.
    <div className="relative min-h-screen text-foreground">
      <CustomCursor />
      <SiteBackground />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <MarqueeStrip />
        {/* Semi-opaque panel below hero: lets aurora bleed through subtly, hides 3D objects */}
        <div className="relative bg-[rgba(3,3,6,0.82)]">
          <WhySection />
          <ProcessSection />
          <StatementSection />
          <FaqSection />
          <ContactSection />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
