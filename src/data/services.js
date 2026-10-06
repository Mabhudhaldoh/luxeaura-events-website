/**
 * Service catalogue.
 * `slug` doubles as the in-page anchor used by the footer deep links.
 */

export const services = [
  {
    slug: 'luxury-weddings',
    index: '01',
    title: 'Luxury Weddings',
    shortTitle: 'Weddings',
    summary: 'Bespoke wedding styling and complete visual direction.',
    description:
      'Complete wedding styling, décor, floral direction, tablescapes and venue transformation — from the first mood board to the final candle being lit.',
    image: 'weddingBride',
    features: [
      'Concept & mood board development',
      'Full floral design direction',
      'Tablescape and stationery styling',
      'Ceremony and venue transformation',
      'Lighting and draping design',
      'On-the-day styling team',
    ],
    timeline: '12–20 weeks planning',
  },
  {
    slug: 'corporate-events',
    index: '02',
    title: 'Corporate Events',
    shortTitle: 'Corporate',
    summary: 'Professional environments designed around your brand.',
    description:
      'Conferences, launches, award ceremonies, networking evenings and executive dinners — designed to communicate your brand with clarity and confidence.',
    image: 'corporateHall',
    features: [
      'Brand-aligned creative direction',
      'Stage, set and scenic design',
      'Registration and welcome areas',
      'Gala dinner and awards styling',
      'Signage and printed collateral',
      'Technical liaison and show calling',
    ],
    timeline: '6–14 weeks planning',
  },
  {
    slug: 'private-celebrations',
    index: '03',
    title: 'Private Celebrations',
    shortTitle: 'Private',
    summary: 'Elegant birthdays, anniversaries and intimate gatherings.',
    description:
      'Birthdays, anniversaries, engagement parties and intimate celebrations styled with warmth, discretion and a great deal of personal character.',
    image: 'celebrationConfetti',
    features: [
      'Personal theme and narrative design',
      'Bespoke cake and dessert styling',
      'Floral and table compositions',
      'Lounge and seating design',
      'Lighting and ambience',
      'Catering and bar liaison',
    ],
    timeline: '8–12 weeks planning',
  },
  {
    slug: 'floral-design',
    index: '04',
    title: 'Floral Design',
    shortTitle: 'Floral',
    summary: "Custom floral concepts designed around the event's personality.",
    description:
      "Custom floral concepts designed around the event's personality — from quiet, tonal installations to abundant statement arrangements.",
    image: 'floralArrangement',
    features: [
      'Seasonal sourcing and procurement',
      'Installation and suspended pieces',
      'Bridal and personal florals',
      'Table and entrance compositions',
      'Venue-specific botanical styling',
      'On-site conditioning and care',
    ],
    timeline: 'Design-led, 2–6 weeks',
  },
  {
    slug: 'venue-styling',
    index: '05',
    title: 'Venue Styling',
    shortTitle: 'Venue',
    summary: 'Complete visual transformation of event spaces.',
    description:
      'Complete visual transformation of event spaces — working with the architecture you are given to create something entirely new.',
    image: 'venueInterior',
    features: [
      'Full 3D space planning',
      'Drape, scaffold and structure design',
      'Furniture and soft furnishing',
      'Lighting schemes and control',
      'Ingress, aisle and ceremony set',
      'Strike and reinstatement planning',
    ],
    timeline: '8–16 weeks planning',
  },
  {
    slug: 'creative-direction',
    index: '06',
    title: 'Event Concept & Creative Direction',
    shortTitle: 'Direction',
    summary: 'Mood boards, colour palettes, styling concepts and creative planning.',
    description:
      'Mood boards, colour palettes, styling concepts and creative planning — the thinking that makes every later decision obvious.',
    image: 'craftDetail',
    features: [
      'Discovery workshop and brief',
      'Mood board and palette development',
      'Venue walk-through and 3D layouts',
      'Sourcing and supplier curation',
      'Budget strategy and phasing',
      'Full production timeline',
    ],
    timeline: '4–10 weeks planning',
  },
]

/** The four services promoted on the homepage. */
export const featuredServiceSlugs = [
  'luxury-weddings',
  'corporate-events',
  'private-celebrations',
  'venue-styling',
]

export const featuredServices = featuredServiceSlugs.map((slug) =>
  services.find((service) => service.slug === slug),
)

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug)
}
