import { useEffect, useRef } from 'react'
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Trap keyboard focus inside a container while `active` is true, and release
 * focus back to the trigger on close. Required for accessible overlays.
 */
export function useFocusTrap(active, { onEscape } = {}) {
  const containerRef = useRef(null)
  const restoreRef = useRef(null)
  const escapeRef = useRef(onEscape)

  // Keep the callback fresh without making it an effect dependency: an inline
  // arrow would otherwise re-run the focus effect and steal focus every render.
  useEffect(() => {
    escapeRef.current = onEscape
  }, [onEscape])

  useEffect(() => {
    if (!active) return undefined

    const container = containerRef.current
    if (!container) return undefined

    restoreRef.current = document.activeElement

    const focusFirst = () => {
      const target = container.querySelector('[data-autofocus]') ?? container.querySelector(FOCUSABLE)
      target?.focus()
    }

    // Defer so the element is painted before focus moves into it.
    const raf = requestAnimationFrame(focusFirst)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        escapeRef.current?.()
        return
      }

      if (event.key !== 'Tab') return

      const items = Array.from(container.querySelectorAll(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null || element === document.activeElement,
      )
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKeyDown, true)
      const restore = restoreRef.current
      if (restore instanceof HTMLElement && document.contains(restore)) {
        restore.focus({ preventScroll: true })
      }
    }
  }, [active])

  return containerRef
}
