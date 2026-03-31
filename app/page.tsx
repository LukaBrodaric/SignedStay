import { LanguageProvider } from "@/lib/language-context";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { KeyBenefits } from "@/components/landing/KeyBenefits";
import { WhoIsFor } from "@/components/landing/WhoIsFor";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { Contact } from "@/components/landing/Contact";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <Features />
        <ProblemSection />
        <HowItWorks />
        <KeyBenefits />
        <WhoIsFor />
        <Testimonials />
        <Pricing />
        <Contact />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
