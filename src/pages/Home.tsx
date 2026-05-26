import Hero from '@/sections/Hero'
import StatsBar from '@/sections/StatsBar'
import EmergencyCoverage from '@/sections/EmergencyCoverage'
import ProblemSection from '@/sections/ProblemSection'
import SolutionSection from '@/sections/SolutionSection'
import ServicesSnapshot from '@/sections/ServicesSnapshot'
import Industries from '@/sections/Industries'
import LocationsSection from '@/sections/LocationsSection'
import Testimonials from '@/sections/Testimonials'
import CTABanner from '@/sections/CTABanner'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <EmergencyCoverage />
      <ProblemSection />
      <SolutionSection />
      <ServicesSnapshot />
      <Industries />
      <LocationsSection />
      <Testimonials />
      <CTABanner />
    </>
  )
}
