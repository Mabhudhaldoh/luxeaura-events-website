import { useEffect, useState } from 'react'

/**
 * Track whether the page has been scrolled past a threshold.
 * Drives the navbar's transparent -> solid state and the back-to-top control.
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0

    const evaluate = () => {
      frame = 0
      setScrolled(window.scrollY > threshold)
    }

    const onScroll = () => {
      // Coalesce scroll events into a single update per frame.
      if (!frame) frame = requestAnimationFrame(evaluate)
    }

    evaluate()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [threshold])

  return scrolled
}
