import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HardHat, Building2, Home, Factory, CalendarDays, ArrowRight, Check } from 'lucide-react'
import CTABanner from '@/sections/CTABanner'
import { useAssessment } from '@/components/AssessmentModal'

gsap.registerPlugin(ScrollTrigger)

type Stat = { value: string; label: string }

type Industry = {
  slug: string
  icon: typeof HardHat
  name: string
  tagline: string
  image: string
  challenge: string
  solutions: string[]
  stats: Stat[]
}

const industries: Industry[] = [
  {
    slug: 'construction',
    icon: HardHat,
    name: 'Construction',
    tagline: 'Job-site protection that never clocks out.',
    image: '/industry-industrial.jpg',
    challenge:
      'Active job sites are prime targets after hours. Copper theft, tool vandalism, and unauthorized equipment access can cost hundreds of thousands in losses and delays, yet most contractors rely on fencing alone.',
    solutions: [
      'Armed and unarmed on-site guards during off-hours',
      'Mobile patrol routes covering the full perimeter',
      'Incident reporting with photographic documentation',
      'Access control at site entry points',
    ],
    stats: [
      { value: '$1B+', label: 'Lost to U.S. jobsite theft yearly' },
      { value: '24/7', label: 'Off-hours coverage' },
    ],
  },
  {
    slug: 'commercial',
    icon: Building2,
    name: 'Commercial',
    tagline: 'A confident presence for offices, retail, and campuses.',
    image: '/industry-corporate.jpg',
    challenge:
      'Office parks, retail centers, and business campuses face shoplifting, trespassing, and after-hours break-ins. A visible security presence reduces risk and reassures employees, tenants, and customers alike.',
    solutions: [
      'Lobby and reception guard posts',
      'Patrol of parking structures and common areas',
      'Alarm response and lock-up verification',
      'CCTV monitoring coordination',
    ],
    stats: [
      { value: '30%', label: 'Avg. shrink reduction with guards' },
      { value: '< 5 min', label: 'On-site alarm response' },
    ],
  },
  {
    slug: 'residential',
    icon: Home,
    name: 'Residential',
    tagline: 'Safe, welcoming communities at every gate.',
    image: '/industry-residential.jpg',
    challenge:
      'Gated communities and HOAs need consistent, professional security without the cost of a full-time police presence. Residents expect both safety and a welcoming atmosphere at every entry point.',
    solutions: [
      'Gated entry management and visitor verification',
      'Overnight and weekend community patrols',
      'Rapid response to disturbance calls',
      'Detailed shift activity logs for HOA records',
    ],
    stats: [
      { value: '100%', label: 'Logged entry verification' },
      { value: '365', label: 'Days of patrol coverage' },
    ],
  },
  {
    slug: 'industrial',
    icon: Factory,
    name: 'Industrial',
    tagline: 'Locking down inventory around the clock.',
    image: '/images/20260512_120829.jpg',
    challenge:
      'Warehouses, logistics hubs, and manufacturing facilities hold significant inventory and operate around the clock. Internal theft, cargo diversion, and unauthorized access are persistent threats in high-turnover environments.',
    solutions: [
      'Gate officers for inbound and outbound truck verification',
      'Perimeter patrols to deter cargo theft',
      'Employee and contractor access credentialing',
      'Inventory area surveillance and seal checks',
    ],
    stats: [
      { value: '99.9%', label: 'Verified gate throughput' },
      { value: '24/7', label: 'Shift-based coverage' },
    ],
  },
  {
    slug: 'events',
    icon: CalendarDays,
    name: 'Events',
    tagline: 'Crowd-ready security for any gathering.',
    image: '/industry-event.jpg',
    challenge:
      'Concerts, corporate conferences, and public gatherings concentrate large crowds in unpredictable environments. Organizers need professional crowd management, rapid incident response, and seamless coordination with venue staff.',
    solutions: [
      'Crowd management and queue control',
      'Access credentialing at multiple entry points',
      'Plainclothes officers for VIP protection',
      'On-site emergency response and evacuation support',
    ],
    stats: [
      { value: '10k+', label: 'Attendees managed per event' },
      { value: 'VIP', label: 'Close-protection trained' },
    ],
  },
]

