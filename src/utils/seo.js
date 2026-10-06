import { site } from '../data/site'

const MANAGED = 'data-seo'

/*
 * Open Graph tags must be keyed by `property`, Twitter tags by `name`. Getting
 * this wrong makes crawlers see duplicates, so the attribute is chosen from the
 * tag name rather than passed in separately.
 */
function keyAttrFor(name) {
  return name.startsWith('og:') ? 'property' : 'name'
}

function upsertMeta({ name, content }) {
  if (!content) return

  const keyAttr = keyAttrFor(name)
  let tag = document.head.querySelector(`meta[${keyAttr}="${name}"]`)

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(keyAttr, name)
    tag.setAttribute(MANAGED, '')
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

/**
 * Set the robots directive. The tag is always present and always written to,
 * because removing it would let the crawler inherit whatever `index.html`
 * declared for the previous route — 404s must not stay indexable.
 */
function setRobots(noIndex) {
  let tag = document.head.querySelector('meta[name="robots"]')

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', 'robots')
    tag.setAttribute(MANAGED, '')
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', noIndex ? 'noindex, follow' : 'index, follow')
}

function upsertLink({ rel, href, crossOrigin }) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    tag.setAttribute(MANAGED, '')
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
  if (crossOrigin) tag.setAttribute('crossorigin', '')
  else tag.removeAttribute('crossorigin')
}

/**
 * Apply per-route metadata to the document head.
 *
 * A single-page app owns one `<head>`, so each route overwrites only the tags it
 * manages. Anything else (theme colour, preconnects, the static JSON-LD in
 * `index.html`) is left untouched.
 */
export function applySeo({
  title,
  description = site.description,
  path = '/',
  image,
  type = 'website',
  noIndex = false,
  jsonLd,
} = {}) {
  if (typeof document === 'undefined') return

  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`
  const url = `${site.url}${path}`
  const shareImage = image ?? site.shareImage

  document.title = fullTitle

  upsertMeta({ name: 'description', content: description })
  upsertMeta({ name: 'og:title', content: fullTitle })
  upsertMeta({ name: 'og:description', content: description })
  upsertMeta({ name: 'og:url', content: url })
  upsertMeta({ name: 'og:type', content: type })
  upsertMeta({ name: 'og:image', content: shareImage })
  upsertMeta({ name: 'og:locale', content: site.locale })
  upsertMeta({ name: 'twitter:card', content: 'summary_large_image' })
  upsertMeta({ name: 'twitter:title', content: fullTitle })
  upsertMeta({ name: 'twitter:description', content: description })
  upsertMeta({ name: 'twitter:image', content: shareImage })

  upsertLink({ rel: 'canonical', href: url })

  setRobots(noIndex)

  // Remove the previous route's structured data before writing the new graph.
  document.head.querySelectorAll(`script[${MANAGED}="jsonld"]`).forEach((node) => node.remove())

  // Accept either a single schema object or a list of them; a list is emitted
  // as a single `@graph` node so the markup stays valid.
  if (jsonLd) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute(MANAGED, 'jsonld')

    const payload = Array.isArray(jsonLd) ? { '@context': 'https://schema.org', '@graph': jsonLd } : jsonLd
    script.textContent = JSON.stringify(payload)

    document.head.appendChild(script)
  }
}

/** Build a breadcrumb graph so search engines understand the page hierarchy. */
export function breadcrumbJsonLd(path, trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { name: 'Home', path: '/' },
      ...trail.map((item, index) => ({
        name: item.label,
        path: item.to ?? path,
        position: index + 2,
      })),
    ],
  }
}