/**
 * Centralised image registry.
 *
 * Photography is served from the Unsplash CDN under the Unsplash Licence
 * (free for commercial and non-commercial use, no attribution required —
 * attribution is given here and in the README as good practice).
 *
 * Every entry keeps its own alt text so screen-reader users always receive a
 * description that matches the image actually rendered. Swapping in real client
 * photography later only requires changing the `id` and the `alt` of an entry.
 *
 * The `SmartImage` component degrades to a tinted placeholder panel if a
 * request fails, so the layout never breaks on a slow or offline connection.
 */

const CDN = 'https://images.unsplash.com/photo-'

/** @typedef {{ id: string, alt: string, focus?: string }} ImageEntry */

/** @type {Record<string, ImageEntry>} */
export const images = {
  /* --- Page-level heroes ------------------------------------------------- */
  hero: {
    id: '1519741497674-611481863552',
    alt: 'Bride and groom sharing a kiss during an outdoor ceremony, backlit by warm golden-hour light.',
    focus: '50% 35%',
  },
  pageAbout: {
    id: '1511795409834-ef04bbd61622',
    alt: 'A grand event hall dressed with dramatic lighting and a glowing stage set for a gala evening.',
  },
  pageServices: {
    id: '1414235077428-338989a2e8c0',
    alt: 'Moody, warmly lit fine-dining restaurant interior with set tables and soft pendant lighting.',
  },
  pagePortfolio: {
    id: '1464366400600-7168b8af9bc3',
    alt: 'A long banquet table dressed with glassware, candlelight and floral runners for a formal dinner.',
  },
  pageContact: {
    id: '1490750967868-88aa4486c946',
    alt: 'Soft pale blossom branches photographed against soft light, used as a quiet editorial accent.',
  },
  notFound: {
    id: '1519671482749-fd09be7ccebf',
    alt: 'An empty candlelit dining table set for an evening that has not yet begun.',
  },

  /* --- Editorial / introduction ------------------------------------------ */
  intro: {
    id: '1465495976277-4387d4b0e4a6',
    alt: 'Wedding reception styling with layered florals, candles and carefully arranged table settings.',
  },
  introDetail: {
    id: '1511285560929-80b456fea0bc',
    alt: 'Close detail of a wedding tablescape with taper candles, gold cutlery and seasonal florals.',
  },

  /* --- Weddings ----------------------------------------------------------- */
  weddingBride: {
    id: '1515934751635-c81c6bc9a2d8',
    alt: 'A bride in an elegant gown photographed in soft natural light before her ceremony.',
  },
  weddingReception: {
    id: '1519225421980-715cb0215aed',
    alt: 'Wedding reception space styled with suspended florals and warm ambient lighting.',
  },
  weddingFloral: {
    id: '1520854221256-17451cc331bf',
    alt: 'A ceremony floral installation built from pale roses and trailing greenery.',
  },
  weddingDress: {
    id: '1523438885200-e635ba2c371e',
    alt: 'Ivory floral styling detail with soft white blooms and delicate foliage.',
  },
  weddingTable: {
    id: '1511285560929-80b456fea0bc',
    alt: 'Ivory and champagne wedding tablescape finished with taper candles and gold detailing.',
  },

  /* --- Dinner, galas and dining ------------------------------------------ */
  dinnerInterior: {
    id: '1414235077428-338989a2e8c0',
    alt: 'Fine-dining room with dark walls, warm pools of light and elegantly set tables.',
  },
  dinnerTable: {
    id: '1519671482749-fd09be7ccebf',
    alt: 'A long candlelit table set for an intimate evening dinner.',
  },
  dinnerWine: {
    id: '1510812431401-41d2bd2722f3',
    alt: 'Wine being poured into a glass at a formal dinner service.',
  },
  dinnerCocktail: {
    id: '1553361371-9b22f78e8b1d',
    alt: 'Cocktails prepared with precision for a reception bar service.',
  },
  dinnerPlate: {
    id: '1600891964092-4316c288032e',
    alt: 'A plated fine-dining course presented with careful, minimal styling.',
  },

  /* --- Corporate ---------------------------------------------------------- */
  corporateHall: {
    id: '1511795409834-ef04bbd61622',
    alt: 'Large conference venue with a lit stage and audience seating in low light.',
  },
  corporateStage: {
    id: '1540575467063-178a50c2df87',
    alt: 'Conference stage with a speaker addressing a seated audience.',
  },
  corporateMeeting: {
    id: '1524758631624-e2822e304c36',
    alt: 'A leadership team meeting around a table in a modern corporate space.',
  },
  corporateTable: {
    id: '1517457373958-b7bdd4587205',
    alt: 'Guests in conversation at a styled corporate networking table.',
  },
  corporateOffice: {
    id: '1497215728101-856f4ea42174',
    alt: 'Contemporary office interior with clean lines and warm materials.',
  },
  corporateTalk: {
    id: '1511578314322-379afb476865',
    alt: 'A presenter speaking to a group during a corporate launch event.',
  },
  corporateBriefing: {
    id: '1600880292203-757bb62b4baf',
    alt: 'Two executives in conversation during a corporate event briefing.',
  },
  corporateHandshake: {
    id: '1556761175-b413da4baf72',
    alt: 'Business partners in discussion across a meeting table.',
  },

  /* --- Private celebrations ----------------------------------------------- */
  celebrationConfetti: {
    id: '1492684223066-81342ee5ff30',
    alt: 'Guests celebrating as confetti falls through the air at an evening party.',
  },
  celebrationBalloons: {
    id: '1530103862676-de8c9debad1d',
    alt: 'Balloons and confetti arranged for a styled birthday celebration.',
  },
  celebrationIntimate: {
    id: '1551882547-ff40c63fe5fa',
    alt: 'An intimate private dining room prepared for a small evening gathering.',
  },
  celebrationCake: {
    id: '1464349095431-e9a21285b5f3',
    alt: 'A styled celebration table decorated with fresh flowers and fine glassware.',
  },

  /* --- Venue transformation & interiors ------------------------------------ */
  venueLobby: {
    id: '1519167758481-83f550bb49b3',
    alt: 'Elegant hotel lobby with sculptural lighting and polished stone surfaces.',
  },
  venueInterior: {
    id: '1600585154340-be6161a56a0c',
    alt: 'Contemporary interior with warm timber and neutral finishes.',
  },
  venueInteriorAlt: {
    id: '1600607687939-ce8a6c25118c',
    alt: 'Open-plan interior with natural light, timber joinery and styled furniture.',
  },
  venueInteriorSoft: {
    id: '1600585154526-990dced4db0d',
    alt: 'Minimal interior with soft neutral tones and considered architectural detail.',
  },
  venueSuite: {
    id: '1613490493576-7fde63acd811',
    alt: 'A refined event suite prepared with layered lighting and lounge seating.',
  },
  venueRoom: {
    id: '1604014237800-1c9102c219da',
    alt: 'A bright, quietly luxurious room styled for a private celebration.',
  },

  /* --- Floral design ------------------------------------------------------ */
  floralBlossom: {
    id: '1490750967868-88aa4486c946',
    alt: 'Pale blossom branches filling the frame, used to illustrate bespoke floral concepts.',
  },
  floralArrangement: {
    id: '1464349095431-e9a21285b5f3',
    alt: 'A seasonal floral arrangement built with textured, sculptural blooms.',
  },
  floralWhite: {
    id: '1526047932273-341f2a7631f9',
    alt: 'White floral study photographed against a soft neutral background.',
  },

  /* --- Studio craft / process --------------------------------------------- */
  craftDetail: {
    id: '1470337458703-46ad1756a187',
    alt: 'Table styling detail with crystal glassware, candlelight and seasonal stems.',
  },
  craftWine: {
    id: '1600891964092-4316c288032e',
    alt: 'Service detail from a formal dinner, plated with precision.',
  },
  craftBanquet: {
    id: '1464366400600-7168b8af9bc3',
    alt: 'A full banquet setup awaiting guests, dressed in ivory and gold.',
  },

  /* --- Team (fictional placeholder portraits) ------------------------------ */
  teamFounder: {
    id: '1573497019940-1c28c88b4f3e',
    alt: 'Portrait of Tendai Moyo, Founder and Creative Director at LuxeAura Events.',
  },
  teamLeadStylist: {
    id: '1560250097-0b93528c311a',
    alt: 'Portrait of Rudo Chikwanha, Lead Event Stylist at LuxeAura Events.',
  },
  teamFloral: {
    id: '1580489944761-15a19d654956',
    alt: 'Portrait of Chenai Marufu, Floral Design Director at LuxeAura Events.',
  },
  teamProduction: {
    id: '1494790108377-be9c29b29330',
    alt: 'Portrait of Bisi Ncube, Head of Production at LuxeAura Events.',
  },
  teamCorporate: {
    id: '1507003211169-0a1dd7228f2d',
    alt: 'Portrait of Tinashe Dube, Corporate Events Lead at LuxeAura Events.',
  },
  teamGuest: {
    id: '1534528741775-53994a69daeb',
    alt: 'Portrait of Anesu Kaire, Client Experience Manager at LuxeAura Events.',
  },
}

