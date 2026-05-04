import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { XCircle, FileX, Clock, UserX } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const problems = [
  {
    icon: XCircle,
    title: 'No Accountability',
    description: 'Guards clock in and disappear. No way to verify they were actually on post.',
  },
  {
    icon: FileX,
    title: 'No Reporting',
    description: 'Incidents go undocumented. You find out about problems days later — or never.',
  },
  {
    icon: Clock,
    title: 'Slow Response',
    description: 'When something triggers, the wait is too long. Every minute of delay costs you.',
  },
  {
    icon: UserX,
    title: 'Poor Training',
    description: 'Undertrained guards escalate situations instead of defusing them professionally.',
  },
]

export default function ProblemSection() {
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
      gridRef.current.querySelectorAll('.problem-card'),
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
      id="problem"
      ref={sectionRef}
      className="w-full py-20 lg:py-28 bg-deep-navy relative overflow-hidden"
    >
      {/* Subtle red-tinted top edge to signal "problem" framing */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(220,60,60,0.3), transparent)' }}
      />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="anim-header block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
            THE PROBLEM
          </span>
          <h2 className="anim-header text-ice-white text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4 opacity-0">
            Most Security Companies<br />Show Up — But Don't Deliver
          </h2>
          <p className="anim-header text-slate text-base sm:text-lg max-w-[560px] mx-auto opacity-0">
            Hiring the wrong security firm doesn't just waste money — it leaves your people and property exposed.
          </p>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => (
            <div
              key={i}
              className="problem-card bg-midnight border border-border-subtle rounded-2xl p-6 opacity-0 hover:border-red-500/20 transition-colors duration-300"
            >
              <p.icon
                size={36}
                className="mb-4 flex-shrink-0"
                style={{ color: 'rgba(220,60,60,0.75)' }}
              />
              <h3 className="text-ice-white text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-slate text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
