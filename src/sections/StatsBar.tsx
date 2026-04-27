import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 40, suffix: '+', label: 'YEARS OF SERVICE' },
  { value: 75, suffix: '+', label: 'YEARS COMBINED EXPERIENCE' },
  { value: 24, suffix: '/7', label: 'ALWAYS ON DISPATCH' },
  { value: 100, suffix: '%', label: 'LICENSED & TRAINED GUARDS' },
]

function AnimatedCounter({ target, suffix, triggered }: { target: number; suffix: string; triggered: boolean }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!triggered) return

    const duration = 2500
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutExpo
      const eased = 1 - Math.pow(2, -10 * progress)
      const current = Math.round(eased * target)
      
      if (current !== countRef.current) {
        countRef.current = current
        setCount(current)
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [triggered, target])

  return (
    <span>
      {suffix === '/7' ? `${count}/7` : `${count}${suffix}`}
    </span>
  )
}

export default function StatsBar() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => setTriggered(true),
    })

    // Entrance animation
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      }
    )

    return () => trigger.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full bg-deep-navy border-t border-border-subtle py-16 sm:py-20"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
                style={{
                  backgroundImage:
                    'linear-gradient(180deg, rgb(var(--c-silver-light)) 0%, rgb(var(--c-silver)) 35%, rgb(var(--c-gold-light)) 70%, rgb(var(--c-gold)) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} triggered={triggered} />
              </div>
              <div
                className="w-10 h-0.5 mx-auto mt-4 mb-3"
                style={{
                  background:
                    'linear-gradient(90deg, rgb(var(--c-silver)) 0%, rgb(var(--c-gold)) 100%)',
                }}
              />
              <div className="text-slate text-xs font-semibold tracking-[0.08em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
