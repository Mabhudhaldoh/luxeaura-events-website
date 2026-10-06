import { Link } from 'react-router-dom'
import SmartImage from '../ui/SmartImage'
import { getCategoryLabel } from '../../utils/format'
import styles from './PortfolioCard.module.css'

/**
 * Editorial portfolio tile.
 *
 * `size` drives the grid footprint so a gallery can mix tall, wide and standard
 * frames instead of repeating one shape. When `onOpen` is supplied the tile
 * renders as a real <button> that opens the lightbox; otherwise it links to the
 * project anchor on the portfolio page.
 */
export default function PortfolioCard({
  project,
  size = 'standard',
  priority = false,
  onOpen,
  showCount = false,
}) {
  const ratio = ratioFor(size)

  const media = (
    <>
      <SmartImage
        name={project.cover}
        ratio={ratio}
        widths={widthsFor(size)}
        sizes={sizesFor(size)}
        priority={priority}
        frameClassName={styles.media}
      />

      <span className={styles.scrim} aria-hidden="true" />

      <span className={styles.meta}>
        <span className={styles.category}>{getCategoryLabel(project.category)}</span>
        <span className={styles.name}>{project.name}</span>
        <span className={styles.place}>
          {project.location} — {project.year}
        </span>
        {showCount ? (
          <span className={styles.count}>
            View {project.images.length} photograph{project.images.length === 1 ? '' : 's'}
          </span>
        ) : null}
      </span>
    </>
  )

  if (onOpen) {
    return (
      <article className={`${styles.card} ${styles[size]}`}>
        <button type="button" className={styles.link} onClick={() => onOpen(project)}>
          {media}
          <span className="visually-hidden">
            Open the {project.name} gallery — {project.images.length} images
          </span>
        </button>
      </article>
    )
  }

  return (
    <article className={`${styles.card} ${styles[size]}`}>
      <Link
        to={`/portfolio#${project.id}`}
        className={styles.link}
        aria-label={`View ${project.name}, ${getCategoryLabel(project.category)} project in ${project.location}`}
      >
        {media}
      </Link>
    </article>
  )
}

function ratioFor(size) {
  if (size === 'tall') return '3 / 4'
  if (size === 'wide') return '16 / 10'
  if (size === 'hero') return '4 / 3'
  return '4 / 5'
}

function widthsFor(size) {
  if (size === 'hero' || size === 'wide') return [640, 960, 1280]
  return [420, 640, 900]
}

function sizesFor(size) {
  if (size === 'hero') return '(max-width: 900px) 100vw, 58vw'
  if (size === 'wide') return '(max-width: 900px) 100vw, 42vw'
  return '(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 25vw'
}
