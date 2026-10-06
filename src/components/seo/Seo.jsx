import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { applySeo } from '../../utils/seo'

/**
 * Declarative SEO for a route: title, description, canonical, Open Graph,
 * Twitter card, robots directive and optional JSON-LD.
 *
 * Mounted at the top of every page. `path` defaults to the current location so a
 * canonical URL can never drift from the route that is actually rendered.
 */
export default function Seo({
  title,
  description,
  image,
  type,
  path,
  noIndex = false,
  jsonLd,
}) {
  const { pathname } = useLocation()

  // Structured data is rebuilt only when its inputs change, otherwise every
  // render would write a fresh <script> node into the head.
  const schema = useMemo(() => {
    if (!jsonLd) return undefined
    return Array.isArray(jsonLd) ? jsonLd : [jsonLd]
  }, [jsonLd])

  useEffect(() => {
    applySeo({
      title,
      description,
      image,
      type,
      path: path ?? pathname,
      noIndex,
      jsonLd: schema,
    })
  }, [title, description, image, type, path, pathname, noIndex, schema])

  return null
}