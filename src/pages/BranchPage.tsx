import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, MapPin, Clock, Phone, ShieldCheck } from 'lucide-react'
import CTABanner from '@/sections/CTABanner'
import { getCity } from '@/data/cities'

gsap.registerPlugin(ScrollTrigger)

export default function BranchPage() {
  const { city: slug } = useParams<{ city: string }>()
  const city = slug ? getCity(slug) : undefined

  const heroRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!city) return
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.hero-el'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out', delay: 0.1 }
        )
      }
      if (detailsRef.current) {
        gsap.fromTo(
          detailsRef.current.querySelectorAll('.anim-el'),
          { opacity: 0, y: 35 },
          {
            opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: 'power3.out',
            scrollTrigger: { trigger: detailsRef.current, start: 'top 80%' },
          }
        )
      }
    })
    return () => ctx.revert()
  }, [city])

  if (!city) {
    return (
      <section className="pt-[140px] pb-32 min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-deep-navy">
        <div className="text-gold text-xs font-mono tracking-[0.2em] uppercase mb-4">
          404 — Location Not Found
        </div>
        <h1 className="text-ice-white text-3xl sm:text-4xl font-semibold mb-4">
          We don&apos;t have a branch page for that city
        </h1>
        <p className="text-slate text-base max-w-xl mb-8">
          The location you&apos;re looking for isn&apos;t in our directory yet — but we may still cover it.
          Browse all locations or get in touch with PGP directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/locations"
            className="inline-flex items-center gap-2 border border-ice-white/30 text-ice-white px-6 py-3 rounded-lg font-medium text-sm hover:border-gold hover:text-gold transition-all duration-200"
          >
            <ArrowLeft size={14} />
            View All Locations
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold text-gold-ink px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gold-light transition-all duration-200"
          >
            Contact Us
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    )
  }

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(city.address)}&output=embed`

  return (
    <div className="bg-deep-navy">
      {/* Hero */}
      <section
        ref={heroRef}
        className="w-full pt-[140px] pb-16 sm:pb-20 bg-midnight relative overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,94,0.4), transparent)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <Link
            to="/locations"
            className="hero-el opacity-0 inline-flex items-center gap-2 text-slate hover:text-gold text-sm font-medium mb-8 transition-colors duration-200"
          >
            <ArrowLeft size={14} />
            All Locations
          </Link>
          <span className="hero-el block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
            {city.region}
          </span>
          <h1 className="hero-el text-ice-white text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6 opacity-0">
            Security Services<br />in {city.name}
          </h1>
          <p className="hero-el text-slate text-base sm:text-lg max-w-[640px] leading-relaxed opacity-0">
            {city.blurb}
          </p>
        </div>
      </section>

      {/* Map + details */}
      <section
        ref={detailsRef}
        className="w-full py-16 sm:py-20"
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Map */}
            <div className="anim-el opacity-0 lg:col-span-3 rounded-2xl overflow-hidden border border-border-subtle bg-midnight">
              <iframe
                title={`Map of ${city.name}, TX`}
                src={mapSrc}
                width="100%"
                height="420"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: 'block', filter: 'grayscale(0.2) contrast(1.05)' }}
              />
            </div>

            {/* Info column */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="anim-el opacity-0 bg-midnight border border-border-subtle rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-2">
                  <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold tracking-[0.1em] uppercase text-gold">
                    Address
                  </span>
                </div>
                <p className="text-ice-white text-sm leading-relaxed">{city.address}</p>
              </div>

              <div className="anim-el opacity-0 bg-midnight border border-border-subtle rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-2">
                  <Clock size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold tracking-[0.1em] uppercase text-gold">
                    Response Time
                  </span>
                </div>
                <p className="text-ice-white text-sm">{city.responseTime}</p>
                <p className="text-slate text-xs mt-1">Typical dispatch from Houston HQ</p>
              </div>

              <a
                href="tel:2814484900"
                className="anim-el opacity-0 group flex items-center gap-3 bg-gold text-gold-ink rounded-2xl p-6 font-semibold hover:bg-gold-light transition-colors duration-200"
              >
                <Phone size={18} className="flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm">Call PGP Dispatch</div>
                  <div className="text-base font-bold">(281) 448-4900</div>
                </div>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
            </div>
          </div>

          {/* Service area */}
          {city.serviceArea.length > 0 && (
            <div className="mt-14 anim-el opacity-0">
              <h2 className="text-ice-white text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
                Neighborhoods we cover
              </h2>
              <div className="flex flex-wrap gap-2">
                {city.serviceArea.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-2 bg-midnight border border-border-subtle rounded-full px-4 py-2 text-slate text-sm"
                  >
                    <MapPin size={12} className="text-gold" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          <div className="mt-14 anim-el opacity-0">
            <h2 className="text-ice-white text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
              Services available in {city.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {city.services.map((service) => (
                <Link
                  key={service}
                  to="/services"
                  className="group flex items-center gap-3 bg-midnight border border-border-subtle rounded-xl p-5 hover:border-gold/40 hover:bg-deep-navy transition-all duration-200"
                >
                  <ShieldCheck size={20} className="text-gold flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-ice-white text-sm font-medium flex-1">{service}</span>
                  <ArrowRight size={14} className="text-slate group-hover:text-gold group-hover:translate-x-0.5 transition-all duration-200" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  )
}