// Bento spans on a 6-column desktop grid with uniform row heights:
//  Row 1 → Construction (4) + Commercial (2)  — same row, asymmetric widths
//  Row 2 → Industrial (6)                      — full-width feature band
//  Row 3 → Residential (3) + Events (3)        — balanced pair
const bentoSpan: Record<string, string> = {
  construction: 'lg:col-span-4',
  commercial: 'lg:col-span-2',
  industrial: 'lg:col-span-6',
  residential: 'lg:col-span-3',
  events: 'sm:col-span-2 lg:col-span-3',
}

export default function IndustriesPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const bentoRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const { open: openAssessment } = useAssessment()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero stagger
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.hero-anim'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out', delay: 0.1 }
        )
      }

      // Bento cards rise in with a stagger
      if (bentoRef.current) {
        gsap.fromTo(
          bentoRef.current.querySelectorAll('.bento-card'),
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: bentoRef.current, start: 'top 78%' },
          }
        )
      }

      // Sticky cross-fade storytelling section
      if (storyRef.current) {
        const blocks = storyRef.current.querySelectorAll<HTMLElement>('.sector-block')

        const setActive = (idx: number) => {
          imageRefs.current.forEach((img, i) => {
            if (!img) return
            gsap.to(img, { opacity: i === idx ? 1 : 0, duration: 0.6, ease: 'power2.out' })
          })
        }

        blocks.forEach((block, i) => {
          // staggerChildren: heading → paragraph → cards slide in from the left
          gsap.fromTo(
            block.querySelectorAll('.sector-anim'),
            { opacity: 0, x: -40 },
            {
              opacity: 1, x: 0, stagger: 0.12, duration: 0.65, ease: 'power3.out',
              scrollTrigger: { trigger: block, start: 'top 75%' },
            }
          )

          // Drive the sticky image cross-fade as each sector becomes active
          ScrollTrigger.create({
            trigger: block,
            start: 'top 60%',
            end: 'bottom 60%',
            onToggle: (self) => {
              if (self.isActive) setActive(i)
            },
          })
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-deep-navy">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-[140px] pb-20 sm:pb-28 overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/industry-corporate.jpg"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/85 via-deep-navy/80 to-deep-navy" />
        </div>
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,94,0.4), transparent)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <span className="hero-anim block text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
            INDUSTRIES
          </span>
          <h1 className="hero-anim text-ice-white text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6 opacity-0">
            Tailored Security for<br />Every Sector
          </h1>
          <p className="hero-anim text-slate-light text-base sm:text-lg max-w-[600px] opacity-0">
            No two environments share the same risks. PGP studies your industry's specific vulnerabilities and deploys the right officers, protocols, and technology to match.
          </p>
        </div>
      </section>

      {/* Bento overview grid */}
      <section className="w-full pt-16 sm:pt-20 pb-4 sm:pb-6 bg-deep-navy">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-8 sm:mb-10">
            <span className="block text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-3">
              SECTORS WE PROTECT
            </span>
            <h2 className="text-ice-white text-2xl sm:text-3xl font-semibold tracking-tight">
              Five industries, one standard of protection
            </h2>
          </div>
          <div
            ref={bentoRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5 lg:auto-rows-[300px]"
          >
            {industries.map(({ slug, name, tagline, image, icon: Icon }) => (
              <a
                key={slug}
                href={`#sector-${slug}`}
                className={`bento-card group relative rounded-2xl overflow-hidden min-h-[260px] ${bentoSpan[slug]} opacity-0`}
              >
                <img
                  src={image}
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,12,24,0.96)] via-[rgba(10,22,40,0.55)] to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl group-hover:ring-gold/30 transition-colors duration-300" />
                <div className="relative h-full flex flex-col justify-end p-6 sm:p-7">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gold/15 border border-gold/25 backdrop-blur-sm mb-4 w-fit">
                    <Icon size={22} className="text-gold" />
                  </div>
                  <h3 className="text-white text-xl sm:text-2xl font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                    {name}
                  </h3>
                  <p className="text-white/85 text-sm mt-1 max-w-[36ch] drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                    {tagline}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-gold text-xs font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore <ArrowRight size={13} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky cross-fade storytelling */}
      <section ref={storyRef} className="w-full py-16 sm:py-24 bg-deep-navy">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            {/* LEFT — scrolling sector content */}
            <div className="flex flex-col">
              {industries.map(({ slug, name, tagline, icon: Icon, challenge, solutions, stats, image }, i) => (
                <div
                  key={slug}
                  id={`sector-${slug}`}
                  className="sector-block scroll-mt-28 min-h-[72vh] flex flex-col justify-center py-12 lg:py-20"
                >
                  {/* Mobile image (sticky stack is desktop-only) */}
                  <div className="sector-anim lg:hidden relative rounded-2xl overflow-hidden h-56 mb-7">
                    <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 to-transparent" />
                  </div>

                  <div className="sector-anim flex items-center gap-3 mb-5">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 border border-gold/20">
                      <Icon size={24} className="text-gold" />
                    </span>
                    <span className="font-mono text-xs text-gold/70 tracking-[0.2em]">
                      0{i + 1} / 0{industries.length}
                    </span>
                  </div>

                  <h2 className="sector-anim text-ice-white text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-3">
                    {name}
                  </h2>
                  <p className="sector-anim text-gold text-base sm:text-lg font-medium mb-5">
                    {tagline}
                  </p>
                  <p className="sector-anim text-slate text-base sm:text-lg leading-relaxed mb-7 max-w-[520px]">
                    {challenge}
                  </p>

                  {/* Stats */}
                  <div className="sector-anim flex flex-wrap gap-8 mb-8">
                    {stats.map((s) => (
                      <div key={s.label}>
                        <div className="text-ice-white text-3xl font-bold tracking-tight">{s.value}</div>
                        <div className="text-slate text-xs mt-1 max-w-[16ch]">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Solution card */}
                  <div className="sector-anim bg-midnight border border-border-subtle rounded-2xl p-6 sm:p-7 max-w-[520px]">
                    <p className="text-xs font-semibold tracking-[0.1em] uppercase text-gold mb-4">
                      Our Solution
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                      {solutions.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center">
                            <Check size={11} className="text-gold" />
                          </span>
                          <span className="text-slate-light text-sm leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sector-anim mt-7">
                    <button
                      type="button"
                      onClick={() => openAssessment(`${name} Security`)}
                      className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all duration-200"
                    >
                      Request a {name.toLowerCase()} assessment <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — sticky cross-fading image */}
            <div className="hidden lg:block">
              <div className="sticky top-0 h-screen flex items-center">
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-border-subtle shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                  {industries.map(({ slug, name, image }, i) => (
                    <div
                      key={slug}
                      ref={(el) => { imageRefs.current[i] = el }}
                      className="absolute inset-0"
                      style={{ opacity: i === 0 ? 1 : 0 }}
                    >
                      <img src={image} alt={name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/70 via-transparent to-transparent" />
                      <div className="absolute bottom-7 left-7">
                        <span className="text-white text-2xl font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                          {name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-link to services */}
      <section className="w-full py-14 bg-midnight border-t border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div>
            <h3 className="text-ice-white text-xl sm:text-2xl font-semibold">
              Not sure which fits your site?
            </h3>
            <p className="text-slate text-sm mt-1">
              Our consultants will assess your property and recommend the right mix.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 border border-ice-white/30 text-ice-white px-7 py-3.5 rounded-lg font-medium text-sm hover:border-gold hover:text-gold transition-all duration-200 whitespace-nowrap"
          >
            View all services <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <CTABanner />
    </div>
  )
}
