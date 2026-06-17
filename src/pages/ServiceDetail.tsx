import { useEffect, useRef } from 'react'
import { Link, useParams, Navigate } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowLeft, Check, Phone } from 'lucide-react'
import { services, getServiceBySlug } from '@/data/services'
import { useAssessment } from '@/components/AssessmentModal'
import CTABanner from '@/sections/CTABanner'

gsap.registerPlugin(ScrollTrigger)

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)
  const { open: openAssessment } = useAssessment()

  const heroRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!service || !heroRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current!.querySelectorAll('.hero-anim'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out', delay: 0.1 }
      )

      if (bodyRef.current) {
        bodyRef.current.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%' },
            }
          )
        })
      }
    })

    return () => ctx.revert()
  }, [service])

  // Unknown slug → bounce back to the services overview.
  if (!service) return <Navigate to="/services" replace />

  const Icon = service.icon
  const others = services.filter((s) => s.slug !== service.slug)

  return (
    <div className="bg-deep-navy">
      {/* Hero — forced dark island in both themes: the service photo is vibrant,
          so a light-mode scrim left the text unreadable. The `dark` class flips
          the scrim to dark navy, the text to white, and the gold brighter (same
          approach as the home Hero). */}
      <section
        ref={heroRef}
        className="dark relative pt-[140px] pb-20 sm:pb-28 overflow-hidden bg-deep-navy"
      >
        {/* Background image + scrim */}
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          {/* Lighter veil in both themes so the photo reads clearly while the heading/body stay legible.
              Client-approved: do NOT darken these stops — legibility on bright photos
              comes from the text drop-shadows below, not from a heavier tint. */}
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/78 via-deep-navy/50 to-deep-navy/18" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/50 via-transparent to-deep-navy/15" />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <Link
            to="/services"
            className="hero-anim flex w-fit items-center gap-2 text-slate hover:text-gold text-sm transition-colors mb-8"
          >
            <ArrowLeft size={15} /> All Services
          </Link>
          <div className="hero-anim flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 border border-gold/25 mb-6">
            <Icon size={24} className="text-gold" />
          </div>
          <h1
            className="hero-anim text-ice-white text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-5 max-w-[760px]"
            style={{ textShadow: '0 1px 3px rgba(5,12,24,0.9), 0 3px 14px rgba(5,12,24,0.65)' }}
          >
            {service.title}
          </h1>
          <p
            className="hero-anim text-slate-light text-lg sm:text-xl max-w-[620px] leading-relaxed"
            style={{ textShadow: '0 1px 3px rgba(5,12,24,0.85), 0 2px 10px rgba(5,12,24,0.55)' }}
          >
            {service.blurb}
          </p>
          <div className="hero-anim flex flex-col sm:flex-row gap-4 mt-9">
            <button
              type="button"
              onClick={() => openAssessment(service.title)}
              className="inline-flex items-center justify-center gap-2 bg-gold-cta text-gold-ink px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-gold-cta-light hover:scale-[1.02] transition-all duration-200"
            >
              Get a Free Assessment <ArrowRight size={16} />
            </button>
            <a
              href="tel:2814484900"
              className="inline-flex items-center justify-center gap-2 border border-ice-white/30 text-ice-white px-8 py-3.5 rounded-lg font-medium text-sm hover:border-gold hover:text-gold transition-all duration-200"
            >
              <Phone size={15} /> Call (281) 448-4900
            </a>
          </div>
        </div>
      </section>

      <div ref={bodyRef}>
        {/* Overview + Included */}
        <section className="w-full py-16 sm:py-24 bg-deep-navy">
          <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="reveal lg:col-span-3">
              <span className="block text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-4">
                Overview
              </span>
              <h2 className="text-ice-white text-2xl sm:text-3xl font-semibold tracking-tight mb-5">
                What you get with {service.title}
              </h2>
              <p className="text-slate text-base sm:text-lg leading-relaxed">
                {service.overview}
              </p>
            </div>

            <div className="reveal lg:col-span-2">
              <div className="bg-midnight border border-border-subtle rounded-2xl p-7 sm:p-8">
                <p className="text-xs font-semibold tracking-[0.1em] uppercase text-gold mb-5">
                  What's Included
                </p>
                <ul className="flex flex-col gap-4">
                  {service.included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center">
                        <Check size={12} className="text-gold" />
                      </span>
                      <span className="text-slate-light text-sm sm:text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature highlights */}
        <section className="w-full py-16 sm:py-20 bg-midnight relative overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,94,0.4), transparent)' }}
          />
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="reveal mb-12 text-center">
              <span className="block text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-4">
                Why It Works
              </span>
              <h2 className="text-ice-white text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
                Built for results
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((f) => (
                <div
                  key={f.title}
                  className="reveal bg-deep-navy border border-border-subtle rounded-2xl p-7 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="text-ice-white text-lg font-semibold mb-3">{f.title}</h3>
                  <p className="text-slate text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="w-full py-16 sm:py-20 bg-deep-navy">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="reveal flex items-end justify-between mb-8 gap-4">
              <h2 className="text-ice-white text-2xl sm:text-3xl font-semibold tracking-tight">
                Explore other services
              </h2>
              <Link
                to="/services"
                className="hidden sm:inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all duration-200 whitespace-nowrap"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {others.map((s) => {
                const OIcon = s.icon
                return (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="reveal group bg-midnight border border-border-subtle rounded-2xl p-6 hover:border-gold/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-all duration-300 flex flex-col"
                  >
                    <OIcon size={30} className="text-gold mb-4 flex-shrink-0" />
                    <h3 className="text-ice-white text-base font-semibold mb-2">{s.title}</h3>
                    <p className="text-slate text-sm leading-relaxed flex-1">{s.blurb}</p>
                    <span className="inline-flex items-center gap-1.5 text-gold text-xs font-medium mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Learn More <ArrowRight size={12} />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </div>

      <CTABanner />
    </div>
  )
}
