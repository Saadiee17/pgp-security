import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { submitToWeb3Forms } from '@/lib/web3forms'

const serviceOptions = [
  'Armed Guards',
  'Unarmed Guards',
  'Patrol Services',
  'Alarm Response',
  'Temporary Security',
  'Other / Not Sure',
]

type AssessmentContextValue = {
  /** Open the assessment form. Pass a service name to preselect it. */
  open: (presetService?: string) => void
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null)

/**
 * Site-wide "Request a Free Security Assessment" modal. Any button can open it
 * via `useAssessment().open()`. After submit the dialog swaps to a success
 * confirmation. Single source of truth so every "Free Assessment" / "Get Quote"
 * CTA opens the same form.
 */
export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    company: '',
    message: '',
  })

  const open = useCallback((presetService?: string) => {
    setSubmitted(false)
    setError('')
    setForm((f) => ({ ...f, service: presetService ?? f.service }))
    setIsOpen(true)
  }, [])

  const handleOpenChange = useCallback((next: boolean) => {
    setIsOpen(next)
    // Reset the success screen after the close animation so it doesn't flash
    // back on the next open.
    if (!next) {
      window.setTimeout(() => setSubmitted(false), 250)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const result = await submitToWeb3Forms(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        company: form.company,
        message: form.message,
      },
      {
        subject: 'New Security Assessment Request — PGP Website',
        from_name: 'PGP Security Website',
      },
    )

    setSubmitting(false)
    if (result.success) {
      setSubmitted(true)
    } else {
      setError(result.message)
    }
  }

  const value = useMemo<AssessmentContextValue>(() => ({ open }), [open])

  const inputClass =
    'w-full bg-white/5 border border-border-subtle rounded-lg px-4 py-3 text-ice-white placeholder-slate text-sm focus:border-gold focus:ring-2 focus:ring-gold/15 focus:outline-none transition-all duration-200'

  return (
    <AssessmentContext.Provider value={value}>
      {children}

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="bg-midnight border-border-subtle text-ice-white sm:max-w-lg p-0 overflow-hidden">
          {submitted ? (
            <div className="flex flex-col items-center text-center px-6 py-12 sm:px-10">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-6">
                <CheckCircle2 size={34} className="text-gold" />
              </div>
              <DialogHeader className="items-center text-center">
                <DialogTitle className="text-ice-white text-2xl font-semibold">
                  Request Submitted
                </DialogTitle>
                <DialogDescription className="text-slate text-sm sm:text-base max-w-[380px] mt-2">
                  Thank you, {form.name ? form.name.split(' ')[0] : 'there'}. Your
                  free security assessment request has been received. A PGP
                  specialist will contact you within 24 hours.
                </DialogDescription>
              </DialogHeader>
              <button
                onClick={() => handleOpenChange(false)}
                className="mt-8 bg-gold text-gold-ink px-8 py-3 rounded-lg font-semibold text-sm hover:bg-gold-light transition-colors duration-200"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="px-6 py-7 sm:px-8">
              <DialogHeader>
                <div className="flex items-center gap-2 text-gold text-sm font-semibold tracking-[0.1em] uppercase mb-1">
                  <ShieldCheck size={14} />
                  Free · No Obligation
                </div>
                <DialogTitle className="text-ice-white text-2xl font-semibold tracking-tight">
                  Request a Free Security Assessment
                </DialogTitle>
                <DialogDescription className="text-slate text-sm">
                  Tell us about your site and our team will respond within 24
                  hours with a tailored plan.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                {/* Honeypot — bots fill this; humans never see it. */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className={inputClass}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    className={inputClass}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  <select
                    className={inputClass + ' appearance-none cursor-pointer'}
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    <option value="" className="bg-midnight text-ice-white">
                      Select Service Type
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-midnight text-ice-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Company Name (Optional)"
                  className={inputClass}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
                <textarea
                  placeholder="Tell us about your security needs..."
                  rows={3}
                  className={inputClass + ' resize-none'}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {error && (
                  <p className="text-red-400 text-sm" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gold text-gold-ink py-3.5 rounded-lg font-semibold text-sm hover:bg-gold-light hover:scale-[1.01] transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AssessmentContext.Provider>
  )
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext)
  if (!ctx) {
    throw new Error('useAssessment must be used within an AssessmentProvider')
  }
  return ctx
}
