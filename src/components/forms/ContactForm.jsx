import { useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { validate, validators, submitEnquiry } from '../../utils/validation'
import { maxEventDateIso, todayIso } from '../../utils/format'
import styles from './ContactForm.module.css'

const EVENT_TYPES = [
  'Luxury Wedding',
  'Corporate Event',
  'Private Celebration',
  'Product Launch',
  'Gala Dinner',
  'Other',
]

const BUDGET_RANGES = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $40,000',
  '$40,000 – $80,000',
  '$80,000+',
  'Not sure yet',
]

const GUEST_COUNTS = [
  'Under 50',
  '50 – 150',
  '150 – 300',
  '300 – 600',
  '600+',
]

const INITIAL_VALUES = {
  fullName: '',
  email: '',
  phone: '',
  eventType: '',
  eventDate: '',
  guestCount: '',
  budget: '',
  vision: '',
}

/** Which validator applies to each field. */
const SCHEMA = {
  fullName: validators.name,
  email: validators.email,
  phone: validators.phone,
  eventType: validators.selection,
  eventDate: validators.date,
  guestCount: validators.selection,
  budget: validators.selection,
  vision: validators.message,
}

/**
 * Enquiry form.
 *
 * Client-side only: values are validated in the browser, then handed to
 * `submitEnquiry`, which is the single seam to replace with a real endpoint
 * (Formspree, a serverless function, your own API). No credentials are shipped
 * in the bundle.
 */
export default function ContactForm() {
  const formId = useId()
  const formRef = useRef(null)

  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | pending | success | error
  const [summary, setSummary] = useState('')

  const fieldId = (name) => `${formId}-${name}`

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))

    // Once a field has been visited, re-validate it live.
    if (touched[name]) {
      const error = SCHEMA[name]?.(value, values) ?? ''
      setErrors((current) => ({ ...current, [name]: error }))
    }
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    setTouched((current) => ({ ...current, [name]: true }))
    setErrors((current) => ({ ...current, [name]: SCHEMA[name]?.(value, values) ?? '' }))
  }

  const focusFirstError = (nextErrors) => {
    const firstInvalid = Object.keys(nextErrors)[0]
    if (!firstInvalid) return
    formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate(values, SCHEMA)
    setErrors(nextErrors)
    setTouched(Object.fromEntries(Object.keys(SCHEMA).map((key) => [key, true])))

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      setSummary(
        `We could not send your enquiry: ${Object.keys(nextErrors).length} field${
          Object.keys(nextErrors).length === 1 ? '' : 's'
        } need attention.`,
      )
      focusFirstError(nextErrors)
      return
    }

    setStatus('pending')
    setSummary('')

    try {
      await submitEnquiry(values)
      setStatus('success')
      setValues(INITIAL_VALUES)
      setTouched({})
      setErrors({})
      window.setTimeout(() => setStatus('idle'), 9000)
    } catch {
      setStatus('error')
      setSummary('Something went wrong sending your enquiry. Please email us directly and we will respond within one business day.')
    }
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Summary announces the overall result of a submission. */}
      <div
        className={`${styles.summary} ${status === 'success' ? styles.summarySuccess : ''} ${
          status === 'error' ? styles.summaryError : ''
        }`}
        /* An error must interrupt; a confirmation may wait its turn. */
        role={status === 'error' ? 'alert' : 'status'}
        aria-live={status === 'error' ? 'assertive' : 'polite'}
        hidden={status !== 'error' && status !== 'success'}
      >
        {status === 'success'
          ? 'Thank you. Your enquiry has been received — we will reply within one business day.'
          : summary}
      </div>

      {/* --- Row 1 -------------------------------------------------------- */}
      <div className={styles.row}>
        <Field
          id={fieldId('fullName')}
          name="fullName"
          label="Full Name"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
          autoComplete="name"
          required
        />
        <Field
          id={fieldId('email')}
          name="email"
          type="email"
          label="Email Address"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          autoComplete="email"
          inputMode="email"
          required
        />
      </div>

      {/* --- Row 2 -------------------------------------------------------- */}
      <div className={styles.row}>
        <Field
          id={fieldId('phone')}
          name="phone"
          type="tel"
          label="Phone Number"
          hint="Optional"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          autoComplete="tel"
          inputMode="tel"
        />
        <SelectField
          id={fieldId('eventType')}
          name="eventType"
          label="Event Type"
          value={values.eventType}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.eventType}
          options={EVENT_TYPES}
          placeholder="Select an event type"
          required
        />
      </div>

      {/* --- Row 3 -------------------------------------------------------- */}
      <div className={styles.row}>
        <Field
          id={fieldId('eventDate')}
          name="eventDate"
          type="date"
          label="Preferred Event Date"
          hint="Approximate is fine"
          value={values.eventDate}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.eventDate}
          min={todayIso()}
          max={maxEventDateIso()}
        />
        <SelectField
          id={fieldId('guestCount')}
          name="guestCount"
          label="Estimated Guest Count"
          value={values.guestCount}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.guestCount}
          options={GUEST_COUNTS}
          placeholder="Select a range"
        />
      </div>

      {/* --- Row 4 -------------------------------------------------------- */}
      <SelectField
        id={fieldId('budget')}
        name="budget"
        label="Budget Range"
        hint="USD, styling only"
        value={values.budget}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.budget}
        options={BUDGET_RANGES}
        placeholder="Select a range"
      />

      {/* --- Message ------------------------------------------------------ */}
      <TextareaField
        id={fieldId('vision')}
        name="vision"
        label="Tell Us About Your Vision"
        value={values.vision}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.vision}
        rows={6}
        maxLength={1400}
        required
      />

      <div className={styles.footer}>
        <Button type="submit" variant="primary" size="lg" disabled={status === 'pending'}>
          {status === 'pending' ? (
            <>
              <span className="spinner" aria-hidden="true" /> Sending
            </>
          ) : (
            'Send Enquiry'
          )}
        </Button>

        <p className={styles.note}>
          By sending this form you agree to our <Link to="/privacy">privacy policy</Link>. We never share
          your details with third parties.
        </p>
      </div>
    </form>
  )
}

