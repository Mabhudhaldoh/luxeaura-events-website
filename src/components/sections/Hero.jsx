import SmartImage from '../ui/SmartImage'
import Button from '../ui/Button'
import { hero } from '../../data/site'
import styles from './Hero.module.css'

/**
 * Full-bleed opening frame.
 *
 * The photograph loads eagerly (it is the LCP element), the copy animates on
 * mount rather than on scroll, and every other page section is deferred.
 */
export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.media}>
        <SmartImage
          name="hero"
          ratio="16 / 9"
          widths={[768, 1280, 1920, 2400]}
          sizes="100vw"
          priority
          frameClassName={styles.frame}
        />
        <span className={styles.scrim} aria-hidden="true" />
      </div>

      <div className={styles.inner}>
        <div className={`${styles.copy} hero-enter`}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>

          <h1 id="hero-heading" className={styles.heading}>
            <span className={styles.line}>Where</span>
            <span className={styles.line}>Extraordinary</span>
            <span className={styles.line}>Moments</span>
            <span className={`${styles.line} ${styles.lineLast}`}>Begin.</span>
          </h1>

          <p className={styles.tagline}>{hero.tagline}</p>

          <div className={styles.actions}>
            <Button to={hero.primaryCta.to} variant="primary" size="lg" tone="dark">
              {hero.primaryCta.label}
            </Button>
            <Button to={hero.secondaryCta.to} variant="outline" size="lg" tone="dark">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>

      {/* Editorial side note — a quiet luxury signal, hidden on small screens */}
      <p className={styles.sideNote} aria-hidden="true">
        Harare · Zimbabwe — Est. 2014
      </p>

      <div className={styles.scrollHint}>
        <span className={styles.scrollLabel}>Scroll</span>
        <span className="scroll-hint">
          <span className="scroll-hint__track" />
        </span>
      </div>
    </section>
  )
}
