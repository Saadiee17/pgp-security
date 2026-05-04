import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  HardHat,
  Building2,
  Home,
  Factory,
  CalendarDays,
  ArrowRight,
  MessageSquare,
} from 'lucide-react'
import Services from '@/sections/Services'
import CTABanner from '@/sections/CTABanner'

gsap.registerPlugin(ScrollTrigger)

const industries = [
  { name: 'Construction', icon: HardHat },
  { name: 'Commercial', icon: Building2 },
  { name: 'Residential', icon: Home },
  { name: 'Industrial', icon: Factory },
  { name: 'Events', icon: CalendarDays },
]

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const calloutRef = useRef<HTMLDivElement>(null)
  const industriesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    const heroEls = heroRef.current.querySelectorAll('.hero-anim')
    gsap.fromTo(
      heroEls,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out', delay: 0.1 }
    )

    if (calloutRef.current) {
      gsap.fromTo(
        calloutRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: calloutRef.current, start: 'top 80%' },
        }
      )
    }

    if (industriesRef.current) {
      const items = industriesRef.current.querySelectorAll('.industry-item')
      gsap.fromTo(
        industriesRef.current.querySelectorAll('.ind-header'),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: industriesRef.current, start: 'top 82%' },
        }
      )
      gsap.fromTo(
        items,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: industriesRef.current, start: 'top 75%' },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (
          st.trigger === calloutRef.current ||
          st.trigger === industriesRef.current
        ) {
          st.kill()
        }
      })
    }
  }, [])

  return (
    <div className="bg-deep-navy">
      {/* Hero */}
      <section
        ref={heroRef}
        className="pt-[140px] pb-20 sm:pb-28 bg-midnight relative overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,94,0.4), transparent)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/60 to-transparent pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <span className="hero-anim block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
            OUR SERVICES
          </span>
          <h1 className="hero-anim text-ice-white text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6 opacity-0">
            Security Services<br />Built Around You
          </h1>
          <p className="hero-anim text-slate text-base sm:text-lg max-w-[580px] opacity-0">
            Whether you need a single guard or a full-site security program, PGP deploys licensed professionals matched to your environment, threat level, and budget.
          </p>
        </div>
      </section>

      {/* Existing Services section */}
      <Services />

      {/* Custom Solutions callout */}
      <section className="w-full py-16 sm:py-20 bg-midnight relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <div
            ref={calloutRef}
            className="opacity-0 bg-deep-navy border border-border-subtle rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 hover:border-gold/30 transition-colors duration-300"
          >
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <MessageSquare size={28} className="text-gold" />
            </div>
            <div className="flex-1">
              <h3 className="text-ice-white text-xl sm:text-2xl font-semibold mb-2">
                Not Sure What You Need?
              </h3>
              <p className="text-slate text-sm sm:text-base leading-relaxed max-w-[540px]">
                Every property is different. Our security consultants will assess your site, identify vulnerabilities, and build a custom solution — at no charge.
              </p>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-gold text-gold-ink px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-gold-light hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(200,164,94,0.25)] transition-all duration-200 whitespace-nowrap"
            >
              Get a Free Assessment <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Industries we serve cross-link */}
      <section
        ref={industriesRef}
        className="w-full py-16 sm:py-20 bg-deep-navy relative overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,94,0.2), transparent)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-10">
            <span className="ind-header block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-3 opacity-0">
              INDUSTRIES WE SERVE
            </span>
            <h2 className="ind-header text-ice-white text-2xl sm:text-3xl font-semibold tracking-tight opacity-0">
              Every Sector, Every Site
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {industries.map(({ name, icon: Icon }) => (
              <Link
                key={name}
                to="/industries"
                className="industry-item opacity-0 group bg-midnight border border-border-subtle rounded-xl p-5 flex flex-col items-center gap-3 hover:border-gold/30 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                <Icon size={28} className="text-gold group-hover:scale-110 transition-transform duration-200" />
                <span className="text-ice-white text-sm font-medium text-center">{name}</span>
              </Link>
            ))}
          </div>
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all duration-200"
          >
            View all industries <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <CTABanner />
    </div>
  )
}
