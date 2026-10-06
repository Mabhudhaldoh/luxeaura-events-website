/**
 * Client-side validation helpers.
 *
 * Deliberately dependency-free and shared between the enquiry form and the
 * newsletter signup so the rules and messaging stay consistent.
 */

export const validators = {
  required: (value) => (value?.trim() ? '' : 'This field is required.'),

  name: (value) => {
    const trimmed = value?.trim() ?? ''
    if (!trimmed) return 'Please tell us your name.'
    if (trimmed.length < 2) return 'Please enter your full name.'
    return ''
  },

  email: (value) => {
    const trimmed = value?.trim() ?? ''
    if (!trimmed) return 'Please enter your email address.'
    // Practical check: something@something.tld
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      return 'Please enter a valid email address.'
    }
    return ''
  },

  /** Optional field — only validated when the visitor fills it in. */
  phone: (value) => {
    const trimmed = value?.trim() ?? ''
    if (!trimmed) return ''
    const digits = trimmed.replace(/[^\d]/g, '')
    if (digits.length < 7) return 'Please enter a valid phone number.'
    if (digits.length > 15) return 'Please enter a valid phone number.'
    return ''
  },

  /** Optional long-form field, but length-capped to keep enquiries focused. */
  message: (value, { min = 20 } = {}) => {
    const trimmed = value?.trim() ?? ''
    if (!trimmed) return 'Please tell us a little about your vision.'
    if (trimmed.length < min) {
      return `Please add a little more detail — at least ${min} characters.`
    }
    return ''
  },

  date: (value) => {
    const trimmed = value?.trim() ?? ''
    if (!trimmed) return ''
    const chosen = new Date(`${trimmed}T00:00:00`)
    if (Number.isNaN(chosen.getTime())) return 'Please enter a valid date.'
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (chosen < today) return 'Please choose a date in the future.'
    return ''
  },

  /** Dropdown-style inputs arrive as values from a <select>. */
  selection: (value) => (value?.trim() ? '' : 'Please select an option.'),

  guestCount: (value) => {
    const trimmed = value?.trim() ?? ''
    if (!trimmed) return ''
    const parsed = Number(trimmed)
    if (!Number.isFinite(parsed) || parsed < 1) return 'Please enter a realistic guest count.'
    if (parsed > 5000) return 'For events above 5,000 guests please call us.'
    return ''
  },
}

/** Validate a values object against a schema map of `field -> validator`. */
export function validate(values, schema) {
  const errors = {}

  for (const [field, rule] of Object.entries(schema)) {
    const error = rule(values[field], values)
    if (error) errors[field] = error
  }

  return errors
}

/** Simulate an async submission so pending / success states can be exercised. */
export function submitEnquiry(payload) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({ ok: true, reference: payload })
    }, 1100)
  })
}
