import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router'
import { Menu, X, Phone } from 'lucide-react'
import gsap from 'gsap'
import ThemeToggle from '@/components/ThemeToggle'
import { useAssessment } from '@/components/AssessmentModal'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Locations', to: '/locations' },
  { label: 'Contact', to: '/contact' },
  { label: 'Careers', to: '/careers' },
]

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const { open: openAssessment } = useAssessment()

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileOpen) {
        gsap.to(mobileMenuRef.current, {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.3,
        })
        const links = mobileMenuRef.current.querySelectorAll('.mobile-link')
        gsap.fromTo(
          links,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: 'power3.out', delay: 0.1 }
        )
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.3,
        })
      }
    }
  }, [isMobileOpen])

  const handleGetQuote = () => {
    setIsMobileOpen(false)
    openAssessment()
  }

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          // Theme-adaptive liquid frosted glass: the tint follows the theme
          // (light/cream in light, navy in dark) via --c-deep-navy, while heavy
          // blur + saturation + a specular top highlight give the glass feel.
          background:
            'linear-gradient(180deg, rgba(14,22,38,0.14) 0%, rgba(14,22,38,0.11) 100%), ' +
            'linear-gradient(180deg, rgb(var(--c-deep-navy) / 0.82) 0%, rgb(var(--c-deep-navy) / 0.68) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgb(var(--c-gold) / 0.28)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.28), 0 10px 30px -18px rgba(0,0,0,0.35)',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-[78px] md:h-[92px] flex items-center justify-between">
          {/* Logo — gold in both themes. Drop-shadow gives the metallic mark
              crisp edge definition on the light frosted bar (harmless on dark). */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="./pgp-logo-gold.webp"
              alt="Professional Guard & Patrol, Inc. — Proudly Serving Houston Since 1985"
              className="h-[58px] lg:h-[60px] xl:h-[68px] w-auto object-contain [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.55))_drop-shadow(0_2px_4px_rgba(0,0,0,0.35))]"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-[15px] font-medium transition-colors duration-200 ${
                    isActive ? 'text-[#7a5f1c] dark:text-[#E2C079]' : 'text-slate hover:text-ice-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            <ThemeToggle compact />
            <button
              onClick={handleGetQuote}
              className="whitespace-nowrap border border-border-subtle text-ice-white px-5 py-2.5 rounded-lg text-[15px] font-medium hover:border-gold hover:bg-gold/10 transition-all duration-200"
            >
              Get Quote
            </button>
            <a
              href="tel:2814484900"
              className="whitespace-nowrap bg-gold text-gold-ink px-5 py-2.5 rounded-lg text-[15px] font-semibold hover:bg-gold-light hover:scale-[1.02] transition-all duration-200 flex items-center gap-2"
            >
              <Phone size={16} />
              Call Now
            </a>
          </div>

          {/* Mobile / tablet controls */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle compact />
            <button
              className="text-ice-white p-2"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 opacity-0 pointer-events-none lg:hidden flex flex-col items-center justify-center gap-6"
        style={{
          background:
            'linear-gradient(180deg, rgb(var(--c-deep-navy) / 0.92) 0%, rgb(var(--c-deep-navy) / 0.86) 100%)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            end={link.to === '/'}
            onClick={() => setIsMobileOpen(false)}
            className={({ isActive }) =>
              `mobile-link text-[26px] font-semibold transition-colors ${
                isActive ? 'text-[#7a5f1c] dark:text-[#E2C079]' : 'text-ice-white hover:text-gold'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <div className="mobile-link flex flex-col gap-3 mt-4 w-[220px]">
          <button
            onClick={handleGetQuote}
            className="border border-gold text-[#7a5f1c] dark:text-[#E2C079] px-6 py-3 rounded-lg text-base font-medium"
          >
            Get Quote
          </button>
          <a
            href="tel:2814484900"
            className="bg-gold text-gold-ink px-6 py-3 rounded-lg text-base font-semibold text-center flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            Call Now
          </a>
        </div>
      </div>
    </>
  )
}
