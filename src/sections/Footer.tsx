import { Link } from 'react-router'
import { Facebook, Youtube } from 'lucide-react'

function XIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Locations', to: '/locations' },
  { label: 'Contact', to: '/contact' },
  { label: 'Careers', to: '/careers' },
]

const serviceLinks = [
  { label: 'Armed Guards', to: '/services/armed-guards' },
  { label: 'Unarmed Guards', to: '/services/unarmed-guards' },
  { label: 'Patrol Services', to: '/services/patrol-services' },
  { label: 'Alarm Response', to: '/services/alarm-response' },
  { label: 'Temporary Security', to: '/services/temporary-security' },
]

export default function Footer() {
  return (
    <footer
      className="w-full pt-16 sm:pt-20 pb-8 border-t border-border-subtle"
      style={{
        background:
          'linear-gradient(180deg, rgb(var(--c-midnight)) 0%, rgb(var(--c-deep-navy)) 100%)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12 text-center sm:text-left">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              {/* Light mode turns the footer cream-colored, which washes out the
                  gold logo. Set it on a dark navy plaque with a hairline gold
                  border so the mark reads as a premium brand crest. In dark mode
                  the footer is already navy, so the plaque is removed. */}
              <div className="inline-flex rounded-2xl bg-gold-ink p-5 ring-1 ring-gold/25 shadow-lg shadow-gold-ink/25 transition-shadow hover:shadow-gold-glow dark:bg-transparent dark:p-0 dark:ring-0 dark:shadow-none dark:hover:shadow-none">
                <img
                  src="./pgp-logo-gold.webp"
                  alt="Professional Guard & Patrol, Inc. Proudly Serving Houston Since 1985"
                  className="h-24 w-auto object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-4">
              NAVIGATION
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-slate text-sm hover:text-ice-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-4">
              OUR SERVICES
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-slate text-sm hover:text-ice-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-4">
              CONTACT US
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-slate">
                425 Aldine Bender Rd., Suite E<br />
                Houston, TX 77060
              </p>
              <a href="tel:2814484900" className="block text-ice-white hover:text-gold transition-colors">
                (281) 448-4900
              </a>
              <a href="tel:8774484904" className="block text-slate hover:text-gold transition-colors">
                Toll-Free: (877) 448-4904
              </a>
              <p className="text-slate text-xs mt-2">24/7 Dispatch</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
              <a
                href="https://www.facebook.com/Professional-Guard-and-Patrol-Inc-452144301829618/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PGP Security on Facebook"
                className="text-slate hover:text-gold transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com/pgpinc1985"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PGP Security on X (Twitter)"
                className="text-slate hover:text-gold transition-colors"
              >
                <XIcon size={20} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCC8DgvJU5mVR3dGZlLUTcbw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PGP Security on YouTube"
                className="text-slate hover:text-gold transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate font-mono text-xs">
            2025 Professional Guard & Patrol, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/contact" className="text-slate hover:text-ice-white transition-colors">Privacy Policy</Link>
            <span className="text-slate/40">|</span>
            <Link to="/contact" className="text-slate hover:text-ice-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
