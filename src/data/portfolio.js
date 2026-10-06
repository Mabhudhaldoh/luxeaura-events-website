/**
 * Portfolio projects.
 *
 * Each project carries a cover image plus a set of gallery images. The
 * lightbox navigates a project's images rather than the whole catalogue,
 * which keeps the experience contextual for the visitor.
 */

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'private', label: 'Private' },
  { id: 'editorial', label: 'Editorial' },
]

export const projects = [
  {
    id: 'ivory-wedding',
    name: 'The Ivory Wedding',
    category: 'weddings',
    location: 'Harare, Zimbabwe',
    year: '2026',
    guests: '120 guests',
    cover: 'weddingBride',
    summary:
      'Bespoke ivory and champagne styling created for an intimate luxury celebration.',
    palette: ['#F7F3ED', '#C6A15B', '#EFE8DE', '#B8AA98'],
    images: [
      { image: 'weddingBride', alt: 'The bride in an ivory gown, photographed in soft morning light.' },
      { image: 'weddingTable', alt: 'Ivory tablescape finished with taper candles and gold cutlery.' },
      { image: 'weddingFloral', alt: 'Ceremony floral installation of pale roses and trailing greenery.' },
      { image: 'introDetail', alt: 'Close detail of the tablescape showing glassware and seasonal stems.' },
    ],
  },
  {
    id: 'golden-evening-gala',
    name: 'Golden Evening Gala',
    category: 'corporate',
    location: 'Bulawayo, Zimbabwe',
    year: '2026',
    guests: '400 guests',
    cover: 'dinnerInterior',
    summary:
      'A gold-lit awards evening staged in a heritage building with a full scenic transformation.',
    palette: ['#171615', '#C6A15B', '#100F0E', '#DDBD83'],
    images: [
      { image: 'dinnerInterior', alt: 'The gala room before service, lit with warm pools of light.' },
      { image: 'corporateHall', alt: 'Awards stage dressed with a lit set and dramatic overhead rig.' },
      { image: 'dinnerWine', alt: 'Wine service during the gala dinner course.' },
      { image: 'craftBanquet', alt: 'Long banquet tables dressed in ivory and gold.' },
    ],
  },
  {
    id: 'garden-celebration',
    name: 'The Garden Celebration',
    category: 'private',
    location: 'Norton, Zimbabwe',
    year: '2025',
    guests: '80 guests',
    cover: 'floralBlossom',
    summary:
      'An outdoor garden anniversary designed around soft blossom tones and long-table dining.',
    palette: ['#EFE8DE', '#B8AA98', '#F7F3ED', '#C6A15B'],
    images: [
      { image: 'floralBlossom', alt: 'Pale blossom branches framing the garden ceremony area.' },
      { image: 'craftDetail', alt: 'Garden table styling with crystal, candlelight and seasonal stems.' },
      { image: 'venueSuite', alt: 'Lounge seating arranged for the evening garden reception.' },
      { image: 'floralWhite', alt: 'White floral study used to define the celebration palette.' },
    ],
  },
  {
    id: 'modern-romance',
    name: 'Modern Romance',
    category: 'editorial',
    location: 'Victoria Falls, Zimbabwe',
    year: '2025',
    guests: '60 guests',
    cover: 'weddingReception',
    summary:
      'A stripped-back editorial celebration built on architecture, light and negative space.',
    palette: ['#171615', '#F7F3ED', '#45403B', '#C6A15B'],
    images: [
      { image: 'weddingReception', alt: 'Reception space styled with suspended florals and warm lighting.' },
      { image: 'venueInteriorAlt', alt: 'Architectural interior detail framing the ceremony.' },
      { image: 'dinnerTable', alt: 'A long candlelit table set for the evening celebration.' },
      { image: 'dinnerPlate', alt: 'Plated course served during the dinner service.' },
    ],
  },
  {
    id: 'black-tie-affair',
    name: 'Black Tie Affair',
    category: 'corporate',
    location: 'Harare, Zimbabwe',
    year: '2025',
    guests: '220 guests',
    cover: 'corporateStage',
    summary:
      'A black-tie executive dinner with a theatrical stage reveal for a leadership summit.',
    palette: ['#100F0E', '#C6A15B', '#171615', '#7D766F'],
    images: [
      { image: 'corporateStage', alt: 'Executive stage set for the leadership summit address.' },
      { image: 'celebrationIntimate', alt: 'Private dining room prepared for the black-tie dinner.' },
      { image: 'dinnerCocktail', alt: 'Cocktails served at the reception bar before dinner.' },
      { image: 'corporateBriefing', alt: 'Leadership team in conversation during the evening.' },
    ],
  },
  {
    id: 'champagne-dinner',
    name: 'The Champagne Dinner',
    category: 'editorial',
    location: 'Mutare, Zimbabwe',
    year: '2024',
    guests: '48 guests',
    cover: 'dinnerTable',
    summary:
      'A candlelit long-table dinner for forty-eight guests, styled entirely in ivory and candlelight.',
    palette: ['#F7F3ED', '#DDBD83', '#EFE8DE', '#171615'],
    images: [
      { image: 'dinnerTable', alt: 'Candlelit long table set for forty-eight guests.' },
      { image: 'dinnerWine', alt: 'Champagne service during the dinner course.' },
      { image: 'craftDetail', alt: 'Detail of crystal glassware and taper candles.' },
      { image: 'floralArrangement', alt: 'Low seasonal arrangement used as a centrepiece.' },
    ],
  },
  {
    id: 'product-launch',
    name: 'Aurora Product Launch',
    category: 'corporate',
    location: 'Harare, Zimbabwe',
    year: '2026',
    guests: '320 guests',
    cover: 'corporateMeeting',
    summary:
      'A launch experience that translated a technology brand into a warm, tactile environment.',
    palette: ['#171615', '#C6A15B', '#45403B', '#F7F3ED'],
    images: [
      { image: 'corporateMeeting', alt: 'Leadership team gathered in the styled launch space.' },
      { image: 'corporateTalk', alt: 'Founder presenting the product to assembled guests.' },
      { image: 'corporateOffice', alt: 'Contemporary welcome area styled to brand guidelines.' },
      { image: 'venueInteriorSoft', alt: 'Minimal interior detail used in the product reveal area.' },
    ],
  },
  {
    id: 'milestone-birthday',
    name: 'The Milestone Birthday',
    category: 'private',
    location: 'Kariba, Zimbabwe',
    year: '2025',
    guests: '150 guests',
    cover: 'celebrationBalloons',
    summary:
      'A landmark birthday staged as an evening celebration with a fully transformed terrace.',
    palette: ['#C6A15B', '#171615', '#B8AA98', '#100F0E'],
    images: [
      { image: 'celebrationBalloons', alt: 'Balloons and confetti styled across the terrace.' },
      { image: 'celebrationConfetti', alt: 'Guests celebrating as confetti falls at the party.' },
      { image: 'celebrationIntimate', alt: 'Lounge area prepared for the evening celebration.' },
      { image: 'celebrationCake', alt: 'Celebration table styled with fresh flowers and glassware.' },
    ],
  },
  {
    id: 'garden-ivory',
    name: 'Garden & Ivory',
    category: 'weddings',
    location: 'Karuru, Zimbabwe',
    year: '2024',
    guests: '180 guests',
    cover: 'weddingFloral',
    summary:
      'A full-scale garden wedding where every installation was grown on site over four months.',
    palette: ['#EFE8DE', '#F7F3ED', '#B8AA98', '#C6A15B'],
    images: [
      { image: 'weddingFloral', alt: 'Ceremony installation grown on site for the garden wedding.' },
      { image: 'weddingDress', alt: 'Ivory floral styling detail with soft white blooms.' },
      { image: 'craftBanquet', alt: 'Long dining tables dressed in ivory linens.' },
      { image: 'venueLobby', alt: 'Arrival space styled with sculptural lighting.' },
    ],
  },
  {
    id: 'conference-series',
    name: 'Meridian Conference Series',
    category: 'corporate',
    location: 'Harare, Zimbabwe',
    year: '2024',
    guests: '600 guests',
    cover: 'corporateOffice',
    summary:
      'A two-day conference series built on a modular scenic system that transformed daily.',
    palette: ['#171615', '#45403B', '#C6A15B', '#7D766F'],
    images: [
      { image: 'corporateOffice', alt: 'Contemporary venue interior hosting the conference series.' },
      { image: 'corporateStage', alt: 'Main stage configured for a conference session.' },
      { image: 'corporateTable', alt: 'Networking tables arranged for delegate breakouts.' },
      { image: 'venueRoom', alt: 'Quiet styling detail in the delegate lounge.' },
    ],
  },
  {
    id: 'diamond-anniversary',
    name: 'Diamond Anniversary',
    category: 'private',
    location: 'Bulawayo, Zimbabwe',
    year: '2023',
    guests: '90 guests',
    cover: 'floralWhite',
    summary:
      'Sixty years of marriage marked with an ivory, gold and heirloom-inspired evening.',
    palette: ['#F7F3ED', '#C6A15B', '#DDBD83', '#B8AA98'],
    images: [
      { image: 'floralWhite', alt: 'White floral study defining the anniversary palette.' },
      { image: 'dinnerTable', alt: 'Anniversary dinner table dressed in ivory and gold.' },
      { image: 'celebrationIntimate', alt: 'Private room prepared for the anniversary guests.' },
      { image: 'craftDetail', alt: 'Detail of the table composition before guests arrived.' },
    ],
  },
  {
    id: 'editorial-studio',
    name: 'Atelier Editorial',
    category: 'editorial',
    location: 'Harare, Zimbabwe',
    year: '2026',
    guests: 'Creative showcase',
    cover: 'venueInteriorAlt',
    summary:
      'A self-initiated editorial study of our own work, photographed as a design story.',
    palette: ['#171615', '#B8AA98', '#F7F3ED', '#45403B'],
    images: [
      { image: 'venueInteriorAlt', alt: 'Editorial study of light and timber in a styled interior.' },
      { image: 'venueInterior', alt: 'Contemporary interior with warm timber and neutral finishes.' },
      { image: 'floralArrangement', alt: 'Sculptural floral arrangement used in the editorial series.' },
      { image: 'venueSuite', alt: 'Styled suite photographed as part of the editorial study.' },
    ],
  },
]

/** Projects promoted on the homepage, in the order the brief specifies. */
export const featuredProjectIds = [
  'ivory-wedding',
  'golden-evening-gala',
  'garden-celebration',
  'modern-romance',
  'black-tie-affair',
  'champagne-dinner',
]

export const featuredProjects = featuredProjectIds.map((id) =>
  projects.find((project) => project.id === id),
)

export function getProjectById(id) {
  return projects.find((project) => project.id === id)
}

export function filterProjects(categoryId) {
  if (!categoryId || categoryId === 'all') return projects
  return projects.filter((project) => project.category === categoryId)
}
