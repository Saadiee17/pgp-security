import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DollarSign, GraduationCap, TrendingUp, Users, CheckCircle } from 'lucide-react'
import CTABanner from '@/sections/CTABanner'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Pay',
    description: 'Market-rate wages with overtime opportunities. Armed officers receive premium compensation reflective of their licensure and responsibility.',
  },
  {
    icon: GraduationCap,
    title: 'Paid Training',
    description: 'We invest in your development. New hires receive on-the-job training, and we support officers pursuing higher-level Texas security licenses.',
  },
  {
    icon: TrendingUp,
    title: 'Advancement Paths',
    description: 'Start on patrol and grow into supervisory or dispatch roles. Promotions are based on performance and reliability, not tenure politics.',
  },
  {
    icon: Users,
    title: 'Supportive Team',
    description: "You're backed by experienced dispatch, responsive management, and colleagues who take their work seriously. No one is left out in the field alone.",
  },
]

const requirements = [
  'Valid Texas Level II, III, or IV security license preferred, or willingness to obtain',
  'Must be 18 years of age or older',
  'Clean criminal background (required for state licensing)',
  'Reliable personal transportation',
  'Professional demeanor and appearance at all times',
  'Ability to stand, walk, and remain alert for extended periods',
  'Strong verbal communication skills',
  'High school diploma or GED (preferred)',
]

const positionOptions = [
  { label: 'Select a Position', value: '' },
  { label: 'Armed Guard', value: 'armed-guard' },
  { label: 'Unarmed Guard', value: 'unarmed-guard' },
  { label: 'Patrol Officer', value: 'patrol-officer' },
  { label: 'Dispatcher', value: 'dispatcher' },
  { label: 'Other', value: 'other' },
]

const experienceOptions = [
  { label: 'Years of Experience', value: '' },
  { label: '0 to 1 year', value: '0-1' },
  { label: '1 to 3 years', value: '1-3' },
  { label: '3 to 5 years', value: '3-5' },
  { label: '5+ years', value: '5+' },
]

