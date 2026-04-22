import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, DollarSign, Users, MapPin, Home } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const differentiators = [
  {
    icon: Clock,
    title: '24-Hour Dispatch',
    description: 'In-house dispatchers on duty around the clock, every day of the year.',
  },
  {
    icon: DollarSign,
    title: 'Competitive & Affordable Pricing',
    description: 'Premium security services at rates that protect your budget.',
  },
  {
    icon: Users,
    title: 'Trained & Quality Guards',
    description: 'Licensed professionals, closely supervised with ongoing training.',
  },
  {
    icon: MapPin,
    title: 'Serving Houston Since 1985',
    description: 'Four decades of local knowledge and proven security expertise.',
  },
  {
    icon: Home,
    title: 'Locally Owned & Operated',
    description: 'Houston-based company with deep roots in the communities we protect.',
  },
]

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const floatingCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current || !contentRef.current) return

    // Image slide in
    gsap.fromTo(imageRef.current,
      { opacity: 0, x: -80 },
      {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      }
    )

    // Floating card pop in
    if (floatingCardRef.current) {
      gsap.fromTo(floatingCardRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 0.6, delay: 0.5, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )
    }

    // Content animations
    const eyebrow = contentRef.current.querySelector('.eyebrow')
    const headline = contentRef.current.querySelector('.headline')
    const subtext = contentRef.current.querySelector('.subtext')
    const items = contentRef.current.querySelectorAll('.diff-item')
    const cta = contentRef.current.querySelector('.cta-btn')

    gsap.fromTo(eyebrow, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.5,
      scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
    })
    gsap.fromTo(headline, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.6, delay: 0.1,
      scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
    })
    gsap.fromTo(subtext, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.5, delay: 0.2,
      scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
    })

    gsap.fromTo(items,
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.3,
        scrollTrigger: { trigger: contentRef.current, start: 'top 70%' },
      }
    )

    gsap.fromTo(cta, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.5, delay: 0.8,
      scrollTrigger: { trigger: contentRef.current, start: 'top 70%' },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current || st.trigger === contentRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section
      id="why-choose"
      ref={sectionRef}
      className="w-full py-24 sm:py-32 bg-deep-navy"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Image */}
          <div ref={imageRef} className="relative opacity-0">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/about-team.jpg"
                alt="PGP Security Team"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating Card */}
            <div
              ref={floatingCardRef}
              className="absolute -bottom-6 -left-6 bg-midnight border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-2xl opacity-0"
            >
              <div className="text-gold text-4xl sm:text-5xl font-extrabold">40+</div>
              <div className="text-slate text-sm mt-2">Years Protecting Houston</div>
              <div className="w-12 h-0.5 bg-gold mt-3" />
            </div>
          </div>

          {/* Right — Content */}
          <div ref={contentRef}>
            <span className="eyebrow block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
              WHY CHOOSE PGP
            </span>
            <h2 className="headline text-ice-white text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4 opacity-0">
              Houston's Most Trusted Security Partner
            </h2>
            <p className="subtext text-slate text-base sm:text-lg mb-8 opacity-0">
              Since 1985, we've built our reputation on reliability, professionalism, and results. Here's what sets us apart.
            </p>

            {/* Differentiator List */}
            <div className="space-y-0">
              {differentiators.map((item, i) => (
                <div
                  key={i}
                  className="diff-item flex items-start gap-4 py-5 border-b border-border-subtle opacity-0"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <item.icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-ice-white font-semibold text-base mb-1">{item.title}</h4>
                    <p className="text-slate text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="cta-btn mt-8 opacity-0">
              <a
                href="#contact"
                className="inline-block bg-gold text-gold-ink px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-gold-light hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(200,164,94,0.3)] transition-all duration-200"
              >
                Get Your Custom Security Plan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
