import Seo from '../components/seo/Seo'
import PageHero from '../components/sections/PageHero'
import Reveal from '../components/ui/Reveal'
import ContactForm from '../components/forms/ContactForm'
import Button from '../components/ui/Button'
import { contact, businessHours, site } from '../data/site'
import { processSteps } from '../data/process'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact & Enquiries"
        description="Start a conversation with LuxeAura Events. Tell us about your wedding, corporate event or private celebration in Harare, Zimbabwe and receive a tailored proposal."
        path="/contact"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact LuxeAura Events',
          url: `${site.url}/contact`,
        }}
      />

      <PageHero
        eyebrow="Contact"
        title="Let's Bring Your"
        accent="Vision to Life."
        intro="Every commission begins with a conversation. Share a little about your event and we will come back with a considered direction within five working days."
        image="pageContact"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      {/* --- Details + form ------------------------------------------------ */}
      <section className="section" aria-labelledby="enquiry-heading">
        <div className="container">
          <div className={styles.grid}>
            {/* Details column */}
            <div className={styles.details}>
              <Reveal as="p" className="t-eyebrow">
                The Studio
              </Reveal>
              <Reveal as="h2" id="enquiry-heading" className={styles.detailsTitle} delay={60}>
                Get in touch
              </Reveal>

              <Reveal as="ul" className={styles.contactList} delay={140}>
                <li>
                  <span className={styles.contactLabel}>Email</span>
                  <a className={styles.contactLink} href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </li>
                <li>
                  <span className={styles.contactLabel}>Telephone</span>
                  <a className={styles.contactLink} href={`tel:${contact.phoneHref}`}>
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <span className={styles.contactLabel}>Studio</span>
                  <span className={styles.contactValue}>{contact.locationLine2}</span>
                  <span className={styles.contactValue}>{contact.location}</span>
                </li>
              </Reveal>

              <Reveal className={styles.hours} delay={220}>
                <h3 className={styles.hoursHeading}>Business Hours</h3>
                <ul>
                  {businessHours.map((entry) => (
                    <li key={entry.days}>
                      <span>{entry.days}</span>
                      <span>{entry.hours}</span>
                    </li>
                  ))}
                </ul>
                <p className={styles.response}>{contact.responseTime}</p>
              </Reveal>

              <Reveal className={styles.detailsCta} delay={300}>
                <Button href={`tel:${contact.phoneHref}`} variant="ghost" size="sm">
                  Prefer to talk? Call the studio
                </Button>
              </Reveal>
            </div>

            {/* Form column */}
            <div className={styles.formColumn}>
              <Reveal as="h2" className={styles.formTitle} delay={60}>
                Send your enquiry
              </Reveal>
              <Reveal as="p" className={styles.formIntro} delay={120}>
                Fields marked <span aria-hidden="true">*</span> are required. The more detail you share,
                the more specific our first proposal will be.
              </Reveal>

              <Reveal delay={180}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- What happens next --------------------------------------------- */}
      <section className="section section--ivory-deep" aria-labelledby="next-heading">
        <div className="container">
          <div className={styles.next}>
            <div className={styles.nextIntro}>
              <Reveal as="p" className="t-eyebrow">
                After You Send
              </Reveal>
              <Reveal as="h2" id="next-heading" className="t-display" delay={80}>
                What happens <span className="t-accent">next</span>
              </Reveal>
              <Reveal as="p" className="t-lead" delay={160}>
                No obligation, no pressure and no automated sales sequence. Just a considered response from
                the studio within one business day.
              </Reveal>
            </div>

            <ol className={styles.nextList}>
              {processSteps.map((step, index) => (
                <Reveal as="li" key={step.index} className={styles.nextStep} delay={index * 90}>
                  <span className={styles.nextIndex}>{step.index}</span>
                  <div>
                    <h3 className={styles.nextTitle}>{step.title}</h3>
                    <p className={styles.nextBody}>{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* --- Map-style location band --------------------------------------- */}
      <section className={styles.locationBand} aria-label="Studio location">
        <div className={styles.locationGrid}>
          <Reveal className={styles.locationCopy}>
            <p className="t-eyebrow">Where to find us</p>
            <h2 className={styles.locationTitle}>
              {contact.locationLine2}
              <br />
              <span className="t-accent">{contact.location}</span>
            </h2>
            <p className={styles.locationBody}>
              We take meetings at the studio by appointment, and travel throughout Zimbabwe and regionally
              for destination commissions.
            </p>
            <Button
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${contact.locationLine2}, ${contact.location}`,
              )}`}
              variant="ghost"
              size="sm"
            >
              Open in Maps
            </Button>
          </Reveal>

          {/* Decorative locator panel — no third-party map script required. */}
          <Reveal className={styles.locator} delay={140}>
            <div className={styles.locatorInner}>
              <span className={styles.locatorCross} aria-hidden="true" />
              <span className={styles.locatorDot} aria-hidden="true" />
              <p className={styles.locatorLabel}>{contact.location}</p>
              <p className={styles.locatorCoords}>17.8252° S, 31.0335° E</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
