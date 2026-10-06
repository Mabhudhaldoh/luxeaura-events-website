import { useId, useState } from 'react'
import { validators } from '../../utils/validation'
import styles from './NewsletterForm.module.css'

/**
 * Footer newsletter capture.
 *
 * Front-end only: the form validates, shows pending and success states, then
 * hands off to whatever endpoint the studio configures. No third-party script
 * and no credentials are involved.
 */
export default function NewsletterForm() {
  const inputId = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | pending | success

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextError = validators.email(email)
    if (nextError) {
      setError(nextError)
      setStatus('idle')
      return
    }

    setError('')
    setStatus('pending')

    // Wire this to your mailing list provider ( Buttondown, Mailchimp, ... ).
    await new Promise((resolve) => window.setTimeout(resolve, 900))

    setStatus('success')
    setEmail('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className="visually-hidden" htmlFor={inputId}>
        Email address for the LuxeAura newsletter
      </label>

      <div className={styles.row}>
        <input
          id={inputId}
          className={styles.input}
          type="email"
          name="newsletter-email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          disabled={status === 'pending'}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : `${inputId}-hint`}
          onChange={(event) => {
            setEmail(event.target.value)
            if (error) setError('')
          }}
        />
        <button
          type="submit"
          className={styles.submit}
          disabled={status === 'pending'}
          aria-label="Subscribe to the LuxeAura newsletter"
        >
          {status === 'pending' ? <span className="spinner" aria-hidden="true" /> : 'Subscribe'}
        </button>
      </div>

      <p className={styles.hint} id={`${inputId}-hint`}>
        Occasional studio notes. No noise.
      </p>

      {error ? (
        <p className={styles.error} id={`${inputId}-error`} role="alert">
          {error}
        </p>
      ) : null}

      <p className={styles.success} role="status" hidden={status !== 'success'}>
        Thank you — you are on the list.
      </p>
    </form>
  )
}
