import { useState } from 'react'
import { imageSrcSet, imageUrl, ratioHeight, resolveImage } from '../../data/images'
import styles from './SmartImage.module.css'

const cx = (...values) => values.filter(Boolean).join(' ')

/**
 * Responsive, lazy-loaded image with a graceful failure state.
 *
 * - `srcset`/`sizes` let the CDN serve an appropriately sized, correctly
 *   cropped file per device.
 * - A tinted placeholder sits behind the image and fades out once it decodes,
 *   so there is never a flash of an empty box.
 * - `object-position` is configurable for editorial crops, and a request
 *   failure degrades to an on-brand monogram panel rather than a broken icon.
 */
export default function SmartImage({
  name,
  image,
  alt,
  ratio = '4 / 5',
  widths = [480, 768, 1100, 1600],
  sizes = '100vw',
  priority = false,
  className,
  frameClassName,
  fit = 'cover',
  quality = 72,
  position,
}) {
  const [state, setState] = useState('loading') // loading | loaded | error

  const entry = image ? { id: image.id, alt: image.alt ?? '', focus: image.focus } : resolveImage(name)
  const resolvedAlt = alt ?? entry.alt ?? ''

  // The widest candidate doubles as the intrinsic size, so the aspect ratio is
  // reserved before the bytes arrive and the page does not shift.
  const intrinsicWidth = widths[widths.length - 1]
  const intrinsicHeight = ratioHeight(intrinsicWidth, ratio)

  const src = imageUrl(entry.id, {
    w: widths[Math.min(1, widths.length - 1)],
    h: ratioHeight(widths[Math.min(1, widths.length - 1)], ratio),
    quality,
  })

  return (
    <div
      className={cx(styles.frame, className, frameClassName)}
      style={{ '--aspect': ratio, '--position': position ?? entry.focus ?? '50% 50%' }}
    >
      <div
        className={cx(styles.placeholder, state === 'error' && styles.placeholderError)}
        aria-hidden="true"
      >
        {state === 'error' ? (
          <span className={styles.monogram}>LA</span>
        ) : null}
      </div>

      {state !== 'error' ? (
        <img
          className={cx(
            styles.image,
            fit === 'contain' && styles.imageContain,
            state === 'loaded' && styles.isLoaded,
          )}
          src={src}
          srcSet={imageSrcSet(entry.id, widths, { ratio, quality })}
          sizes={sizes}
          alt={resolvedAlt}
          width={intrinsicWidth}
          height={intrinsicHeight}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
        />
      ) : null}
    </div>
  )
}