import { useState } from 'react'
import SmartImage from '../ui/SmartImage'
import Lightbox from './Lightbox'
import styles from './Gallery.module.css'

/**
 * Reusable image strip.
 *
 * Renders a set of photographs as an editorial row and opens them in the shared
 * Lightbox. Used on the About page to show studio moments; the Portfolio page
 * wires its own tiles straight into the same Lightbox.
 */
export default function Gallery({
  items,
  title = 'View gallery',
  ratio = '3 / 4',
  sizes = '(max-width: 640px) 46vw, 23vw',
  widths = [320, 480, 640],
  className,
}) {
  const [openIndex, setOpenIndex] = useState(null)

  // The lightbox expects a project shape; wrap the loose items into one.
  const project = openIndex === null ? null : { id: 'gallery', name: title, images: items }

  return (
    <>
      <ul className={[styles.gallery, className].filter(Boolean).join(' ')}>
        {items.map((item, index) => (
          <li key={`${item.image}-${index}`} className={styles.item}>
            <button
              type="button"
              className={styles.trigger}
              onClick={() => setOpenIndex(index)}
              aria-label={`Open ${item.alt} in image viewer`}
            >
              <SmartImage
                name={item.image}
                ratio={ratio}
                widths={widths}
                sizes={sizes}
                frameClassName={styles.media}
              />
              <span className={styles.badge} aria-hidden="true">
                +
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox project={project} initialIndex={openIndex ?? 0} onClose={() => setOpenIndex(null)} />
    </>
  )
}
