import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HardHat, Building2, Home, Factory, CalendarDays } from 'lucide-react'
import CTABanner from '@/sections/CTABanner'

gsap.registerPlugin(ScrollTrigger)

const industries = [
  {
    icon: HardHat,
    name: 'Construction',
    challenge:
      'Active job sites are prime targets after hours. Copper theft, tool vandalism, and unauthorized equipment access can cost hundreds of thousands in losses and delays — yet most contractors rely on fencing alone.',
    solutions: [
      'Armed and unarmed on-site guards during off-hours',
      'Mobile patrol routes covering the full perimeter',
      'Incident reporting with photographic documentation',
      'Access control at site entry points',
    ],
  },
  {
    icon: Building2,
    name: 'Commercial',
    challenge:
      'Office parks, retail centers, and business campuses face shoplifting, trespassing, and after-hours break-ins. A visible security presence reduces risk and reassures employees, tenants, and customers alike.',
    solutions: [
      'Lobby and reception guard posts',
      'Patrol of parking structures and common areas',
      'Alarm response and lock-up verification',
      'CCTV monitoring coordination',
    ],
  },
  {
    icon: Home,
    name: 'Residential',
    challenge:
      'Gated communities and HOAs need consistent, professional security without the cost of a full-time police presence. Residents expect both safety and a welcoming atmosphere at every entry point.',
    solutions: [
      'Gated entry management and visitor verification',
      'Overnight and weekend community patrols',
      'Rapid response to disturbance calls',
      'Detailed shift activity logs for HOA records',
    ],
  },
  {
    icon: Factory,
    name: 'Industrial',
    challenge:
      'Warehouses, logistics hubs, and manufacturing facilities hold significant inventory and operate around the clock. Internal theft, cargo diversion, and unauthorized access are persistent threats in high-turnover environments.',
    solutions: [
      'Gate officers for inbound and outbound truck verification',
      'Perimeter patrols to deter cargo theft',
      'Employee and contractor access credentialing',
      'Inventory area surveillance and seal checks',
    ],
  },
  {
    icon: CalendarDays,
    name: 'Events',
    challenge:
      'Concerts, corporate conferences, and public gatherings concentrate large crowds in unpredictable environments. Organizers need professional crowd management, rapid incident response, and seamless coordination with venue staff.',
    solutions: [
      'Crowd management and queue control',
      'Access credentialing at multiple entry points',
      'Plainclothes officers for VIP protection',
      'On-site emergency response and evacuation support',
    ],
  },
]

export default function IndustriesPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const blocksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    const heroEls = heroRef.current.querySelectorAll('.hero-anim')
    gsap.fromTo(
      heroEls,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out', delay: 0.1 }
    )

    if (!blocksRef.current) return

    const blocks = blocksRef.current.querySelectorAll('.industry-block')
    blocks.forEach((block) => {
      const left = block.querySelector('.block-left')
      const right = block.querySelector('.block-right')
      const isReversed = block.classList.contains('reversed')

      if (left) {
        gsap.fromTo(
          left,
          { opacity: 0, x: isReversed ? 40 : -40 },
          {
            opacity: 1, x: 0, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: block, start: 'top 78%' },
          }
        )
      }
      if (right) {
        gsap.fromTo(
          right,
          { opacity: 0, x: isReversed ? -40 : 40 },
          {
            opacity: 1, x: 0, duration: 0.75, ease: 'power3.out', delay: 0.1,
            scrollTrigger: { trigger: block, start: 'top 78%' },
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger && blocksRef.current?.contains(st.trigger as Node)) {
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
            INDUSTRIES
          </span>
          <h1 className="hero-anim text-ice-white text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6 opacity-0">
            Tailored Security for<br />Every Sector
          </h1>
          <p className="hero-anim text-slate text-base sm:text-lg max-w-[580px] opacity-0">
            No two environments share the same risks. PGP studies your industry's specific vulnerabilities and deploys the right officers, protocols, and technology to match.
          </p>
        </div>
      </section>

      {/* Industry blocks */}
      <section ref={blocksRef} className="w-full py-16 sm:py-24 bg-deep-navy">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col gap-16 sm:gap-24">
          {industries.map(({ icon: Icon, name, challenge, solutions }, i) => {
            const isReversed = i % 2 !== 0
            return (
              <div
                key={name}
                className={`industry-block${isReversed ? ' reversed' : ''} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start`}
              >
                {/* Left column — moves to second on reversed */}
                <div className={`block-left opacity-0${isReversed ? ' lg:order-2' : ''}`}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 mb-6">
                    <Icon size={28} className="text-gold" />
                  </div>
                  <h2 className="text-ice-white text-3xl sm:text-4xl font-semibold tracking-tight mb-5">
                    {name}
                  </h2>
                  <p className="text-xs font-semibold tracking-[0.1em] uppercase text-gold mb-3">
                    The Challenge
                  </p>
                  <p className="text-slate text-base sm:text-lg leading-relaxed">
                    {challenge}
                  </p>
                </div>

                {/* Right column */}
                <div className={`block-right opacity-0${isReversed ? ' lg:order-1' : ''}`}>
                  <div className="bg-midnight border border-border-subtle rounded-2xl p-7 sm:p-9 hover:border-gold/25 transition-colors duration-300">
                    <p className="text-xs font-semibold tracking-[0.1em] uppercase text-gold mb-5">
                      Our Solution
                    </p>
                    <ul className="flex flex-col gap-4">
                      {solutions.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gold" />
                          <span className="text-slate-light text-sm sm:text-base leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <CTABanner />
    </div>
  )
}
