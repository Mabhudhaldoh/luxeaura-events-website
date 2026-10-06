import { Link } from 'react-router-dom'
import SmartImage from '../ui/SmartImage'
import styles from './ServiceCard.module.css'

/**
 * Service card used by the homepage preview and the services page index.
 * `to` defaults to the service anchor on the services page.
 */
export default function ServiceCard({ service, to = `/services#${service.slug}`, variant = 'default' }) {
  const { slug, index, title, summary, image, features } = service

  return (
    <article className={[styles.card, styles[variant]].filter(Boolean).join(' ')}>
      <Link to={to} className={styles.mediaLink} aria-label={`Explore ${title}`} tabIndex={-1}>
        <SmartImage
          name={image}
          ratio="4 / 5"
          widths={[420, 640, 860]}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 25vw"
          frameClassName={styles.media}
        />
        <span className={styles.index} aria-hidden="true">
          {index}
        </span>
      </Link>

      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link to={to} className={styles.titleLink}>
            {title}
          </Link>
        </h3>
        <p className={styles.summary}>{summary}</p>

        {variant !== 'compact' && features ? (
          <ul className={styles.features}>
            {features.slice(0, 4).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        ) : null}

        <Link to={to} className={styles.more}>
          <span>{variant === 'compact' ? 'Explore' : 'Discover service'}</span>
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
            <path
              d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <span className={styles.anchor} id={slug} aria-hidden="true" />
    </article>
  )
}
