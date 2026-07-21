"use client";

import { Navbar } from "@/components/nav/navbar";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { StatementSection } from "@/components/sections/statement-section";
import { WhySection } from "@/components/sections/why-section";
import { SiteBackground } from "@/components/ui/site-chrome";

export function BotWebHome() {
  return (
    <div className="relative min-h-screen bg-black text-foreground">
      <SiteBackground />
      <Navbar />

      <HeroSection />

      <div className="relative z-10 flex min-h-0 flex-col bg-black">
        <main className="flex-1">
          <WhySection />
          <ProcessSection />
          <StatementSection />
          <ContactSection />
          <FaqSection />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
