import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import PortfolioCard from '../cards/PortfolioCard'
import Button from '../ui/Button'
import { featuredProjects } from '../../data/portfolio'
import styles from './FeaturedWork.module.css'

/**
 * Deliberately uneven editorial grid — six projects across four mixed
 * columns so the row reads as a composed layout rather than a card list.
 */
const LAYOUT = [
  { size: 'hero', span: 'wide' },
  { size: 'tall', span: 'tall' },
  { size: 'standard', span: 'standard' },
  { size: 'wide', span: 'wide' },
  { size: 'tall', span: 'tall' },
  { size: 'standard', span: 'standard' },
]

export default function FeaturedWork() {
  return (
    <section className="section" aria-labelledby="featured-work-heading">
      <div className="container container--wide">
        <div className={styles.header}>
          <SectionHeading
            eyebrow="03 — Selected Work"
            title="Recent"
            accent="Celebrations"
            intro="A selection of recent commissions across weddings, corporate evenings and private celebrations."
          />
          <Reveal delay={200}>
            <Button to="/portfolio" variant="ghost" size="sm">
              View Full Portfolio
            </Button>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {featuredProjects.map((project, index) => {
            const slot = LAYOUT[index % LAYOUT.length]
            return (
              <Reveal
                key={project.id}
                className={`${styles.cell} ${styles[`cell${slot.span[0].toUpperCase()}${slot.span.slice(1)}`]}`}
                variant="clip"
                delay={(index % 3) * 120}
              >
                <PortfolioCard project={project} size={slot.size} priority={index < 2} />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
