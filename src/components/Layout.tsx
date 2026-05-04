import { Outlet } from 'react-router'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-deep-navy">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
