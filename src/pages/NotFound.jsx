import { useLocation } from 'react-router-dom'
import Seo from '../components/seo/Seo'
import Button from '../components/ui/Button'
import SmartImage from '../components/ui/SmartImage'
import { navLinks } from '../data/site'
import styles from './NotFound.module.css'

/**
 * Custom 404.
 *
 * Mirrors the attempted path in the copy so a mistyped or stale URL still feels
 * considered, and offers every primary destination rather than a dead end.
 */
export default function NotFound() {
  const location = useLocation()
  const attempted = `${location.pathname}${location.hash}`

  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you were looking for could not be found. Return to the LuxeAura Events homepage, portfolio or contact page."
        noIndex
      />

      <section className={styles.page}>
        <div className={styles.media} aria-hidden="true">
          <SmartImage
            name="notFound"
            ratio="16 / 9"
            widths={[768, 1280, 1920]}
            sizes="100vw"
            priority
            frameClassName={styles.frame}
          />
          <span className={styles.scrim} />
        </div>

        <div className={`container ${styles.inner}`}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>
            This moment has
            <br />
            <span className="t-accent">already passed.</span>
          </h1>

          <p className={styles.body}>
            We could not find <code className={styles.path}>{attempted}</code> on this site. It may have been
            moved, or the link may have been mistyped.
          </p>

          <div className={styles.actions}>
            <Button to="/" variant="secondary" size="lg" tone="dark">
              Return Home
            </Button>
            <Button to="/contact" variant="outline" size="lg" tone="dark">
              Contact the Studio
            </Button>
          </div>

          <nav className={styles.links} aria-label="Suggested pages">
            <p className={styles.linksLabel}>Or visit</p>
            <ul>
              {navLinks
                .filter((link) => link.to !== '/')
                .map((link) => (
                  <li key={link.to}>
                    <Button to={link.to} variant="ghost" size="sm" tone="dark">
                      {link.label}
                    </Button>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  )
}
