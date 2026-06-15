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
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          // Theme-adaptive surface: light (cream) in light theme, navy in dark.
          // The logo gets a dark "plate" below so the metallic mark keeps
          // contrast even on the light bar; all header text is dark-on-light.
          background: 'rgb(var(--c-deep-navy) / 0.92)',
          borderBottom: '1px solid rgb(var(--c-gold) / 0.3)',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-[78px] md:h-[92px] flex items-center justify-between">
          {/* Logo — gold (light theme) / silver (dark theme) */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="./pgp-logo-gold.webp"
              alt="Professional Guard & Patrol, Inc. — Proudly Serving Houston Since 1985"
              className="h-[58px] lg:h-[60px] xl:h-[68px] w-auto object-contain block dark:hidden"
            />
            <img
              src="./pgp-logo-silver.webp"
              alt="Professional Guard & Patrol, Inc. — Proudly Serving Houston Since 1985"
              className="h-[58px] lg:h-[60px] xl:h-[68px] w-auto object-contain hidden dark:block"
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
                    isActive ? 'text-[#7a5f1c] dark:text-gold' : 'text-slate hover:text-ice-white'
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
          background: 'rgb(var(--c-deep-navy) / 0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
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
                isActive ? 'text-[#7a5f1c] dark:text-gold' : 'text-ice-white hover:text-gold'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <div className="mobile-link flex flex-col gap-3 mt-4 w-[220px]">
          <button
            onClick={handleGetQuote}
            className="border border-gold text-[#7a5f1c] dark:text-gold px-6 py-3 rounded-lg text-base font-medium"
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
