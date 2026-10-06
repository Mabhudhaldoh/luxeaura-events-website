import { useCallback, useSyncExternalStore } from 'react'

/**
 * Subscribe to a CSS media query via `useSyncExternalStore`, which is the
 * idiomatic React way to read from an external source such as `matchMedia`.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    // Server / prerender snapshot.
    () => false,
  )
}

/** True when the visitor has asked for reduced motion. */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
