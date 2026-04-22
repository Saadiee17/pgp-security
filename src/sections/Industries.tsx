import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const industries = [
  {
    name: 'Live Events',
    description: 'Crowd control, access management, and emergency response for concerts, conferences, and gatherings.',
    image: '/industry-event.jpg',
  },
  {
    name: 'Auto Dealerships',
    description: 'Inventory protection, surveillance, and loss prevention for vehicle sales lots.',
    image: '/industry-corporate.jpg',
  },
  {
    name: 'Neighborhoods',
    description: 'Community patrols and residential security for safe, peaceful neighborhoods.',
    image: '/industry-residential.jpg',
  },
  {
    name: 'Healthcare',
    description: 'Patient, staff, and visitor safety for hospitals and medical facilities.',
    image: '/industry-healthcare.jpg',
  },
  {
    name: 'Education',
    description: 'On-site guards and emergency planning for schools and universities.',
    image: '/industry-education.jpg',
  },
  {
    name: 'Business',
    description: 'Premises protection, access control, and surveillance for offices and retail.',
    image: '/industry-corporate.jpg',
  },
  {
    name: 'Warehouses',
    description: 'Inventory monitoring, theft prevention, and site surveillance for logistics facilities.',
    image: '/industry-industrial.jpg',
  },
  {
    name: 'Construction',
    description: 'Material and equipment protection, vandalism prevention for active job sites.',
    image: '/industry-industrial.jpg',
  },
  {
    name: 'Gated Communities',
    description: 'Access control, resident safety, and patrol services for private communities.',
    image: '/industry-residential.jpg',
  },
  {
    name: 'Places of Worship',
    description: 'Discreet, respectful protection for congregations and religious events.',
    image: '/industry-education.jpg',
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

    // Header animation
    gsap.fromTo(headerRef.current?.querySelectorAll('.anim-el') || [],
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
      }
    )

    // Check if mobile
    const isMobile = window.innerWidth < 1024
    if (isMobile) {
      // Simple stagger for mobile
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.6,
          scrollTrigger: { trigger: track, start: 'top 80%' },
        }
      )
      return
    }

    // Horizontal scroll for desktop
    const trackWidth = track.scrollWidth
    const viewportWidth = window.innerWidth

    const tween = gsap.to(track, {
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

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current || st.trigger === headerRef.current || st.trigger === track) {
          st.kill()
        }
      })
    }
  }, [])

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="w-full py-24 sm:py-32 bg-midnight overflow-hidden"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-[1280px] mx-auto px-6 mb-12 text-center">
        <span className="anim-el block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
          INDUSTRIES WE SERVE
        </span>
        <h2 className="anim-el text-ice-white text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4 opacity-0">
          Protection Across<br />Every Sector
        </h2>
        <p className="anim-el text-slate text-base sm:text-lg max-w-[600px] mx-auto opacity-0">
          Specialized security solutions tailored to the unique challenges of your industry.
        </p>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={trackRef}
        className="flex gap-6 px-6 lg:flex-nowrap flex-wrap justify-center"
      >
        {industries.map((industry, i) => (
          <div
            key={i}
            className="industry-card group relative flex-shrink-0 w-[320px] sm:w-[360px] h-[420px] sm:h-[480px] rounded-2xl overflow-hidden cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={industry.image}
              alt={industry.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.95)] via-[rgba(10,22,40,0.4)] to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2">{industry.name}</h3>
              <p className="text-slate-light text-sm leading-relaxed mb-4">{industry.description}</p>
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
