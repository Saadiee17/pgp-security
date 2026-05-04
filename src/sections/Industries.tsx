import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HardHat, Building2, Home, Factory, CalendarDays, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const industries = [
  {
    name: 'Construction',
    description: 'Material and equipment protection, vandalism prevention, and access control for active job sites.',
    image: '/industry-industrial.jpg',
    icon: HardHat,
  },
  {
    name: 'Commercial',
    description: 'Premises protection, access control, and surveillance for offices, retail, and business parks.',
    image: '/industry-corporate.jpg',
    icon: Building2,
  },
  {
    name: 'Residential',
    description: 'Community patrols, gated entry management, and residential security for neighborhoods.',
    image: '/industry-residential.jpg',
    icon: Home,
  },
  {
    name: 'Industrial',
    description: 'Inventory monitoring, theft prevention, and site surveillance for warehouses and logistics facilities.',
    image: '/industry-industrial.jpg',
    icon: Factory,
  },
  {
    name: 'Events',
    description: 'Crowd control, access management, and emergency response for concerts, conferences, and gatherings.',
    image: '/industry-event.jpg',
    icon: CalendarDays,
  },
]

export default function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return

    const track = trackRef.current
    const cards = track.querySelectorAll('.industry-card')

    gsap.fromTo(
      headerRef.current?.querySelectorAll('.anim-el') || [],
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
      }
    )

    const mm = gsap.matchMedia()

    mm.add('(max-width: 1023px)', () => {
      gsap.set(track, { clearProps: 'transform,x' })
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.6,
          scrollTrigger: { trigger: track, start: 'top 80%' },
        }
      )
    })

    mm.add('(min-width: 1024px)', () => {
      const trackWidth = track.scrollWidth
      const viewportWidth = window.innerWidth
      gsap.to(track, {
        x: -(trackWidth - viewportWidth + 64),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${trackWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })
    })

    return () => {
      // Kill any ScrollTriggers we created — pass true so pin-spacers
      // are unwrapped from the DOM synchronously. Without this, React
      // tries to unmount our <section> from <main> while it's still
      // inside the GSAP-injected pin-spacer wrapper, causing
      // removeChild "node is not a child of this node" crashes on
      // route change.
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.trigger === sectionRef.current ||
          st.trigger === trackRef.current ||
          st.trigger === headerRef.current
        ) {
          st.kill(true)
        }
      })
      mm.revert()
    }
  }, [])

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="w-full py-20 sm:py-24 lg:py-12 bg-midnight overflow-hidden lg:min-h-screen lg:flex lg:flex-col lg:justify-center"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-[1280px] mx-auto px-6 mb-10 lg:mb-8 text-center">
        <span className="anim-el block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
          INDUSTRIES WE SERVE
        </span>
        <h2 className="anim-el text-ice-white text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4 opacity-0">
          Protection Across<br className="hidden sm:block" /> Every Sector
        </h2>
        <p className="anim-el text-slate text-base sm:text-lg max-w-[600px] mx-auto opacity-0">
          Specialized security solutions tailored to the unique challenges of your industry.
        </p>
      </div>

      {/* Mobile/tablet: responsive grid. Desktop: horizontal scroll track */}
      <div
        ref={trackRef}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-4 sm:px-6 max-w-[760px] mx-auto lg:max-w-none lg:mx-0 lg:flex lg:flex-nowrap lg:gap-6 lg:justify-start"
      >
        {industries.map((industry, i) => (
          <div
            key={i}
            className="industry-card group relative w-full h-[280px] sm:h-[340px] lg:flex-shrink-0 lg:w-[360px] lg:h-[min(440px,55vh)] rounded-2xl overflow-hidden cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={industry.image}
              alt={industry.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient Overlay — stronger bottom band so subtext stays readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,12,24,0.98)] from-0% via-[rgba(10,22,40,0.85)] via-40% to-transparent to-75%" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                {industry.name}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed mb-4 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                {industry.description}
              </p>
              <span className="inline-flex items-center gap-2 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Learn More <ArrowRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
