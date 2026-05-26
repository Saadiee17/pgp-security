import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, ShieldAlert } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function EmergencyCoverage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.anim-el'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      }
    )

    if (pulseRef.current) {
      gsap.to(pulseRef.current, {
        scale: 1.6,
        opacity: 0,
        duration: 1.8,
        ease: 'power2.out',
        repeat: -1,
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full py-10 sm:py-12 relative overflow-hidden bg-midnight border-y border-red-600/20"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(220,38,38,0.06) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.45), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.45), transparent)' }}
      />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: icon + text */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative flex-shrink-0">
              <div
                ref={pulseRef}
                className="absolute inset-0 rounded-full bg-red-600/30"
              />
              <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center">
                <ShieldAlert size={22} className="text-red-400" />
              </div>
            </div>
            <div>
              <h3 className="anim-el text-ice-white text-lg sm:text-xl font-semibold tracking-tight opacity-0">
                Emergency Coverage at a Moment's Notice
              </h3>
              <p className="anim-el text-slate text-sm sm:text-base mt-1 opacity-0">
                Urgent security need? We deploy licensed guards fast — day or night, weekends included.
              </p>
            </div>
          </div>

          {/* Right: CTA + phone */}
          <div className="anim-el opacity-0 flex flex-col items-center gap-2.5 flex-shrink-0">
            <Link
              to="/contact"
              className="bg-red-600 text-white px-8 py-3.5 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-red-500 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all duration-200"
            >
              Emergency Coverage
            </Link>
            <a
              href="tel:2814484900"
              className="flex items-center gap-1.5 text-slate hover:text-ice-white transition-colors duration-200 text-sm"
            >
              <Phone size={14} className="text-red-400" />
              <span>or call <span className="font-semibold text-ice-white">(281) 448-4900</span></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
