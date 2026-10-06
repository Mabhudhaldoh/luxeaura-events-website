import { useScrolled } from '../../hooks/useScrolled'
import styles from './BackToTop.module.css'

/**
 * Appears once the visitor is deep enough into the page to want it, and returns
 * them to the top of the document.
 */
export default function BackToTop() {
  const visible = useScrolled(1200)

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      aria-label="Back to top of page"
    >
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
