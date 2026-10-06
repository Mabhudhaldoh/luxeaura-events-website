import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import SmartImage from '../ui/SmartImage'
import { contact } from '../../data/site'
import styles from './CtaBand.module.css'

/**
 * Full-width conversion block, reused on every page so the primary action is
 * always the next thing a visitor can reach.
 */
export default function CtaBand({
  title = "Let's Create Something Extraordinary.",
  text = "Tell us about your vision and let's begin designing an unforgettable experience.",
  ctaLabel = 'Start Your Journey',
  ctaTo = '/contact',
  image = 'venueLobby',
  secondary = null,
}) {
  return (
    <section className={styles.band} aria-labelledby="cta-heading">
      <div className={styles.media}>
        <SmartImage
          name={image}
          ratio="16 / 7"
          widths={[768, 1280, 1920]}
          sizes="100vw"
          frameClassName={styles.frame}
        />
        <span className={styles.scrim} aria-hidden="true" />
      </div>

      <div className={`container ${styles.inner}`}>
        <Reveal as="p" className={`t-eyebrow ${styles.eyebrow}`}>
          Begin
        </Reveal>

        <Reveal as="h2" id="cta-heading" className={`t-display ${styles.title}`} delay={80}>
          {title}
        </Reveal>

        <Reveal as="p" className={`t-lead ${styles.text}`} delay={160}>
          {text}
        </Reveal>

        <Reveal className={styles.actions} delay={240}>
          <Button to={ctaTo} variant="secondary" size="lg" tone="dark">
            {ctaLabel}
          </Button>
          {secondary ? (
            <Button href={`mailto:${contact.email}`} variant="outline" size="lg" tone="dark">
              {secondary}
            </Button>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}
