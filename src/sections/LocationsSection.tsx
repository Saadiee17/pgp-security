import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router'
import { MapPin } from 'lucide-react'
import HoustonMap from '@/components/HoustonMap'

gsap.registerPlugin(ScrollTrigger)

const cities = [
  { name: 'Houston',       slug: 'houston' },
  { name: 'Katy',          slug: 'katy' },
  { name: 'Sugar Land',    slug: 'sugar-land' },
  { name: 'The Woodlands', slug: 'the-woodlands' },
  { name: 'Pearland',      slug: 'pearland' },
  { name: 'Cypress',       slug: 'cypress' },
  { name: 'Spring',        slug: 'spring' },
  { name: 'Pasadena',      slug: 'pasadena' },
]

export default function LocationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.anim-el'),
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="w-full py-12 lg:py-16 bg-deep-navy relative overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="anim-el block text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
            SERVICE AREA
          </span>
          <h2 className="anim-el text-ice-white text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4 opacity-0">
            Serving Greater Houston
          </h2>
          <p className="anim-el text-slate text-base sm:text-lg max-w-[540px] mx-auto opacity-0">
            PGP Security covers Houston and the surrounding metro, with fast response anywhere in the region.
          </p>
        </div>

        {/* Map */}
        <div className="anim-el opacity-0 mb-10 rounded-2xl overflow-hidden border border-border-subtle">
          <HoustonMap height={280} />
        </div>

        {/* City grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {cities.map((city, i) => (
            <Link
              key={i}
              to={`/locations/${city.slug}`}
              className="anim-el opacity-0 flex items-center gap-2.5 bg-midnight border border-border-subtle rounded-xl px-4 py-3 text-slate hover:text-ice-white hover:border-gold/40 hover:bg-deep-navy transition-all duration-200 group"
            >
              <MapPin size={14} className="text-gold flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">{city.name}</span>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="anim-el opacity-0 text-center">
          <Link
            to="/locations"
            className="inline-block border border-ice-white/30 text-ice-white px-8 py-3.5 rounded-lg font-medium text-sm hover:border-gold hover:text-gold transition-all duration-200"
          >
            View All Locations
          </Link>
        </div>
      </div>
    </section>
  )
}
