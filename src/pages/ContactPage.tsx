import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Clock, MapPin, Mail } from 'lucide-react'
import Contact from '@/sections/Contact'
import CTABanner from '@/sections/CTABanner'

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

      {/* Contact form section (reused component) */}
      <Contact />

      <CTABanner />
    </div>
  )
}
