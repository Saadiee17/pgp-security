import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Eye, HandshakeIcon, Users, Award, Clock, MapPin, Star } from 'lucide-react'
import CTABanner from '@/sections/CTABanner'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    icon: HandshakeIcon,
    title: 'Integrity',
    description: 'We operate with full transparency, with honest assessments, honest pricing, and honest communication at every step.',
  },
  {
    icon: Eye,
    title: 'Vigilance',
    description: 'Our officers maintain relentless situational awareness, proactively identifying and neutralizing threats before they escalate.',
  },
  {
    icon: Shield,
    title: 'Accountability',
    description: 'Every shift is logged, every incident documented. You always know what happened and when, with no gaps and no excuses.',
  },
  {
    icon: Users,
    title: 'Service',
    description: 'We treat every client as a long-term partner. Dedicated account managers, responsive dispatch, and guards who take pride in their work.',
  },
]

const stats = [
  { value: '40+', label: 'Years Serving Houston', icon: Clock },
  { value: '500+', label: 'Clients Protected', icon: Star },
  { value: '24/7', label: 'Operations Coverage', icon: Shield },
  { value: 'Statewide', label: 'Texas Licensed', icon: Award },
]

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const ctaCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.hero-el'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out', delay: 0.1 }
        )
      }

      // Story section
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current.querySelectorAll('.anim-el'),
          { opacity: 0, y: 35 },
          {
            opacity: 1, y: 0, stagger: 0.12, duration: 0.65, ease: 'power3.out',
            scrollTrigger: { trigger: storyRef.current, start: 'top 80%' },
          }
        )
      }

      // Values cards
      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current.querySelectorAll('.anim-header'),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: valuesRef.current, start: 'top 80%' },
          }
        )
        gsap.fromTo(
          valuesRef.current.querySelectorAll('.value-card'),
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: valuesRef.current, start: 'top 75%' },
          }
        )
      }

      // Stats row
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll('.stat-el'),
          { opacity: 0, y: 25 },
          {
            opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
          }
        )
      }

      // Team image block
      if (teamRef.current) {
        gsap.fromTo(
          teamRef.current.querySelectorAll('.anim-el'),
          { opacity: 0, y: 35 },
          {
            opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: teamRef.current, start: 'top 78%' },
          }
        )
      }

      // CTA card
      if (ctaCardRef.current) {
        gsap.fromTo(
          ctaCardRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: ctaCardRef.current, start: 'top 82%' },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="w-full pt-[140px] pb-20 lg:pb-28 bg-deep-navy relative overflow-hidden"
      >
        {/* Subtle radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(200,164,94,0.07) 0%, transparent 65%)' }}
        />
        {/* Gold top edge accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,94,0.4), transparent)' }}
        />

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="max-w-[720px]">
            <span className="hero-el block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-5 opacity-0">
              ABOUT PGP SECURITY
            </span>
            <h1 className="hero-el text-ice-white text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6 opacity-0">
              Over 40 Years of<br className="hidden sm:block" /> Security Excellence
            </h1>
            <p className="hero-el text-slate text-lg sm:text-xl leading-relaxed max-w-[580px] opacity-0">
              Since 1985, Professional Guard & Patrol Inc. has been Houston's trusted partner in
              commercial security, built on discipline, accountability, and unwavering commitment
              to the communities we protect.
            </p>
            <div className="hero-el mt-8 flex items-center gap-3 opacity-0">
              <div className="h-px w-8 bg-gold/50" />
              <span className="text-slate font-mono text-xs tracking-[0.08em]">Texas License No. B-19349</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section
        ref={storyRef}
        className="w-full py-20 lg:py-28 bg-midnight relative overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,94,0.25), transparent)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="anim-el block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-5 opacity-0">
                OUR STORY
              </span>
              <h2 className="anim-el text-ice-white text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-6 opacity-0">
                Four Decades Rooted<br /> in Houston
              </h2>
              <p className="anim-el text-slate text-base leading-relaxed mb-5 opacity-0">
                PGP Security was founded in Houston in 1985 with a single mission: provide
                reliable, professional security that businesses could actually count on. In a
                market crowded with cut-rate services and inconsistent guards, our founder saw
                an opportunity to do things differently. He hired only vetted officers, invested
                in continuous training, and built client relationships that last decades, not months.
              </p>
              <p className="anim-el text-slate text-base leading-relaxed mb-5 opacity-0">
                Forty years later, PGP remains independently owned and Houston-headquartered.
                We've never been acquired, never compromised our standards, and never stopped
                treating every contract as a personal commitment to the people and properties in our care.
              </p>
              <p className="anim-el text-slate text-base leading-relaxed opacity-0">
                Our officers are licensed by the Texas Department of Public Safety under
                License No. B-19349, one of the oldest active private security licenses in the state.
                That longevity reflects who we are: a company that earns trust, then keeps it.
              </p>
            </div>

            <div className="anim-el opacity-0 space-y-4">
              {/* Timeline milestones */}
              {[
                { year: '1985', label: 'Founded in Houston, TX', detail: 'PGP opens its doors with a small team of licensed officers.' },
                { year: '1992', label: 'Armed Division Launched', detail: 'Expanded into armed guard services for high-value commercial sites.' },
                { year: '2001', label: 'Statewide Licensing', detail: 'Received full Texas DPS licensure enabling operations across the state.' },
                { year: '2010', label: 'Patrol Fleet Expanded', detail: 'Marked patrol vehicles added for large-campus and industrial clients.' },
                { year: '2025', label: '40 Years of Service', detail: 'Still Houston-owned, still Houston-focused, and stronger than ever.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-200">
                      <span className="text-gold font-mono text-[10px] font-semibold">{item.year.slice(2)}</span>
                    </div>
                    {i < 4 && <div className="w-px flex-1 bg-border-subtle mt-1" />}
                  </div>
                  <div className="pb-5">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-gold font-mono text-xs">{item.year}</span>
                      <span className="text-ice-white text-sm font-semibold">{item.label}</span>
                    </div>
                    <p className="text-slate text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section
        ref={valuesRef}
        className="w-full py-20 lg:py-28 bg-deep-navy relative overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="anim-header block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
              MISSION & VALUES
            </span>
            <h2 className="anim-header text-ice-white text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4 opacity-0">
              What Drives Every Shift
            </h2>
            <p className="anim-header text-slate text-base sm:text-lg max-w-[540px] mx-auto opacity-0">
              Our mission is to provide professional, dependable security services that protect
              people, property, and peace of mind, every hour of every day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="value-card bg-midnight border border-border-subtle rounded-2xl p-6 opacity-0 hover:border-gold/40 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                <v.icon size={36} className="text-gold mb-4 flex-shrink-0" />
                <h3 className="text-ice-white text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── By the Numbers ── */}
      <section
        ref={statsRef}
        className="w-full py-16 lg:py-20 bg-midnight border-y border-border-subtle relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(200,164,94,0.04) 0%, transparent 65%)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <span className="stat-el block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-3 opacity-0">
              BY THE NUMBERS
            </span>
            <h2 className="stat-el text-ice-white text-2xl sm:text-3xl font-semibold tracking-tight opacity-0">
              A Track Record That Speaks
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((s, i) => (
              <div
                key={i}
                className="stat-el opacity-0 text-center bg-deep-navy border border-border-subtle rounded-2xl px-6 py-8 hover:border-gold/30 transition-colors duration-200"
              >
                <s.icon size={28} className="text-gold mx-auto mb-3" />
                <div className="text-ice-white text-3xl sm:text-4xl font-semibold tracking-tight mb-1">{s.value}</div>
                <div className="text-slate text-sm leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Operations / Team Image ── */}
      <section
        ref={teamRef}
        className="w-full py-20 lg:py-28 bg-deep-navy relative overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="anim-el opacity-0 relative rounded-2xl overflow-hidden border border-border-subtle">
              <img
                src="/images/20260512_111559.jpg"
                alt="PGP Security team and operations"
                className="w-full h-[380px] lg:h-[460px] object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 bg-midnight/90 backdrop-blur-sm border border-border-subtle rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gold flex-shrink-0" />
                  <span className="text-ice-white text-xs font-semibold">Houston, Texas · Since 1985</span>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div>
              <span className="anim-el block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-5 opacity-0">
                OUR OPERATIONS
              </span>
              <h2 className="anim-el text-ice-white text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-6 opacity-0">
                A Team Built on<br /> Discipline & Pride
              </h2>
              <p className="anim-el text-slate text-base leading-relaxed mb-5 opacity-0">
                Every PGP officer is background-checked, licensed by the Texas DPS, and trained
                to our internal standards before their first assignment. We don't cut corners on
                personnel, because the quality of your security is only as high as the quality
                of the people wearing the uniform.
              </p>
              <p className="anim-el text-slate text-base leading-relaxed mb-8 opacity-0">
                Our dispatch team operates around the clock from our Houston headquarters,
                coordinating patrol routes, responding to alarms, and staying in constant
                communication with officers in the field. When you call, someone answers.
              </p>
              <div className="anim-el opacity-0 space-y-3">
                {[
                  'Texas DPS Licensed Officers',
                  'Background-Verified Personnel',
                  'In-House Training Program',
                  '24/7 Dispatch & Communication',
                  'Armed & Unarmed Divisions',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <span className="text-slate text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Inline CTA Card ── */}
      <section className="w-full py-16 bg-midnight border-t border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-6">
          <div
            ref={ctaCardRef}
            className="opacity-0 bg-deep-navy border border-border-subtle rounded-2xl px-8 py-12 sm:px-12 text-center hover:border-gold/30 transition-colors duration-300 relative overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(200,164,94,0.05) 0%, transparent 60%)' }}
            />
            <div className="relative z-10">
              <span className="block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-4">
                WORK WITH US
              </span>
              <h2 className="text-ice-white text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
                Ready to work with a team you can trust?
              </h2>
              <p className="text-slate text-base max-w-[480px] mx-auto mb-8">
                Contact PGP Security today for a free consultation and custom security plan
                tailored to your property and budget.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="bg-gold text-gold-ink px-10 py-4 rounded-lg font-semibold text-sm hover:bg-gold-light hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(200,164,94,0.25)] transition-all duration-200"
                >
                  Get a Free Quote
                </Link>
                <Link
                  to="/careers"
                  className="border border-ice-white/30 text-ice-white px-10 py-4 rounded-lg font-medium text-sm hover:border-gold hover:text-gold transition-all duration-200"
                >
                  Join Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
