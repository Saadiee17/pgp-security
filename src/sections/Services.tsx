import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Eye, Car, Bell, Calendar, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Shield,
    title: 'Armed Guards',
    description: 'Licensed armed security officers for high-risk environments. Enhanced protection for corporate offices, events, and industrial sites.',
    image: '/images/20260512_111342.jpg',
  },
  {
    icon: Eye,
    title: 'Unarmed Guards',
    description: 'Professional, approachable security for environments where visible presence matters. Ideal for offices, schools, and healthcare.',
    image: '/images/20260512_113740.jpg',
  },
  {
    icon: Car,
    title: 'Patrol Services',
    description: 'Mobile patrol in marked vehicles for large areas, neighborhoods, and commercial spaces. Random and scheduled routes.',
    image: '/images/20260512_120829.jpg',
  },
  {
    icon: Bell,
    title: 'Alarm Response',
    description: '24/7 alarm monitoring with rapid dispatch. When your system triggers, our team responds immediately.',
    image: '/images/20260512_110019.jpg',
  },
  {
    icon: Calendar,
    title: 'Temporary Security',
    description: 'Flexible security for events, short-term projects, and emergencies. Deployed swiftly from one day to several months.',
    image: '/images/20260512_171453.jpg',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    // Header animation
    const eyebrow = headerRef.current.querySelector('.eyebrow')
    const headline = headerRef.current.querySelector('.headline')
    const subtext = headerRef.current.querySelector('.subtext')

    gsap.fromTo(eyebrow,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.5,
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
      }
    )
    gsap.fromTo(headline,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, delay: 0.1,
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
      }
    )
    gsap.fromTo(subtext,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.5, delay: 0.3,
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
      }
    )

    // Cards animation
    const cards = gridRef.current.querySelectorAll('.service-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current || st.trigger === headerRef.current || st.trigger === gridRef.current) {
          st.kill()
        }
      })
    }
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full py-24 sm:py-32 bg-deep-navy relative overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight/30 to-transparent pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16">
          <span className="eyebrow block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
            WHAT WE OFFER
          </span>
          <h2 className="headline text-ice-white text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4 opacity-0">
            Comprehensive Security<br />Solutions
          </h2>
          <p className="subtext text-slate text-base sm:text-lg max-w-[560px] opacity-0">
            From armed protection to mobile patrols, we deliver tailored security services for every need.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card group bg-midnight border border-border-subtle rounded-2xl overflow-hidden hover:border-gold/30 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 opacity-0"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-midnight/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <service.icon size={32} className="text-gold mb-4" />
                <h3 className="text-ice-white text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-slate text-sm leading-relaxed mb-4">{service.description}</p>
                <button className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all duration-200">
                  Learn More <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="border border-ice-white/30 text-ice-white px-8 py-3.5 rounded-lg font-medium text-sm hover:border-gold hover:text-gold transition-all duration-200">
            View All Services
          </button>
        </div>
      </div>
    </section>
  )
}
