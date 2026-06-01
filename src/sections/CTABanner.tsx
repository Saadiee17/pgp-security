import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, CheckCircle } from 'lucide-react'
import { useAssessment } from '@/components/AssessmentModal'

gsap.registerPlugin(ScrollTrigger)

const trustPoints = [
  'Free Consultation',
  'Custom Plans',
  'Immediate Deployment',
]

export default function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const { open: openAssessment } = useAssessment()

  useEffect(() => {
    if (!sectionRef.current) return

    // Glow pulse
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        scale: 1.1,
        opacity: 0.1,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }

    // Content entrance
    const els = sectionRef.current.querySelectorAll('.anim-el')
    gsap.fromTo(els,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 sm:py-28 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgb(var(--c-deep-navy)) 0%, rgb(var(--c-midnight)) 50%, rgb(var(--c-deep-navy)) 100%)',
      }}
    >
      {/* Animated glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(200, 164, 94, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
        <h2 className="anim-el text-ice-white text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4 opacity-0">
          Don't Wait Until<br />Something Goes Wrong
        </h2>
        <p className="anim-el text-slate text-base sm:text-lg max-w-[600px] mx-auto mb-8 opacity-0">
          Get a free security assessment from PGP today. Licensed guards, rapid deployment, and a custom plan built around your property.
        </p>

        {/* CTAs */}
        <div className="anim-el flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 opacity-0">
          <button
            type="button"
            onClick={() => openAssessment()}
            className="bg-gold text-gold-ink px-10 py-4 rounded-lg font-semibold text-base hover:bg-gold-light hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(200,164,94,0.3)] transition-all duration-200"
          >
            Get Your Free Assessment
          </button>
          <a
            href="tel:2814484900"
            className="border border-ice-white/30 text-ice-white px-10 py-4 rounded-lg font-medium text-base hover:border-gold hover:text-gold transition-all duration-200 flex items-center gap-2"
          >
            <Phone size={16} />
            Call (281) 448-4900
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="anim-el flex flex-wrap items-center justify-center gap-6 opacity-0">
          {trustPoints.map((point, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle size={16} className="text-gold" />
              <span className="text-slate text-sm">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