/**
 * Build a CDN URL for an image entry.
 * `auto=format` lets the CDN serve AVIF/WebP to capable browsers.
 */
export function imageUrl(id, { w = 1200, h, quality = 72, crop = true } = {}) {
  const params = new URLSearchParams({
    auto: 'format',
    fit: crop ? 'crop' : 'clip',
    w: String(w),
    q: String(quality),
  })
  if (h) params.set('h', String(h))
  return `${CDN}${id}?${params.toString()}`
}

/**
 * Convert a CSS ratio string (`'16 / 9'`, `'4 / 5'`) into a pixel height for a
 * given width, so the CDN is asked for the crop we actually display.
 */
export function ratioHeight(width, ratio) {
  if (!ratio) return undefined
  const [w, h] = String(ratio)
    .split('/')
    .map((part) => Number.parseFloat(part.trim()))
  if (!Number.isFinite(w) || !Number.isFinite(h) || w === 0) return undefined
  return Math.round((width * h) / w)
}

/** Build a `srcSet` so the browser only downloads what it needs. */
export function imageSrcSet(id, widths, { ratio, quality = 72 } = {}) {
  return widths
    .map((w) => `${imageUrl(id, { w, h: ratioHeight(w, ratio), quality })} ${w}w`)
    .join(', ')
}

/** Resolve a registry key, falling back gracefully if a key is unknown. */
export function resolveImage(name) {
  return images[name] ?? images.hero
}
