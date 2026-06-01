import { Outlet } from 'react-router'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { AssessmentProvider } from '@/components/AssessmentModal'

export default function Layout() {
  return (
    <AssessmentProvider>
      <div className="relative min-h-screen bg-deep-navy">
        <ScrollToTop />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </AssessmentProvider>
  )
}
