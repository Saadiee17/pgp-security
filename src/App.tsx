import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './sections/Header'
import Hero from './sections/Hero'
import StatsBar from './sections/StatsBar'
import Services from './sections/Services'
import WhyChooseUs from './sections/WhyChooseUs'
import Industries from './sections/Industries'
import Testimonials from './sections/Testimonials'
import CTABanner from './sections/CTABanner'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    let lenis: any = null
    
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      
      lenisRef.current = lenis
      
      lenis.on('scroll', ScrollTrigger.update)
      
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)
    }
    
    initLenis()
    
    return () => {
      if (lenis) {
        lenis.destroy()
      }
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-deep-navy">
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <WhyChooseUs />
        <Industries />
        <Testimonials />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
