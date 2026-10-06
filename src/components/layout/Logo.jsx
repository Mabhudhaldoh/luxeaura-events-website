import { Link } from 'react-router-dom'
import styles from './Logo.module.css'

/**
 * Brand mark: concentric rings reading as an "aura" or halo, paired with a
 * two-weight wordmark. Drawn inline so it inherits colour and stays crisp.
 */
export default function Logo({ tone = 'light', className, asLink = true }) {
  const content = (
    <>
      <svg
        className={styles.mark}
        viewBox="0 0 40 40"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="20" cy="20" r="18.5" className={styles.ringOuter} />
        <circle cx="20" cy="20" r="11" className={styles.ringInner} />
        <circle cx="20" cy="20" r="2.4" className={styles.core} />
        <path d="M20 1.5v6.5M20 32v6.5" className={styles.tick} />
      </svg>

      <span className={styles.wordmark}>
        <span className={styles.name}>LuxeAura</span>
        <span className={styles.suffix}>Events</span>
      </span>
    </>
  )

  const classes = [styles.logo, tone === 'dark' ? styles.toneDark : '', className]
    .filter(Boolean)
    .join(' ')

  if (!asLink) {
    return <span className={classes}>{content}</span>
  }

  return (
    <Link to="/" className={classes} aria-label="LuxeAura Events — home">
      {content}
    </Link>
  )
}
