import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HardHat, Building2, Home, Factory, CalendarDays, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// `span` controls each tile's footprint in the lg bento grid (3 cols × 3 rows).
// Construction is the 2×2 hero tile; Industrial is a 2×1 wide tile; the rest
// are 1×1. Together they tile a perfect 3×3 with no gaps.
const industries = [
  {
    name: 'Construction',
    description: 'Material and equipment protection, vandalism prevention, and access control for active job sites.',
    image: '/industry-industrial.webp',
    icon: HardHat,
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    name: 'Commercial',
    description: 'Premises protection, access control, and surveillance for offices, retail, and business parks.',
    image: '/images/20260512_113621.webp',
    icon: Building2,
    span: 'lg:col-span-1 lg:row-span-1',
  },
  {
    name: 'Residential',
    description: 'Community patrols, gated entry management, and residential security for neighborhoods.',
    image: '/industry-residential.webp',
    icon: Home,
    span: 'lg:col-span-1 lg:row-span-1',
  },
  {
    name: 'Industrial',
    description: 'Inventory monitoring, theft prevention, and site surveillance for warehouses and logistics facilities.',
    image: '/industry-industrial.webp',
    icon: Factory,
    span: 'lg:col-span-2 lg:row-span-1',
  },
  {
    name: 'Events',
    description: 'Crowd control, access management, and emergency response for concerts, conferences, and gatherings.',
    image: '/images/20260512_150918.webp',
    icon: CalendarDays,
    span: 'lg:col-span-1 lg:row-span-1',
  },
]

export default function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return

    const grid = gridRef.current
    const cards = grid.querySelectorAll('.industry-card')

    gsap.fromTo(
      headerRef.current?.querySelectorAll('.anim-el') || [],
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
      }
    )

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.6,
        scrollTrigger: { trigger: grid, start: 'top 80%' },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.trigger === sectionRef.current ||
          st.trigger === gridRef.current ||
          st.trigger === headerRef.current
        ) {
          st.kill(true)
        }
      })
    }
  }, [])

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="section-texture w-full py-12 lg:py-16 bg-midnight overflow-hidden"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-[1280px] mx-auto px-6 mb-10 lg:mb-12 text-center">
        <span className="anim-el block text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-4 opacity-0">
          INDUSTRIES WE SERVE
        </span>
        <h2 className="anim-el text-ice-white text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4 opacity-0">
          Protection Across<br className="hidden sm:block" /> Every Sector
        </h2>
        <p className="anim-el text-slate text-base sm:text-lg max-w-[600px] mx-auto opacity-0">
          Specialized security solutions tailored to the unique challenges of your industry.
        </p>
      </div>

      {/* Bento grid — single column on mobile, 2-up on small screens, and an
          asymmetric 3×3 bento on desktop where Construction is the hero tile. */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[clamp(180px,22vw,260px)] gap-5 lg:gap-6 max-w-[1280px] mx-auto px-6"
      >
        {industries.map((industry, i) => (
          <Link
            key={i}
            to="/industries"
            className={`industry-card group relative w-full h-[280px] sm:h-[320px] lg:h-auto rounded-2xl overflow-hidden cursor-pointer ${industry.span}`}
          >
            {/* Background Image */}
            <img
              src={industry.image}
              alt={industry.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient Overlay — stronger bottom band so subtext stays readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,12,24,0.98)] from-0% via-[rgba(10,22,40,0.85)] via-40% to-transparent to-75%" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                {industry.name}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed mb-4 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                {industry.description}
              </p>
              <span className="inline-flex items-center gap-2 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Learn More <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
