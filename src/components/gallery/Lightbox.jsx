import { useCallback, useEffect, useRef, useState } from 'react'
import { imageUrl, resolveImage } from '../../data/images'
import { useScrollLock } from '../../hooks/useScrollLock'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { getCategoryLabel } from '../../utils/format'
import styles from './Lightbox.module.css'

const SWIPE_THRESHOLD = 48
const NO_IMAGES = []

/** Keep a requested index inside the bounds of the current project. */
const clampIndex = (value, length) => Math.min(Math.max(value, 0), Math.max(length - 1, 0))

/**
 * Full-screen image viewer.
 *
 * - Arrow keys, on-screen controls and horizontal swipe all move between the
 *   current project's images.
 * - Escape closes, focus is trapped while open, and page scroll is locked.
 * - Neighbouring images are preloaded so navigation feels instant.
 */
export default function Lightbox({ project, initialIndex = 0, onClose }) {
  const open = Boolean(project)
  const images = project?.images ?? NO_IMAGES

  const [index, setIndex] = useState(() => clampIndex(initialIndex, project?.images?.length ?? 0))
  const [openedId, setOpenedId] = useState(project?.id)

  // Opening a different project (or a different image within it) resets the
  // cursor. Adjusting state during render is the documented React pattern for
  // reacting to a prop change without an extra commit.
  if (project?.id !== openedId) {
    setOpenedId(project?.id)
    setIndex(clampIndex(initialIndex, images.length))
  }

  const touchStart = useRef(null)

  useScrollLock(open)

  const go = useCallback(
    (step) => {
      setIndex((current) => clampIndex((current + step + images.length) % images.length, images.length))
    },
    [images.length],
  )

  const close = useCallback(() => {
    onClose?.()
  }, [onClose])

  const trapRef = useFocusTrap(open, { onEscape: close })

  // Arrow keys mirror the on-screen controls.
  useEffect(() => {
    if (!open || images.length < 2) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        go(1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        go(-1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, images.length, go])

  // Preload the images either side of the current one.
  useEffect(() => {
    if (!open || images.length < 2) return
    const neighbours = [
      images[(index + 1) % images.length],
      images[(index - 1 + images.length) % images.length],
    ]
    neighbours.forEach((entry) => {
      const { id } = resolveImage(entry.image)
      const preload = new Image()
      preload.src = imageUrl(id, { w: 1600, quality: 72 })
    })
  }, [index, images, open])

  if (!project) return null

  const active = images[index]
  const activeEntry = active ? resolveImage(active.image) : null

  const handleTouchStart = (event) => {
    touchStart.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return
    const delta = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1)
    touchStart.current = null
  }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} — image viewer`}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div ref={trapRef} className={styles.dialog}>
        {/* --- Header ---------------------------------------------------- */}
        <header className={styles.header}>
          <div className={styles.headerMeta}>
            <p className={styles.projectName}>{project.name}</p>
            <p className={styles.projectMeta}>
              {getCategoryLabel(project.category)} — {project.location}, {project.year}
            </p>
          </div>

          <p className={styles.counter} aria-live="polite">
            {String(index + 1).padStart(2, '0')}
            <span aria-hidden="true"> / </span>
            {String(images.length).padStart(2, '0')}
          </p>

          <button
            type="button"
            className={styles.close}
            onClick={close}
            aria-label="Close image viewer"
            data-autofocus
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        {/* --- Stage ----------------------------------------------------- */}
        <div className={styles.stage}>
          {images.length > 1 ? (
            <button
              type="button"
              className={`${styles.nav} ${styles.navPrev}`}
              onClick={() => go(-1)}
              aria-label="Previous image"
            >
              <Chevron direction="left" />
            </button>
          ) : null}

          <figure className={styles.figure} key={`${project.id}-${index}`}>
            <img
              className={styles.image}
              src={activeEntry ? imageUrl(activeEntry.id, { w: 1800, quality: 78 }) : ''}
              alt={active?.alt ?? project.summary}
              width={1800}
              height={1200}
              decoding="async"
            />
          </figure>

          {images.length > 1 ? (
            <button
              type="button"
              className={`${styles.nav} ${styles.navNext}`}
              onClick={() => go(1)}
              aria-label="Next image"
            >
              <Chevron direction="right" />
            </button>
          ) : null}
        </div>

        {/* --- Thumbnails ------------------------------------------------ */}
        {images.length > 1 ? (
          <ul className={styles.thumbs}>
            {images.map((entry, thumbIndex) => {
              const { id } = resolveImage(entry.image)
              return (
                <li key={id + thumbIndex}>
                  <button
                    type="button"
                    className={`${styles.thumb} ${thumbIndex === index ? styles.thumbActive : ''}`}
                    onClick={() => setIndex(thumbIndex)}
                    aria-label={`Show image ${thumbIndex + 1} of ${images.length}`}
                    aria-current={thumbIndex === index ? 'true' : undefined}
                  >
                    <img
                      src={imageUrl(id, { w: 160, h: 120, quality: 60 })}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width={160}
                      height={120}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}

        <p className={styles.hint} aria-hidden="true">
          Use ← → to browse · Esc to close
        </p>
      </div>
    </div>
  )
}

function Chevron({ direction }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d={direction === 'left' ? 'M15 4l-8 8 8 8' : 'M9 4l8 8-8 8'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