/* --- Field primitives ---------------------------------------------------- */

/**
 * Build an `aria-describedby` value. The error must be announced first, and an
 * optional hint (e.g. "Optional", "Approximate is fine") is exposed alongside
 * it so screen-reader users hear the full context of the field.
 */
function describeBy(id, error, hasHint = false) {
  return [error ? `${id}-error` : null, hasHint ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined
}

function Field({ id, label, hint, error, value, onChange, onBlur, required = false, ...inputProps }) {
  const showsHint = Boolean(hint) && !required

  return (
    <div className={styles.field}>
      <FieldLabel id={id} label={label} hint={hint} required={required} />

      <input
        id={id}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describeBy(id, error, showsHint)}
        {...inputProps}
      />

      <FieldError id={id} error={error} />
    </div>
  )
}

function SelectField({ id, name, label, hint, error, options, placeholder, value, onChange, onBlur, required }) {
  return (
    <div className={styles.field}>
      <FieldLabel id={id} label={label} hint={hint} required={required} />

      <div className={styles.selectWrap}>
        <select
          id={id}
          name={name}
          className={`${styles.input} ${styles.select} ${error ? styles.inputError : ''}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describeBy(id, error, Boolean(hint) && !required)}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className={styles.chevron} aria-hidden="true">
          ▾
        </span>
      </div>

      <FieldError id={id} error={error} />
    </div>
  )
}

function TextareaField({
  id,
  name,
  label,
  hint,
  error,
  value,
  onChange,
  onBlur,
  required,
  maxLength,
  ...areaProps
}) {
  const showsHint = Boolean(hint) && !required

  return (
    <div className={styles.field}>
      <FieldLabel id={id} label={label} hint={hint} required={required} />

      <textarea
        id={id}
        name={name}
        className={`${styles.input} ${styles.textarea} ${error ? styles.inputError : ''}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        aria-invalid={error ? 'true' : undefined}
        /* The live counter belongs to the accessible description so the
           remaining length is announced, not hidden from screen readers. */
        aria-describedby={describeBy(id, error, showsHint)}
        {...areaProps}
      />

      <FieldError id={id} error={error} />

      <p className={styles.charCount}>
        {value.length} / {maxLength} characters
      </p>
    </div>
  )
}

/** Shared label: name, required marker and an optional right-aligned hint. */
function FieldLabel({ id, label, hint, required }) {
  return (
    <label className={styles.label} htmlFor={id}>
      {label}
      {required ? (
        <span className={styles.required} aria-hidden="true">
          *
        </span>
      ) : null}
      {hint && !required ? (
        <span className={styles.hintLabel} id={`${id}-hint`}>
          {hint}
        </span>
      ) : null}
    </label>
  )
}

/**
 * Field error, wired to its control via `aria-describedby`.
 * `role="alert"` makes a message that appears after submission interrupt
 * immediately rather than waiting for a pause in speech.
 */
function FieldError({ id, error }) {
  if (!error) return null
  return (
    <p className={styles.error} id={`${id}-error`} role="alert">
      {error}
    </p>
  )
}
