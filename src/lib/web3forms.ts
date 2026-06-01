// Shared Web3Forms submission helper used by every form on the site
// (Contact, the site-wide Assessment modal, and the Careers application).
//
// Web3Forms is a backendless form API for static sites: you POST your fields
// plus a public `access_key` and it emails them to you. The access key is
// designed to live in client code, but we read it from an env var so it's easy
// to swap per environment. Set VITE_WEB3FORMS_ACCESS_KEY in `.env.local`.
//
// Docs: https://docs.web3forms.com

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

const ENDPOINT = 'https://api.web3forms.com/submit'

export interface Web3FormsResult {
  success: boolean
  message: string
}

export interface SubmitOptions {
  /** Email subject line. */
  subject?: string
  /** Sender name shown in the notification email. */
  from_name?: string
  /** Optional file attachment (e.g. a résumé). Forces multipart submission. */
  file?: File | null
}

/**
 * Submit a set of fields to Web3Forms. Returns `{ success, message }` rather
 * than throwing, so callers can show inline error UI. When a `file` is passed
 * the request is sent as multipart/form-data so the attachment comes through;
 * otherwise it's sent as JSON.
 */
export async function submitToWeb3Forms(
  fields: Record<string, string | undefined>,
  options: SubmitOptions = {},
): Promise<Web3FormsResult> {
  if (!ACCESS_KEY) {
    return {
      success: false,
      message:
        'This form is not configured yet. Add VITE_WEB3FORMS_ACCESS_KEY to your environment.',
    }
  }

  // Drop empty/undefined values so optional fields don't clutter the email.
  const clean = Object.fromEntries(
    Object.entries(fields).filter(([, v]) => v != null && v !== ''),
  ) as Record<string, string>

  try {
    let response: Response

    if (options.file) {
      const body = new FormData()
      body.append('access_key', ACCESS_KEY)
      if (options.subject) body.append('subject', options.subject)
      if (options.from_name) body.append('from_name', options.from_name)
      Object.entries(clean).forEach(([k, v]) => body.append(k, v))
      body.append('attachment', options.file)
      response = await fetch(ENDPOINT, { method: 'POST', body })
    } else {
      response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: options.subject,
          from_name: options.from_name,
          ...clean,
        }),
      })
    }

    const data = (await response.json()) as { success?: boolean; message?: string }
    return {
      success: Boolean(data.success),
      message: data.message ?? 'Something went wrong. Please try again.',
    }
  } catch {
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    }
  }
}
