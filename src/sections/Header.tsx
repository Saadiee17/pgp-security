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
          background: 'rgb(var(--c-deep-navy) / 0.85)',
          borderBottom: '1px solid rgb(var(--c-ice-white) / var(--c-border-alpha))',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="./pgp-logo.webp"
              alt="PGP Security, Serving Since 1985"
              className="h-14 w-auto object-contain block dark:hidden"
            />
            <img
              src="./pgp-logo-dark.webp"
              alt="PGP Security, Serving Since 1985"
              className="h-14 w-auto object-contain hidden dark:block"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-gold' : 'text-slate hover:text-ice-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle compact />
            <button
              onClick={handleGetQuote}
              className="border border-border-subtle text-ice-white px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gold hover:text-gold transition-all duration-200"
            >
              Get Quote
            </button>
            <a
              href="tel:2814484900"
              className="bg-gold text-gold-ink px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gold-light hover:scale-[1.02] transition-all duration-200 flex items-center gap-2"
            >
              <Phone size={14} />
              Call Now
            </a>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle compact />
            <button
              className="text-ice-white p-2"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 opacity-0 pointer-events-none md:hidden flex flex-col items-center justify-center gap-6"
        style={{
          background: 'rgb(var(--c-deep-navy) / 0.96)',
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
              `mobile-link text-2xl font-semibold transition-colors ${
                isActive ? 'text-gold' : 'text-ice-white hover:text-gold'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <div className="mobile-link flex flex-col gap-3 mt-4 w-[200px]">
          <button
            onClick={handleGetQuote}
            className="border border-gold text-gold px-6 py-3 rounded-lg text-base font-medium"
          >
            Get Quote
          </button>
          <a
            href="tel:2814484900"
            className="bg-gold text-gold-ink px-6 py-3 rounded-lg text-base font-semibold text-center flex items-center justify-center gap-2"
          >
            <Phone size={16} />
            Call Now
          </a>
        </div>
      </div>
    </>
  )
}
