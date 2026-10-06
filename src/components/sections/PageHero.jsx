import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'
import SmartImage from '../ui/SmartImage'
import styles from './PageHero.module.css'

/**
 * Shared hero for every inner page: eyebrow, large title, optional
 * introduction, breadcrumb and supporting facts.
 */
export default function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  image,
  imageAlt,
  facts = null,
  breadcrumb = null,
}) {
  return (
    <section className={styles.hero} aria-labelledby="page-heading">
      <div className={styles.media}>
        <SmartImage
          name={image}
          ratio="16 / 9"
          widths={[768, 1280, 1920]}
          sizes="100vw"
          priority
          frameClassName={styles.frame}
          alt={imageAlt}
        />
        <span className={styles.scrim} aria-hidden="true" />
      </div>

      <div className={`container ${styles.inner}`}>
        {breadcrumb ? (
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol>
              {breadcrumb.map((crumb, index) => (
                <li key={crumb.label}>
                  {crumb.to ? (
                    <Link to={crumb.to}>{crumb.label}</Link>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                  {index < breadcrumb.length - 1 ? (
                    <span className={styles.separator} aria-hidden="true">
                      /
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Reveal as="p" className={`t-eyebrow ${styles.eyebrow}`}>
          {eyebrow}
        </Reveal>

        <Reveal as="h1" id="page-heading" className={`t-hero ${styles.title}`} delay={80}>
          {title}
          {accent ? <> <span className={styles.accent}>{accent}</span></> : null}
        </Reveal>

        {intro ? (
          <Reveal as="p" className={`t-lead ${styles.intro}`} delay={160}>
            {intro}
          </Reveal>
        ) : null}

        {facts?.length ? (
          <Reveal as="ul" className={styles.facts} delay={240}>
            {facts.map((fact) => (
              <li key={fact.label}>
                <span className={styles.factValue}>{fact.value}</span>
                <span className={styles.factLabel}>{fact.label}</span>
              </li>
            ))}
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
