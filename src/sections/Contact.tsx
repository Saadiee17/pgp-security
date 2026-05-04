import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Facebook, Youtube, MapPin, Phone, Clock, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const serviceOptions = [
  'Select Service Type',
  'Armed Guards',
  'Unarmed Guards',
  'Patrol Services',
  'Alarm Response',
  'Temporary Security',
  'Other / Not Sure',
]

// X (Twitter) icon component
function XIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    company: '',
    message: '',
  })

  useEffect(() => {
    if (!sectionRef.current || !formRef.current || !infoRef.current) return

    // Form animation
    const formFields = formRef.current.querySelectorAll('.form-field')
    gsap.fromTo(formFields,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 75%' },
      }
    )

    // Info card animation
    gsap.fromTo(infoRef.current,
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: infoRef.current, start: 'top 75%' },
      }
    )

    const infoBlocks = infoRef.current.querySelectorAll('.info-block')
    gsap.fromTo(infoBlocks,
      { opacity: 0, y: 15 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.5, delay: 0.3,
        scrollTrigger: { trigger: infoRef.current, start: 'top 75%' },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === formRef.current || st.trigger === infoRef.current) st.kill()
      })
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, send form data to backend
    alert('Thank you! We will contact you within 24 hours.')
  }

  const inputClass = "form-field w-full bg-white/5 border border-border-subtle rounded-lg px-4 py-3.5 text-ice-white placeholder-slate text-sm focus:border-gold focus:ring-2 focus:ring-gold/15 focus:outline-none transition-all duration-200 opacity-0"

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-24 sm:py-32 bg-deep-navy border-t border-border-subtle"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — Form */}
          <div ref={formRef} className="lg:col-span-3">
            <span className="form-field block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
              GET IN TOUCH
            </span>
            <h2 className="form-field text-ice-white text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4 opacity-0">
              Request a Free Security Quote
            </h2>
            <p className="form-field text-slate text-base mb-8 opacity-0">
              Fill out the form below and our team will respond within 24 hours with a customized security plan.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className={inputClass}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className={inputClass}
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className={inputClass}
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
                <select
                  className={inputClass + ' appearance-none cursor-pointer'}
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                >
                  {serviceOptions.map((opt, i) => (
                    <option key={i} value={i === 0 ? '' : opt} className="bg-midnight text-ice-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder="Company Name (Optional)"
                className={inputClass}
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
              />
              <textarea
                placeholder="Tell us about your security needs..."
                rows={4}
                className={inputClass + ' resize-none'}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              />
              <button
                type="submit"
                className="form-field w-full bg-gold text-gold-ink py-4 rounded-lg font-semibold text-sm hover:bg-gold-light hover:scale-[1.01] transition-all duration-200 opacity-0"
              >
                Get My Free Quote
              </button>
            </form>

            <p className="form-field text-slate text-xs mt-4 opacity-0">
              For employment inquiries, please visit our{' '}
              <a href="#" className="text-gold hover:underline">Employment page</a>.
            </p>
          </div>

          {/* Right — Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 opacity-0">
            <div className="bg-midnight border border-border-subtle rounded-2xl p-6 sm:p-8 space-y-6">
              {/* Phone */}
              <div className="info-block">
                <div className="flex items-center gap-2 text-gold text-xs font-semibold tracking-[0.08em] uppercase mb-2">
                  <Phone size={12} />
                  PHONE
                </div>
                <a href="tel:2814484900" className="text-ice-white text-lg font-semibold hover:text-gold transition-colors">
                  (281) 448-4900
                </a>
                <div className="text-slate text-sm mt-1">
                  Toll-Free: <a href="tel:8774484904" className="hover:text-gold transition-colors">(877) 448-4904</a>
                </div>
              </div>

              {/* Address */}
              <div className="info-block">
                <div className="flex items-center gap-2 text-gold text-xs font-semibold tracking-[0.08em] uppercase mb-2">
                  <MapPin size={12} />
                  ADDRESS
                </div>
                <div className="text-ice-white text-sm">425 Aldine Bender Rd., Suite E</div>
                <div className="text-slate text-sm">Houston, Texas 77060</div>
              </div>

              {/* Hours */}
              <div className="info-block">
                <div className="flex items-center gap-2 text-gold text-xs font-semibold tracking-[0.08em] uppercase mb-2">
                  <Clock size={12} />
                  AVAILABILITY
                </div>
                <div className="text-ice-white text-sm">24 Hours / 7 Days</div>
                <div className="text-slate text-xs italic mt-1">Crime doesn't sleep. Neither do we.</div>
              </div>

              {/* License */}
              <div className="info-block">
                <div className="flex items-center gap-2 text-gold text-xs font-semibold tracking-[0.08em] uppercase mb-2">
                  <Award size={12} />
                  LICENSE
                </div>
                <div className="text-slate font-mono text-xs">Texas License No. B-19349</div>
              </div>

              {/* Social Icons */}
              <div className="info-block pt-4 border-t border-border-subtle">
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.facebook.com/Professional-Guard-and-Patrol-Inc-452144301829618/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate hover:text-gold transition-colors"
                  >
                    <Facebook size={22} />
                  </a>
                  <a
                    href="https://twitter.com/pgpinc1985"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate hover:text-gold transition-colors"
                  >
                    <XIcon size={22} />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCC8DgvJU5mVR3dGZlLUTcbw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate hover:text-gold transition-colors"
                  >
                    <Youtube size={22} />
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 h-[200px] rounded-2xl overflow-hidden border border-border-subtle relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456!2d-95.4148!3d29.9361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU2JzEwLjAiTiA5NcKwMjQnNTMuMyJX!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(60%) brightness(0.4)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PGP Security Location"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-lg px-4 py-2">
                  <span className="text-gold text-xs font-semibold">425 Aldine Bender Rd</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
