import { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Seo from '../components/seo/Seo'
import PageHero from '../components/sections/PageHero'
import Reveal from '../components/ui/Reveal'
import PortfolioCard from '../components/cards/PortfolioCard'
import Lightbox from '../components/gallery/Lightbox'
import CtaBand from '../components/sections/CtaBand'
import { categories, projects, filterProjects } from '../data/portfolio'
import styles from './Portfolio.module.css'

/** Counts per category, shown beside each filter. */
const COUNTS = categories.reduce((acc, category) => {
  acc[category.id] = category.id === 'all' ? projects.length : filterProjects(category.id).length
  return acc
}, {})

/** Mixed footprints keep the grid from looking like a uniform card wall. */
const SIZE_CYCLE = ['hero', 'tall', 'standard', 'tall', 'wide', 'standard']

export default function Portfolio() {
  const location = useLocation()
  const navigate = useNavigate()
  const [category, setCategory] = useState('all')

  const visible = useMemo(() => filterProjects(category), [category])

  /*
   * The URL hash is the single source of truth for the open viewer. Deep links
   * (`/portfolio#project-id`) therefore work with no effect at all, the link
   * stays shareable while the viewer is open, and the browser back button
   * closes it exactly as a visitor would expect.
   */
  const hashId = location.hash.replace('#', '')
  const openProject = useMemo(
    () => projects.find((project) => project.id === hashId) ?? null,
    [hashId],
  )

  const openInViewer = useCallback(
    (id) => navigate({ pathname: location.pathname, hash: id }),
    [location.pathname, navigate],
  )

  const closeLightbox = useCallback(
    () => navigate({ pathname: location.pathname, hash: '' }, { replace: true }),
    [location.pathname, navigate],
  )

  const activeCategory = categories.find((item) => item.id === category)

  return (
    <>
      <Seo
        title="Event Design Portfolio"
        description="Browse selected LuxeAura Events commissions — luxury weddings, corporate galas, private celebrations and editorial event styling in Zimbabwe."
        path="/portfolio"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'LuxeAura Events — Portfolio',
          url: 'https://luxeauraevents.com/portfolio',
        }}
      />

      <PageHero
        eyebrow="Selected Work"
        title="A Record of"
        accent="Craft."
        intro="Every commission below was designed, detailed and delivered by our own studio. Open any project to browse the full gallery."
        image="pagePortfolio"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Portfolio' }]}
      />

      {/* --- Filters ----------------------------------------------------- */}
      <section className={styles.filterBar} aria-label="Filter projects by category">
        <div className="container">
          <div className={styles.filters} role="group" aria-label="Portfolio categories">
            {categories.map((item) => {
              const isActive = item.id === category
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.filter} ${isActive ? styles.filterActive : ''}`}
                  aria-pressed={isActive}
                  onClick={() => setCategory(item.id)}
                >
                  {item.label}
                  <span className={styles.filterCount}>{COUNTS[item.id]}</span>
                </button>
              )
            })}
          </div>

          <p className={styles.resultCount} role="status" aria-live="polite">
            Showing {visible.length} project{visible.length === 1 ? '' : 's'}
            {activeCategory?.id !== 'all' ? ` in ${activeCategory.label}` : ''}
          </p>
        </div>
      </section>

      {/* --- Grid -------------------------------------------------------- */}
      <section className="section section--tight" aria-label="Portfolio projects">
        <div className="container container--wide">
          <ul className={styles.grid} key={category}>
            {visible.map((project, index) => (
              <Reveal
                as="li"
                key={project.id}
                className={styles.cell}
                variant="clip"
                delay={Math.min(index, 5) * 90}
              >
                <PortfolioCard
                  project={project}
                  size={SIZE_CYCLE[index % SIZE_CYCLE.length]}
                  priority={index < 3}
                  showCount
                  onOpen={() => openInViewer(project.id)}
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* --- Enquiry prompt ---------------------------------------------- */}
      <section className={`section section--ivory-deep ${styles.enquiry}`}>
        <div className="container container--narrow text-center">
          <Reveal as="h2" className="t-display">
            Want something <span className="t-accent">like this?</span>
          </Reveal>
          <Reveal as="p" className={`t-lead ${styles.enquiryText}`} delay={100}>
            We take on a limited number of commissions each year so that every one is given the attention you
            would expect from a studio of this size.
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Let's Create Something Extraordinary."
        text="Tell us what you have in mind and we will send you a tailored lookbook within five working days."
        image="venueInteriorAlt"
      />

      <Lightbox project={openProject} onClose={closeLightbox} />
    </>
  )
}
