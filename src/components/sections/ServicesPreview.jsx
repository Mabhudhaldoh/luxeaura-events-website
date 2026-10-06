import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '../cards/ServiceCard'
import Button from '../ui/Button'
import { featuredServices } from '../../data/services'
import styles from './ServicesPreview.module.css'

export default function ServicesPreview() {
  return (
    <section className="section section--ivory-deep" aria-labelledby="services-heading">
      <div className="container">
        <div className={styles.header}>
          <SectionHeading
            eyebrow="02 — Services"
            title="What We"
            accent="Create"
            intro="Four disciplines, one standard of finish. Each engagement is shaped around the room you are given and the story you want to tell inside it."
          />

          <Reveal delay={200}>
            <Button to="/services" variant="ghost" size="sm" icon={<ArrowIcon />}>
              View All Services
            </Button>
          </Reveal>
        </div>

        <ul className={styles.grid}>
          {featuredServices.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={index * 110}>
              <ServiceCard service={service} variant="compact" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
      <path
        d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
