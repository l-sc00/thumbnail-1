import { Navbar } from "@/components/main/navbar";
import { PremiumHero } from "@/components/main/hero";
import { FeaturesSection } from "@/components/main/features-section";
import { PricingSection } from "@/components/main/pricing-section";
import { Footer } from "@/components/main/footer";
import { AnimatedBackground } from "@/components/main/animated-background";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <PremiumHero />
        <FeaturesSection />
        <PricingSection />
        <Footer />
      </div>
    </main>
  );
}