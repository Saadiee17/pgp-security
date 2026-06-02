import { useEffect, useRef, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Layout from './components/Layout'

// Route-level code splitting: each page ships as its own chunk and is fetched
// only when the route is visited, instead of all pages living in the initial
// bundle. The Home page stays eagerly imported so the landing route paints
// without an extra round-trip.
import Home from './pages/Home'
const About = lazy(() => import('./pages/About'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'))
const Locations = lazy(() => import('./pages/Locations'))
const BranchPage = lazy(() => import('./pages/BranchPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const Careers = lazy(() => import('./pages/Careers'))

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    let lenis: any = null

    const initLenis = async () => {
      const Lenis = (await import('lenis')).default
      lenis = new Lenis({
        // lerp drives the snappy, responsive feel: each frame the scroll
        // position moves 10% of the way to the target, so the page tracks
        // the wheel closely instead of the long ~1.2s glide it had before.
        lerp: 0.1,
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
    <Suspense fallback={null}>
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
    </Suspense>
  )
}

export default App
