import { useEffect } from 'react'

/**
 * Lock page scrolling while an overlay (mobile menu, lightbox) is open.
 * Compensates for the disappearing scrollbar so the layout does not jump.
 */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [locked])
}
