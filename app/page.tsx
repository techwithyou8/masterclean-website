import Header from "../components/header"
import HeroSection from "../components/hero-section"
import StatsSection from "../components/stats-section"
import ValuesSection from "../components/values-section"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <StatsSection />
      <ValuesSection />
    </main>
  )
}
