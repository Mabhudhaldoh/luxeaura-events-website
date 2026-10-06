import Seo from '../components/seo/Seo'
import Reveal from '../components/ui/Reveal'
import PageHero from '../components/sections/PageHero'
import CtaBand from '../components/sections/CtaBand'
import { contact } from '../data/site'
import styles from './Privacy.module.css'

/** Placeholder policy content. Replace with reviewed legal copy before launch. */
const SECTIONS = [
  {
    heading: 'Information we collect',
    body: 'When you submit an enquiry we collect the details you choose to give us: your name, email address, phone number, event type, preferred date, estimated guest count, budget range and the description of your vision. We do not collect payment details through this website.',
  },
  {
    heading: 'How we use your information',
    body: 'Your details are used only to respond to your enquiry, prepare a proposal and, if you become a client, to plan and deliver your event. We do not sell your information and we do not share it with third parties except where a supplier is genuinely required in order to deliver your commission.',
  },
  {
    heading: 'Cookies and analytics',
    body: 'This website does not use advertising cookies. If analytics are introduced in the future, this policy will be updated before they are enabled, and any data will be processed in aggregate.',
  },
  {
    heading: 'How long we keep your details',
    body: 'Enquiry records are retained for twenty-four months so that we can pick up a conversation where it was left. Client records are retained for seven years to meet our contractual and legal obligations.',
  },
  {
    heading: 'Your rights',
    body: 'You may ask us at any time to confirm what we hold about you, to correct it, or to delete it. Write to us using the email address below and we will respond within thirty days.',
  },
  {
    heading: 'Contacting us about your data',
    body: `Questions about this policy, or about anything we do with your information, can be sent to ${contact.email} or by post to ${contact.locationLine2}, ${contact.location}.`,
  },
]

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How LuxeAura Events collects, uses and protects the information you share with us when making an enquiry."
        path="/privacy"
      />

      <PageHero
        eyebrow="Legal"
        title="Privacy"
        accent="Policy."
        intro="We collect the minimum we need to answer your enquiry and, if we work together, to plan your event properly. This page explains exactly what that means."
        image="pageContact"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]}
      />

      <section className="section" aria-labelledby="privacy-body">
        <div className="container container--narrow">
          <Reveal as="p" className={styles.updated}>
            Last updated: 1 January 2026
          </Reveal>

          <div className={styles.toc}>
            <h2 className="visually-hidden" id="privacy-body">
              Policy sections
            </h2>
            <ol>
              {SECTIONS.map((section, index) => (
                <li key={section.heading}>
                  <a href={`#section-${index + 1}`}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.sections}>
            {SECTIONS.map((section, index) => (
              <Reveal
                key={section.heading}
                id={`section-${index + 1}`}
                className={styles.section}
                delay={index * 60}
              >
                <h2 className={styles.heading}>
                  <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                  {section.heading}
                </h2>
                <p className={styles.body}>{section.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.note}>
            <p>
              This is placeholder copy prepared for demonstration purposes and is not legal advice. Replace it
              with a policy reviewed for your jurisdiction before publishing this site.
            </p>
            <a href={`mailto:${contact.email}`} className={styles.noteLink}>
              {contact.email}
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Any Questions at All?"
        text="If anything here is unclear, or you would simply prefer to speak to someone before you write, we are happy to talk."
        image="venueRoom"
      />
    </>
  )
}
