import Hero from '@/sections/Hero'
import StatsBar from '@/sections/StatsBar'
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
