import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router'
import { Shield, Car, Bell, ShieldCheck, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const snapshots = [
  {
    icon: ShieldCheck,
    title: 'Armed Guards',
    blurb: 'Licensed armed officers for high-risk environments and maximum deterrence.',
    image: '/service-armed-guards.webp',
  },
  {
    icon: Car,
    title: 'Patrol Services',
    blurb: 'Mobile patrol in marked vehicles covering large areas on scheduled routes.',
    image: '/service-patrol.webp',
  },
  {
    icon: Bell,
    title: 'Alarm Response',
    blurb: '24/7 monitoring with rapid dispatch the moment your alarm triggers.',
    image: '/service-alarm-response.webp',
  },
  {
    icon: Shield,
    title: 'Site Security',
    blurb: 'Dedicated on-site presence keeping your property protected around the clock.',
    image: '/service-unarmed-guards.webp',
  },
]

export default function ServicesSnapshot() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.anim-header'),
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    )

    gsap.fromTo(
      gridRef.current.querySelectorAll('.snapshot-card'),
      { opacity: 0, y: 50, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 78%' },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current || st.trigger === gridRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section
      id="services-snapshot"
      ref={sectionRef}
      className="section-texture w-full py-20 lg:py-28 bg-midnight relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-navy/20 to-transparent pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="anim-header block text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
            WHAT WE OFFER
          </span>
          <h2 className="anim-header text-ice-white text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-tight leading-[1.08] mb-4 opacity-0">
            Core Security Services
          </h2>
          <p className="anim-header text-slate text-base sm:text-lg max-w-[540px] mx-auto opacity-0">
            From boots on the ground to rapid alarm response, all built for Houston's businesses.
          </p>
        </div>

        {/* 4-card grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {snapshots.map((s, i) => (
            <Link
              key={i}
              to="/services"
              className="snapshot-card group bg-deep-navy border border-border-subtle rounded-2xl overflow-hidden hover:border-gold/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-all duration-300 opacity-0 flex flex-col"
            >
              {/* Photo header */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/30 to-transparent" />
              </div>
              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <s.icon size={32} className="text-gold mb-4 flex-shrink-0" />
                <h3 className="text-ice-white text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-slate text-sm leading-relaxed flex-1">{s.blurb}</p>
                <span className="inline-flex items-center gap-1.5 text-gold text-xs font-medium mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn More <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-block border border-ice-white/30 text-ice-white px-8 py-3.5 rounded-lg font-medium text-sm hover:border-gold hover:text-gold transition-all duration-200"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
