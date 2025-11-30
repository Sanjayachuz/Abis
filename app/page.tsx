import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { SafetySection } from "@/components/safety-section"
import { HowItWorks } from "@/components/how-it-works"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <SafetySection />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </main>
  )
}
