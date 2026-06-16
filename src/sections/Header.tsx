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
          // Frosted "smoked glass" bar in both themes: translucent dark tint +
          // blur lets the page show through subtly, while staying dark enough to
          // make the gold logo and light text pop (gold needs a dark backing).
          background:
            'linear-gradient(180deg, rgba(9,17,31,0.88) 0%, rgba(9,17,31,0.80) 100%)',
          backdropFilter: 'blur(16px) saturate(150%)',
          WebkitBackdropFilter: 'blur(16px) saturate(150%)',
          borderBottom: '1px solid rgb(var(--c-gold) / 0.3)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.05), 0 10px 30px -14px rgba(0,0,0,0.5)',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-[78px] md:h-[92px] flex items-center justify-between">
          {/* Logo — gold in both themes (client request) */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="./pgp-logo-gold.webp"
              alt="Professional Guard & Patrol, Inc. — Proudly Serving Houston Since 1985"
              className="h-[58px] lg:h-[60px] xl:h-[68px] w-auto object-contain"
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
                    isActive ? 'text-[#E2C079]' : 'text-[#C9D2E0] hover:text-white'
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
              className="whitespace-nowrap border border-white/30 text-white px-5 py-2.5 rounded-lg text-[15px] font-medium hover:border-[#E2C079] hover:text-[#E2C079] hover:bg-white/5 transition-all duration-200"
            >
              Get Quote
            </button>
            <a
              href="tel:2814484900"
              className="whitespace-nowrap bg-[#C8A45E] text-[#0A1628] px-5 py-2.5 rounded-lg text-[15px] font-semibold hover:bg-[#d8b97a] hover:scale-[1.02] transition-all duration-200 flex items-center gap-2"
            >
              <Phone size={16} />
              Call Now
            </a>
          </div>

          {/* Mobile / tablet controls */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle compact />
            <button
              className="text-white p-2"
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
            'linear-gradient(180deg, rgba(9,17,31,0.94) 0%, rgba(9,17,31,0.90) 100%)',
          backdropFilter: 'blur(22px) saturate(150%)',
          WebkitBackdropFilter: 'blur(22px) saturate(150%)',
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
                isActive ? 'text-[#E2C079]' : 'text-white hover:text-[#E2C079]'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <div className="mobile-link flex flex-col gap-3 mt-4 w-[220px]">
          <button
            onClick={handleGetQuote}
            className="border border-[#E2C079] text-[#E2C079] px-6 py-3 rounded-lg text-base font-medium"
          >
            Get Quote
          </button>
          <a
            href="tel:2814484900"
            className="bg-[#C8A45E] text-[#0A1628] px-6 py-3 rounded-lg text-base font-semibold text-center flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            Call Now
          </a>
        </div>
      </div>
    </>
  )
}
