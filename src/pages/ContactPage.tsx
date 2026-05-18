import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Clock, MapPin, Mail, UserRound } from 'lucide-react'
import Contact from '@/sections/Contact'
import CTABanner from '@/sections/CTABanner'
import { branches } from '@/data/cities'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    gsap.fromTo(
      heroRef.current.querySelectorAll('.anim-el'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: heroRef.current, start: 'top 85%' } }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === heroRef.current) st.kill()
      })
    }
  }, [])

  return (
    <div className="bg-deep-navy min-h-screen">
      {/* Hero */}
      <section ref={heroRef} className="w-full pt-[140px] pb-20 bg-midnight border-b border-border-subtle relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(200,164,94,1) 39px, rgba(200,164,94,1) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(200,164,94,1) 39px, rgba(200,164,94,1) 40px)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="max-w-[720px]">
            <span className="anim-el opacity-0 inline-block text-gold text-xs font-semibold tracking-[0.12em] uppercase mb-5">
              GET IN TOUCH
            </span>
            <h1 className="anim-el opacity-0 text-ice-white text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6">
              Talk to PGP Security
            </h1>
            <p className="anim-el opacity-0 text-slate text-base sm:text-lg leading-relaxed mb-10">
              Ready to protect your people and property? Our team is available 24/7 to discuss your
              security needs and build a customized plan for your business or facility.
            </p>

            {/* Quick-contact strip */}
            <div className="anim-el opacity-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:2814484900"
                className="flex items-center gap-3 bg-deep-navy border border-border-subtle rounded-xl px-5 py-4 hover:border-gold/40 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-gold" />
                </div>
                <div>
                  <div className="text-ice-white text-sm font-semibold group-hover:text-gold transition-colors">(281) 448-4900</div>
                  <div className="text-slate text-xs">Call us directly</div>
                </div>
              </a>

              <div className="flex items-center gap-3 bg-deep-navy border border-border-subtle rounded-xl px-5 py-4">
                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-gold" />
                </div>
                <div>
                  <div className="text-ice-white text-sm font-semibold">24 / 7 Dispatch</div>
                  <div className="text-slate text-xs">Always available</div>
                </div>
              </div>

              <a
                href="mailto:info@pgpsecurity.com"
                className="flex items-center gap-3 bg-deep-navy border border-border-subtle rounded-xl px-5 py-4 hover:border-gold/40 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-gold" />
                </div>
                <div>
                  <div className="text-ice-white text-sm font-semibold group-hover:text-gold transition-colors">info@pgpsecurity.com</div>
                  <div className="text-slate text-xs">Email us anytime</div>
                </div>
              </a>

              <div className="flex items-center gap-3 bg-deep-navy border border-border-subtle rounded-xl px-5 py-4">
                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-gold" />
                </div>
                <div>
                  <div className="text-ice-white text-sm font-semibold">425 Aldine Bender Rd, Ste E</div>
                  <div className="text-slate text-xs">Houston, Texas 77060</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch directory */}
      <section className="w-full py-20 sm:py-24 bg-deep-navy border-b border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-[720px] mb-12">
            <span className="block text-gold text-xs font-semibold tracking-[0.12em] uppercase mb-4">
              OUR OFFICES
            </span>
            <h2 className="text-ice-white text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4">
              Three branches across Greater Houston
            </h2>
            <p className="text-slate text-base sm:text-lg leading-relaxed">
              Reach the office nearest your location for direct support, or call our 24/7 dispatcher for after-hours response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {branches.map((b) => (
              <div
                key={b.slug}
                className="flex flex-col bg-midnight border border-border-subtle rounded-2xl p-6"
              >
                <span className="text-gold text-[11px] font-semibold tracking-[0.12em] uppercase mb-3">
                  {b.region}
                </span>
                <h3 className="text-ice-white text-xl font-semibold mb-4">{b.name}</h3>

                <div className="flex items-start gap-3 mb-4">
                  <MapPin size={16} className="text-gold flex-shrink-0 mt-1" />
                  <p className="text-slate text-sm leading-relaxed">{b.address}</p>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <UserRound size={16} className="text-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-ice-white text-sm font-semibold leading-tight">
                      {b.operationsManager.name}
                    </p>
                    <p className="text-slate text-xs mt-0.5">{b.operationsManager.title}</p>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-border-subtle/60 space-y-2">
                  <a
                    href={b.phoneHref}
                    className="flex items-center gap-2 text-ice-white text-sm font-semibold hover:text-gold transition-colors"
                  >
                    <Phone size={14} className="text-gold flex-shrink-0" />
                    {b.phone}
                  </a>
                  {b.dispatcherPhone && b.dispatcherHref && (
                    <a
                      href={b.dispatcherHref}
                      className="flex items-center gap-2 text-slate text-xs hover:text-gold transition-colors"
                    >
                      <Phone size={12} className="text-gold/70 flex-shrink-0" />
                      {b.dispatcherPhone} (24/7 dispatcher)
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form section (reused component) */}
      <Contact />

      <CTABanner />
    </div>
  )
}
