import { useEffect, useRef, useState } from 'react'

/**
 * Reveals its children when scrolled into view.
 *
 * Uses IntersectionObserver and unobserves after firing so the animation never
 * replays on the way back up. Respects prefers-reduced-motion through CSS, and
 * degrades to "visible immediately" where IntersectionObserver is unsupported.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  variant = 'fade', // fade | clip | lines
  delay = 0,
  className = '',
  style,
  ...rest
}) {
  const ref = useRef(null)
  // Without IntersectionObserver there is nothing to wait for, so start visible
  // and skip the observer entirely.
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const classes = [
    variant === 'clip' ? 'reveal-clip' : variant === 'lines' ? 'reveal-lines' : 'reveal',
    visible ? 'is-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag ref={ref} className={classes} style={{ '--reveal-delay': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  )
}
