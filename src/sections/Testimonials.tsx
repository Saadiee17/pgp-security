import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: 'PGP personnel go the extra mile to make sure that I have coverage when I need it, often at the last minute. Thank you PGP!',
    name: 'Anne Chooljian',
    title: 'Property Manager, Transwestern',
  },
  {
    quote: 'I wanted to take a moment to thank you and the entire team at PGP for your many years of exceptional service. We truly appreciate and value our continued business relationship.',
    name: 'Brian K. Turner',
    title: 'President, Alarm Masters Corporation',
  },
  {
    quote: 'PGP has done an excellent job meeting our company\'s needs. Mr. Lattea responds to our security needs in a timely manner and PGP has always been able to take care of us during short notice situations.',
    name: 'Shad Tanner',
    title: 'CFI Asset Protection Supervisor, Car Toys, Inc.',
  },
  {
    quote: 'We have been using Professional Guard Service over 10 years. They have always provided exceptional service from exterior patrolling to interior coverage. The staff are very reliable and professional.',
    name: 'Charles Doest',
    title: 'Parts Director, Fred Haas Toyota Country',
  },
  {
    quote: 'We have used Professional Guard and Patrol for several years as our response team and patrols. PGP has been prompt and available anytime on a moment\'s notice when emergencies come up.',
    name: 'Barbara L. Bender',
    title: 'J.D. Abrams, L.P.',
  },
  {
    quote: 'Everyone we worked with at Professional Guard always had a great attitude and professional appearance. If you are looking for an armed or unarmed security guard, I would not hesitate to give Robert a call.',
    name: 'Office Manager',
    title: 'Houston Heat Treat',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1)
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(3)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return

    const header = sectionRef.current.querySelectorAll('.anim-el')
    gsap.fromTo(header,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    )

    const cards = sectionRef.current.querySelectorAll('.testimonial-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) st.kill()
      })
    }
  }, [slidesPerView])

  const maxIndex = Math.max(0, testimonials.length - slidesPerView)

  const prev = () => setCurrentIndex(prev => Math.max(0, prev - 1))
  const next = () => setCurrentIndex(prev => Math.min(maxIndex, prev + 1))

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 sm:py-32 bg-deep-navy"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="anim-el block text-gold text-xs font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="anim-el text-ice-white text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight opacity-0">
            Trusted by Houston's<br />Leading Businesses
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center text-ice-white hover:border-gold hover:text-gold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-deep-navy/80 backdrop-blur-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center text-ice-white hover:border-gold hover:text-gold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-deep-navy/80 backdrop-blur-sm"
          >
            <ChevronRight size={20} />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden mx-4">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="testimonial-card flex-shrink-0 bg-white/[0.03] backdrop-blur-sm border border-border-subtle rounded-2xl p-6 sm:p-8 opacity-0"
                  style={{ width: `calc(${100 / slidesPerView}% - ${(slidesPerView - 1) * 24 / slidesPerView}px)` }}
                >
                  <Quote size={36} className="text-gold/30 mb-4" />
                  <p className="text-ice-white text-sm sm:text-base leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                  <div>
                    <div className="text-ice-white font-semibold text-sm">{t.name}</div>
                    <div className="text-slate text-xs mt-0.5">{t.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-gold w-6' : 'bg-slate/40 hover:bg-slate/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
