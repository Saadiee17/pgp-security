import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import ServicesPage from './pages/ServicesPage'
import ServiceDetail from './pages/ServiceDetail'
import IndustriesPage from './pages/IndustriesPage'
import Locations from './pages/Locations'
import BranchPage from './pages/BranchPage'
import ContactPage from './pages/ContactPage'
import Careers from './pages/Careers'

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
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="industries" element={<IndustriesPage />} />
        <Route path="locations" element={<Locations />} />
        <Route path="locations/:city" element={<BranchPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="careers" element={<Careers />} />
      </Route>
    </Routes>
  )
}

export default App