const licenseOptions = [
  { label: 'License Status', value: '' },
  { label: 'Currently Licensed', value: 'licensed' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Not Yet Licensed', value: 'not-yet' },
]

interface FormState {
  name: string
  email: string
  phone: string
  position: string
  experience: string
  licenseStatus: string
  resume: File | null
  message: string
}

export default function Careers() {
  const heroRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)
  const requirementsRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    licenseStatus: '',
    resume: null,
    message: '',
  })

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

      // Benefits cards
      if (benefitsRef.current) {
        gsap.fromTo(
          benefitsRef.current.querySelectorAll('.anim-header'),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: benefitsRef.current, start: 'top 80%' },
          }
        )
        gsap.fromTo(
          benefitsRef.current.querySelectorAll('.benefit-card'),
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: benefitsRef.current, start: 'top 75%' },
          }
        )
      }

      // Requirements block
      if (requirementsRef.current) {
        gsap.fromTo(
          requirementsRef.current.querySelectorAll('.anim-el'),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: requirementsRef.current, start: 'top 80%' },
          }
        )
      }

      // Form
      if (formRef.current) {
        gsap.fromTo(
          formRef.current.querySelectorAll('.form-field'),
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 78%' },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, send the application to the backend here.
    setSubmitted(true)
  }

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFormData(prev => ({ ...prev, [field]: e.target.value }))

  const inputClass =
    'form-field w-full bg-white/5 border border-border-subtle rounded-lg px-4 py-3.5 text-ice-white placeholder-slate text-sm focus:border-gold focus:ring-2 focus:ring-gold/15 focus:outline-none transition-all duration-200 opacity-0'

  const selectClass = inputClass + ' appearance-none cursor-pointer'

  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="w-full pt-[150px] pb-20 lg:pb-28 relative overflow-hidden"
      >
        {/* Background image + scrim */}
        <div className="absolute inset-0">
          <img src="/career1.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy via-deep-navy/90 to-deep-navy/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-deep-navy/50" />
        </div>
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,94,0.4), transparent)' }}
        />

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="max-w-[680px]">
            <span className="hero-el block text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-5 opacity-0">
              CAREERS
            </span>
            <h1 className="hero-el text-ice-white text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6 opacity-0">
              Join the PGP<br className="hidden sm:block" /> Security Team
            </h1>
            <p className="hero-el text-slate text-lg sm:text-xl leading-relaxed max-w-[560px] opacity-0">
              We're always looking for disciplined, professional individuals who take pride in
              keeping people safe. If you want to build a career and not just hold a job, PGP
              is where that starts.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why Work With Us ── */}
      <section
        ref={benefitsRef}
        className="w-full py-20 lg:py-28 bg-midnight relative overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,94,0.25), transparent)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="anim-header block text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
              WHY WORK WITH US
            </span>
            <h2 className="anim-header text-ice-white text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4 opacity-0">
              More Than a Paycheck
            </h2>
            <p className="anim-header text-slate text-base sm:text-lg max-w-[520px] mx-auto opacity-0">
              PGP treats its officers with the same respect we expect them to show clients. Here's
              what that means in practice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="benefit-card bg-deep-navy border border-border-subtle rounded-2xl p-6 opacity-0 hover:border-gold/40 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                <b.icon size={36} className="text-gold mb-4 flex-shrink-0" />
                <h3 className="text-ice-white text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles / Requirements ── */}
      <section
        ref={requirementsRef}
        className="w-full py-20 lg:py-28 bg-deep-navy relative overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Open Roles */}
            <div>
              <span className="anim-el block text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-5 opacity-0">
                OPEN ROLES
              </span>
              <h2 className="anim-el text-ice-white text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-6 opacity-0">
                Positions We're<br /> Hiring For
              </h2>
              <p className="anim-el text-slate text-base leading-relaxed mb-8 opacity-0">
                We hire across multiple roles on an ongoing basis. Whether you're a seasoned
                armed officer or just starting in the industry, there's a path for you at PGP.
              </p>
              <div className="anim-el opacity-0 space-y-3">
                {[
                  { role: 'Armed Guard', detail: 'Level III/IV license required · Houston metro' },
                  { role: 'Unarmed Guard', detail: 'Level II license preferred · Various sites' },
                  { role: 'Patrol Officer', detail: 'Valid TX driver license required · Mobile coverage' },
                  { role: 'Dispatcher', detail: 'Communication & logistics · HQ based' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-midnight border border-border-subtle rounded-xl px-5 py-4 hover:border-gold/30 transition-colors duration-200"
                  >
                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0 mt-1.5" />
                    <div>
                      <div className="text-ice-white text-sm font-semibold">{item.role}</div>
                      <div className="text-slate text-xs mt-0.5">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div>
              <span className="anim-el block text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-5 opacity-0">
                REQUIREMENTS
              </span>
              <h2 className="anim-el text-ice-white text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-6 opacity-0">
                What We Look For
              </h2>
              <p className="anim-el text-slate text-base leading-relaxed mb-8 opacity-0">
                PGP holds its officers to a high standard, because our clients depend on it.
                All candidates must meet the following baseline criteria:
              </p>
              <ul className="anim-el opacity-0 space-y-3">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-slate text-sm leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section className="w-full py-20 lg:py-28 bg-midnight border-t border-border-subtle relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,94,0.25), transparent)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div ref={formRef} className="lg:col-span-3">
              <span className="form-field block text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
                APPLY NOW
              </span>
              <h2 className="form-field text-ice-white text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4 opacity-0">
                Submit Your Application
              </h2>
              <p className="form-field text-slate text-base mb-8 opacity-0">
                Fill out the form below and our team will review your application and reach out
                within 2 business days.
              </p>

              {submitted ? (
                <div className="bg-deep-navy border border-gold/30 rounded-2xl p-8 sm:p-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-5">
                    <CheckCircle size={34} className="text-gold" />
                  </div>
                  <h3 className="text-ice-white text-2xl font-semibold mb-2">Application Received</h3>
                  <p className="text-slate text-sm sm:text-base max-w-[420px]">
                    Thank you{formData.name ? `, ${formData.name.split(' ')[0]}` : ''}! We've received your
                    application and our team will review it and reach out within 2 business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', phone: '', position: '', experience: '', licenseStatus: '', resume: null, message: '' })
                    }}
                    className="mt-7 border border-border-subtle text-ice-white px-7 py-3 rounded-lg font-medium text-sm hover:border-gold hover:text-gold transition-all duration-200"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className={inputClass}
                    value={formData.name}
                    onChange={set('name')}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className={inputClass}
                    value={formData.email}
                    onChange={set('email')}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    className={inputClass}
                    value={formData.phone}
                    onChange={set('phone')}
                  />
                  <select
                    required
                    className={selectClass}
                    value={formData.position}
                    onChange={set('position')}
                  >
                    {positionOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-midnight text-ice-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    className={selectClass}
                    value={formData.experience}
                    onChange={set('experience')}
                  >
                    {experienceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-midnight text-ice-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <select
                    className={selectClass}
                    value={formData.licenseStatus}
                    onChange={set('licenseStatus')}
                  >
                    {licenseOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-midnight text-ice-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* File input */}
                <div className="form-field opacity-0">
                  <label className="block text-slate text-xs font-medium mb-2 tracking-wide uppercase">
                    Resume (PDF, DOC, DOCX)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full bg-white/5 border border-border-subtle rounded-lg px-4 py-3 text-slate text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gold/15 file:text-gold hover:file:bg-gold/25 cursor-pointer focus:border-gold focus:ring-2 focus:ring-gold/15 focus:outline-none transition-all duration-200"
                    onChange={(e) => setFormData(prev => ({ ...prev, resume: e.target.files?.[0] ?? null }))}
                  />
                </div>

                <textarea
                  placeholder="Tell us about yourself: experience, why you want to join PGP, availability..."
                  rows={4}
                  className={inputClass + ' resize-none'}
                  value={formData.message}
                  onChange={set('message')}
                />

                <button
                  type="submit"
                  className="form-field w-full bg-gold text-gold-ink py-4 rounded-lg font-semibold text-sm hover:bg-gold-light hover:scale-[1.01] transition-all duration-200 opacity-0"
                >
                  Submit Application
                </button>
              </form>
              )}

              <p className="form-field text-slate text-xs mt-4 opacity-0">
                Applications are reviewed on a rolling basis. No recruitment agencies, please.
              </p>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-2">
              <div className="bg-deep-navy border border-border-subtle rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28">
                <div>
                  <h3 className="text-ice-white text-base font-semibold mb-2">Before You Apply</h3>
                  <p className="text-slate text-sm leading-relaxed">
                    Texas security officers must hold a valid DPS license. If you don't have one
                    yet, that's okay. We can point you toward the right training resources. Include
                    your current license status in the form.
                  </p>
                </div>

                <div className="border-t border-border-subtle pt-6">
                  <h3 className="text-ice-white text-base font-semibold mb-3">What Happens Next</h3>
                  <div className="space-y-3">
                    {[
                      'We review your application within 2 business days',
                      'Qualified candidates are contacted for a phone screen',
                      'In-person interview at our Houston HQ',
                      'Background check & license verification',
                      'Offer, onboarding, and assignment',
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 text-gold font-mono text-[10px] font-semibold mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-slate text-sm leading-snug">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border-subtle pt-6">
                  <div className="text-slate text-xs font-mono">Texas License No. B-19349</div>
                  <div className="text-slate text-xs mt-1">Equal Opportunity Employer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
