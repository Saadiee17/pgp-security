import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, ArrowRight } from 'lucide-react'
import HoustonMap from '@/components/HoustonMap'
import CTABanner from '@/sections/CTABanner'

gsap.registerPlugin(ScrollTrigger)

const cities = [
  { name: 'Houston',        slug: 'houston',        blurb: 'Greater Houston business district & downtown coverage' },
  { name: 'Katy',           slug: 'katy',           blurb: 'West Houston suburbs & Energy Corridor support' },
  { name: 'Sugar Land',     slug: 'sugar-land',     blurb: 'Fort Bend County commercial & residential security' },
  { name: 'The Woodlands',  slug: 'the-woodlands',  blurb: 'North Houston master-planned community coverage' },
  { name: 'Pearland',       slug: 'pearland',       blurb: 'South Houston industrial & residential patrols' },
  { name: 'Cypress',        slug: 'cypress',        blurb: 'Northwest Harris County business park security' },
  { name: 'Spring',         slug: 'spring',         blurb: 'North Harris County commercial & event security' },
  { name: 'Pasadena',       slug: 'pasadena',       blurb: 'East Houston industrial & petrochemical facility guards' },
  { name: 'League City',    slug: 'league-city',    blurb: 'Galveston County corridor & marina security' },
  { name: 'Friendswood',    slug: 'friendswood',    blurb: 'South Houston residential community patrol services' },
  { name: 'Missouri City',  slug: 'missouri-city',  blurb: 'Southwest Houston mixed-use development coverage' },
  { name: 'Tomball',        slug: 'tomball',        blurb: 'Northwest Houston rural & commercial property security' },
  { name: 'Conroe',         slug: 'conroe',         blurb: 'Montgomery County industrial & event guard services' },
  { name: 'Humble',         slug: 'humble',         blurb: 'IAH airport corridor & northeast Houston coverage' },
]

export default function Locations() {
  const heroRef  = useRef<HTMLDivElement>(null)
  const mapRef   = useRef<HTMLDivElement>(null)
  const gridRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current || !mapRef.current || !gridRef.current) return

    gsap.fromTo(
      heroRef.current.querySelectorAll('.anim-el'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: heroRef.current, start: 'top 85%' } }
    )

    gsap.fromTo(
      mapRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: mapRef.current, start: 'top 80%' } }
    )

    gsap.fromTo(
      gridRef.current.querySelectorAll('.city-card'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' } }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (
          st.trigger === heroRef.current ||
          st.trigger === mapRef.current ||
          st.trigger === gridRef.current
        ) st.kill()
      })
    }
  }, [])

  return (
    <div className="bg-deep-navy min-h-screen">
      {/* Hero */}
      <section ref={heroRef} className="w-full pt-[150px] pb-24 border-b border-border-subtle relative overflow-hidden">
        {/* Background video + scrim */}
        <div className="absolute inset-0">
          <video
            src="/locations-1.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
          {/* Light, near-even veil (centered text) so the video stays clear like the other heroes. */}
          <div className="absolute inset-0 bg-deep-navy/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/15 via-transparent to-deep-navy/25" />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 relative z-10 text-center">
          <span className="anim-el opacity-0 inline-block text-gold text-sm font-semibold tracking-[0.12em] uppercase mb-5">
            SERVICE AREA
          </span>
          <h1 className="anim-el opacity-0 text-ice-white text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6">
            Locations We Serve
          </h1>
          <p className="anim-el opacity-0 text-slate text-base sm:text-lg max-w-[600px] mx-auto leading-relaxed">
            PGP Security provides professional guard and patrol services across the Greater Houston
            metro, from downtown to the outer suburbs, with fast response times throughout the region.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="w-full py-16 bg-deep-navy">
        <div className="max-w-[1280px] mx-auto px-6">
          <div ref={mapRef} className="opacity-0 rounded-2xl overflow-hidden border border-border-subtle">
            <HoustonMap height={420} />
          </div>
        </div>
      </section>

      {/* City Grid */}
      <section className="w-full pb-20 bg-deep-navy">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-ice-white text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
              Cities &amp; Coverage Areas
            </h2>
            <p className="text-slate text-sm sm:text-base max-w-[480px] mx-auto">
              Click any city to learn more about PGP Security services in that area.
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/locations/${city.slug}`}
                className="city-card opacity-0 flex flex-col gap-2 bg-midnight border border-border-subtle rounded-xl px-4 py-4 hover:border-gold/40 hover:bg-deep-navy transition-all duration-200 group"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gold flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-ice-white text-sm font-semibold">{city.name}</span>
                </div>
                <p className="text-slate text-xs leading-snug">{city.blurb}</p>
              </Link>
            ))}
          </div>

          {/* Don't see your area callout */}
          <div className="border border-border-subtle rounded-2xl bg-midnight px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-ice-white text-lg font-semibold mb-1">Don't see your area?</h3>
              <p className="text-slate text-sm">
                We may still be able to cover your location. Reach out and we'll confirm availability.
              </p>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 flex items-center gap-2 bg-gold text-gold-ink px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gold-light transition-all duration-200 group"
            >
              Contact Us
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  )
}
