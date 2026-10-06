/**
 * Central brand + business configuration.
 * Single source of truth for anything shared across pages (nav, footer, SEO).
 */

export const site = {
  name: 'LuxeAura Events',
  shortName: 'LuxeAura',
  tagline: 'Where Extraordinary Moments Become Unforgettable Memories.',
  description:
    'LuxeAura Events creates sophisticated weddings, corporate events and private celebrations through bespoke luxury event design and styling.',
  url: 'https://luxeauraevents.com',
  locale: 'en_GB',
  foundedYear: 2014,
  currency: 'USD',
  /*
   * Kept as data rather than read from `new Date()` during render, so the
   * footer is pure and the year is trivial to bump at launch. Update this when
   * the site is redeployed in a later calendar year.
   */
  copyrightYear: 2026,
  /*
   * Absolute 1200x630 social share image. Served from the Unsplash CDN so it
   * resolves without an extra binary in the repo; replace with a self-hosted
   * asset (e.g. `${site.url}/og-cover.jpg`) when one is produced.
   */
  shareImage:
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&h=630&q=75',
  shareImageAlt: 'LuxeAura Events — luxury event design and styling',
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
]

export const contact = {
  email: 'hello@luxeauraevents.com',
  phone: '+263 77 000 0000',
  phoneHref: '+263770000000',
  location: 'Harare, Zimbabwe',
  locationLine2: 'Studio 14, Harare Arts District',
  responseTime: 'We reply to every enquiry within one business day.',
}

export const businessHours = [
  { days: 'Monday – Friday', hours: '08:00 – 17:00' },
  { days: 'Saturday', hours: '09:00 – 14:00' },
  { days: 'Sunday', hours: 'By appointment' },
]

/**
 * Placeholder profile URLs. Replace with real destinations before going live.
 * They render as normal anchors so there are no dead # links in the markup.
 */
export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Facebook', href: 'https://www.facebook.com/' },
  { label: 'Pinterest', href: 'https://www.pinterest.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
]

export const footerNav = [
  {
    heading: 'Studio',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Portfolio', to: '/portfolio' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Luxury Weddings', to: '/services#luxury-weddings' },
      { label: 'Corporate Events', to: '/services#corporate-events' },
      { label: 'Private Celebrations', to: '/services#private-celebrations' },
      { label: 'Floral Design', to: '/services#floral-design' },
    ],
  },
]

/*
 * `external: true` marks a link that points at a static file rather than a
 * client route, so the footer renders a plain anchor instead of a router Link.
 */
export const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Sitemap', to: '/sitemap.xml', external: true },
]

export const hero = {
  eyebrow: 'Luxury Event Design & Styling Studio',
  titleLines: ['Where', 'Extraordinary', 'Moments Begin.'],
  tagline: site.tagline,
  imageAlt:
    'Bride and groom sharing a kiss during a golden-hour outdoor wedding ceremony, backlit by warm afternoon light.',
  primaryCta: { label: 'Explore Our Work', to: '/portfolio' },
  secondaryCta: { label: 'Plan Your Event', to: '/contact' },
}
