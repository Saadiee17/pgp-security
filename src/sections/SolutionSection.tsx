import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, FileCheck, Award, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const solutions = [
  {
    icon: MapPin,
    title: 'Real-Time Tracking',
    description: 'Know where every guard is, every minute. Live GPS tracking and digital check-ins on every shift.',
  },
  {
    icon: FileCheck,
    title: 'Incident Reports',
    description: 'Every event documented and delivered to you. Full transparency with timestamped activity logs.',
  },
  {
    icon: Award,
    title: 'Trained Guards',
    description: 'Licensed, vetted, and continuously trained officers who de-escalate first and protect always.',
  },
  {
    icon: Zap,
    title: 'Fast Deployment',
    description: 'Emergency coverage dispatched the same day. We scale up or down on short notice, with no delays.',
  },
]

export default function SolutionSection() {
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
      gridRef.current.querySelectorAll('.solution-card'),
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
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
      id="solution"
      ref={sectionRef}
      className="w-full py-20 lg:py-28 bg-midnight relative overflow-hidden"
    >
      {/* Gold accent top edge to signal optimism / contrast with Problem */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,94,0.5), transparent)' }}
      />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="anim-header block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
            THE PGP DIFFERENCE
          </span>
          <h2 className="anim-header text-ice-white text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4 opacity-0">
            Security You Can<br />Actually Measure
          </h2>
          <p className="anim-header text-slate text-base sm:text-lg max-w-[560px] mx-auto opacity-0">
            PGP delivers accountability at every level, from real-time tracking to fully documented incidents.
          </p>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((s, i) => (
            <div
              key={i}
              className="solution-card bg-deep-navy border border-border-subtle rounded-2xl p-6 opacity-0 hover:border-gold/40 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
              <s.icon size={36} className="text-gold mb-4 flex-shrink-0" />
              <h3 className="text-ice-white text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-slate text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
