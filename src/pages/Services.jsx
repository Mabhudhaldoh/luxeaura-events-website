import Seo from '../components/seo/Seo'
import PageHero from '../components/sections/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import SmartImage from '../components/ui/SmartImage'
import Button from '../components/ui/Button'
import CtaBand from '../components/sections/CtaBand'
import { services } from '../data/services'
import { processSteps } from '../data/process'
import styles from './Services.module.css'

export default function Services() {
  return (
    <>
      <Seo
        title="Luxury Event Design Services"
        description="Luxury weddings, corporate events, private celebrations, floral design, venue styling and creative direction — bespoke event design from LuxeAura Events in Harare."
        path="/services"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'LuxeAura Events — Services',
          itemListElement: services.map((service, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Service',
              name: service.title,
              description: service.description,
              url: `https://luxeauraevents.com/services#${service.slug}`,
            },
          })),
        }}
      />

      <PageHero
        eyebrow="What We Do"
        title="Design With"
        accent="Intention."
        intro="Six services, one studio, and a single standard of finish. Each one is delivered by the same founding team, from the first sketch to the last candle."
        image="pageServices"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />

      {/* --- Service index ------------------------------------------------ */}
      <section className="section section--tight" aria-labelledby="services-list-heading">
        <div className="container">
          <h2 id="services-list-heading" className="visually-hidden">
            All services
          </h2>

          <ul className={styles.index}>
            {services.map((service, index) => (
              <Reveal as="li" key={service.slug} delay={index * 70}>
                <a href={`#${service.slug}`} className={styles.indexLink}>
                  <span className={styles.indexNumber}>{service.index}</span>
                  <span className={styles.indexTitle}>{service.title}</span>
                  <span className={styles.indexArrow} aria-hidden="true">
                    ↓
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* --- Detailed services -------------------------------------------- */}
      {services.map((service, index) => (
        <ServiceDetail
          key={service.slug}
          service={service}
          reversed={index % 2 === 1}
          sequence={index}
        />
      ))}

      {/* --- Process recap ------------------------------------------------- */}
      <section className="section section--ivory-deep" aria-labelledby="services-process-heading">
        <div className="container container--narrow">
          <SectionHeading
            eyebrow="How We Work"
            title="From first call"
            accent="to final detail"
            align="center"
          />

          <ol className={styles.process}>
            {processSteps.map((step, index) => (
              <Reveal as="li" key={step.index} className={styles.processStep} delay={index * 90}>
                <span className={styles.processIndex}>{step.index}</span>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processBody}>{step.description}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className={styles.processCta} delay={300}>
            <Button to="/contact" variant="primary" size="lg">
              Start Your Enquiry
            </Button>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Tell Us What You Are Imagining."
        text="Every commission begins with a conversation. Share your date, your venue and the feeling you want, and we will come back with a direction."
        image="venueSuite"
      />
    </>
  )
}

/** One full service block: alternating image / copy with feature list and CTA. */
function ServiceDetail({ service, reversed, sequence }) {
  return (
    <section
      id={service.slug}
      className={`section ${sequence % 2 === 1 ? 'section--ivory-deep' : ''}`}
      aria-labelledby={`${service.slug}-heading`}
    >
      <div className="container">
        <div className={`${styles.detail} ${reversed ? styles.detailReversed : ''}`}>
          <Reveal className={styles.detailMedia} variant="clip">
            <SmartImage
              name={service.image}
              ratio={reversed ? '5 / 4' : '4 / 5'}
              widths={[480, 720, 960]}
              sizes="(max-width: 900px) 100vw, 46vw"
            />
            <span className={styles.detailBadge} aria-hidden="true">
              {service.index}
            </span>
          </Reveal>

          <div className={styles.detailCopy}>
            <Reveal as="p" className="t-eyebrow">
              Service {service.index}
            </Reveal>

            <Reveal as="h2" id={`${service.slug}-heading`} className="t-display" delay={80}>
              {service.title}
            </Reveal>

            <Reveal as="p" className="t-lead" delay={140}>
              {service.description}
            </Reveal>

            <Reveal as="h3" className={styles.featuresHeading} delay={200}>
              What is included
            </Reveal>
            <Reveal as="ul" className={styles.features} delay={260}>
              {service.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </Reveal>

            <Reveal className={styles.detailFooter} delay={320}>
              <p className={styles.timeline}>
                <span className={styles.timelineLabel}>Typical timeline</span>
                {service.timeline}
              </p>
              <Button to="/contact" variant="ghost" size="sm">
                Enquire about {service.shortTitle.toLowerCase()}
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
