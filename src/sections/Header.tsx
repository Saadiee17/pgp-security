import { useState, useEffect, useRef } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import gsap from 'gsap'
import ThemeToggle from '@/components/ThemeToggle'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '#why-choose' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        y: isScrolled ? 0 : -100,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }, [isScrolled])

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileOpen) {
        gsap.to(mobileMenuRef.current, {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.3,
        })
        const links = mobileMenuRef.current.querySelectorAll('.mobile-link')
        gsap.fromTo(links, 
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

  const scrollTo = (href: string) => {
    setIsMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 translate-y-[-100%]"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          background: 'rgb(var(--c-deep-navy) / 0.85)',
          borderBottom: '1px solid rgb(var(--c-ice-white) / var(--c-border-alpha))',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-gold font-bold text-xl tracking-tight">PGP</span>
            <span className="bg-gold text-gold-ink text-[10px] font-semibold px-3 py-1 rounded-full tracking-widest uppercase">
              Since 1985
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-slate hover:text-ice-white text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle compact />
            <button
              onClick={() => scrollTo('#contact')}
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
        className="fixed inset-0 z-40 opacity-0 pointer-events-none md:hidden flex flex-col items-center justify-center gap-8"
        style={{
          background: 'rgb(var(--c-deep-navy) / 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => scrollTo(link.href)}
            className="mobile-link text-ice-white text-2xl font-semibold hover:text-gold transition-colors"
          >
            {link.label}
          </button>
        ))}
        <div className="mobile-link flex flex-col gap-3 mt-4 w-[200px]">
          <button
            onClick={() => scrollTo('#contact')}
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
