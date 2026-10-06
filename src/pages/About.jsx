import Seo from '../components/seo/Seo'
import PageHero from '../components/sections/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import SmartImage from '../components/ui/SmartImage'
import Button from '../components/ui/Button'
import CtaBand from '../components/sections/CtaBand'
import { site, contact } from '../data/site'
import { story, mission, philosophy, approach, founder, team, stats, commitments } from '../data/studio'
import styles from './About.module.css'

export default function About() {
  return (
    <>
      <Seo
        title="About Our Studio"
        description="Meet LuxeAura Events — a Harare-based event design studio creating bespoke weddings, corporate events and private celebrations with twelve years of experience."
        path="/about"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: `About ${site.name}`,
          url: `${site.url}/about`,
        }}
      />

      <PageHero
        eyebrow="About the Studio"
        title="More Than Events."
        accent="We Create Experiences."
        intro="Founded in Harare in 2014, LuxeAura is a design-led event studio built on restraint, rigour and a deep respect for the people we are styling for."
        image="pageAbout"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      {/* --- Story + stats ------------------------------------------------ */}
      <section className="section" aria-labelledby="story-heading">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyCopy}>
              <Reveal as="p" className="t-eyebrow">
                Our Story
              </Reveal>
              <Reveal as="h2" id="story-heading" className="t-display" delay={80}>
                {story.heading}
              </Reveal>
              {story.paragraphs.map((paragraph, index) => (
                <Reveal as="p" key={paragraph.slice(0, 20)} className="t-lead" delay={160 + index * 80}>
                  {paragraph}
                </Reveal>
              ))}
            </div>

            <Reveal className={styles.storyMedia} variant="clip" delay={140}>
              <SmartImage
                name="venueInteriorAlt"
                ratio="4 / 5"
                widths={[480, 720, 900]}
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </Reveal>
          </div>

          <Reveal className={styles.stats} delay={80}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* --- Mission & philosophy ---------------------------------------- */}
      <section className="section section--ivory-deep" aria-labelledby="mission-heading">
        <div className="container">
          <div className={styles.pillars}>
            {[mission, philosophy].map((pillar, index) => (
              <Reveal key={pillar.label} className={styles.pillar} delay={index * 140}>
                <p className={styles.pillarLabel}>{pillar.label}</p>
                <h2
                  id={index === 0 ? 'mission-heading' : undefined}
                  className={styles.pillarTitle}
                >
                  {pillar.heading}
                </h2>
                <p className={styles.pillarBody}>{pillar.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- Approach ------------------------------------------------------ */}
      <section className="section" aria-labelledby="approach-heading">
        <div className="container">
          <div className="split split--reverse">
            <Reveal className={styles.approachMedia} variant="clip">
              <SmartImage
                name="craftDetail"
                ratio="4 / 5"
                widths={[480, 700, 880]}
                sizes="(max-width: 900px) 100vw, 38vw"
              />
            </Reveal>

            <div className="stack stack--md">
              <SectionHeading eyebrow={approach.label} title={approach.heading} />
              <Reveal as="p" className="t-lead" delay={160}>
                {approach.body}
              </Reveal>
              <Reveal as="ul" className={styles.points} delay={240}>
                {approach.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- Founder ------------------------------------------------------- */}
      <section className="section section--dark on-dark" aria-labelledby="founder-heading">
        <div className="container">
          <div className={styles.founder}>
            <Reveal className={styles.founderMedia} variant="clip">
              <SmartImage
                name={founder.image}
                ratio="4 / 5"
                widths={[480, 700, 880]}
                sizes="(max-width: 900px) 100vw, 36vw"
              />
            </Reveal>

            <div className={styles.founderCopy}>
              <Reveal as="p" className="t-eyebrow">
                Leadership
              </Reveal>
              <Reveal as="h2" id="founder-heading" className="t-display" delay={80}>
                Meet the <span className="t-accent">Creative Director</span>
              </Reveal>
              <Reveal as="p" className={styles.founderName} delay={140}>
                {founder.name} — {founder.role}
              </Reveal>
              {founder.paragraphs.map((paragraph, index) => (
                <Reveal as="p" key={paragraph.slice(0, 20)} className={styles.founderParagraph} delay={200 + index * 90}>
                  {paragraph}
                </Reveal>
              ))}

              <Reveal className={styles.signature} delay={360}>
                <span className={styles.signatureMark} aria-hidden="true">
                  {founder.signature}
                </span>
                <Button to="/contact" variant="outline" size="sm" tone="dark">
                  Work With Us
                </Button>
              </Reveal>
            </div>
          </div>

          {/* --- Commitments ------------------------------------------------ */}
          <Reveal as="ul" className={styles.commitments} delay={120}>
            {commitments.map((item, index) => (
              <li key={item.title} className={styles.commitment}>
                <span className={styles.commitmentIndex}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.commitmentTitle}>{item.title}</h3>
                <p className={styles.commitmentBody}>{item.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* --- Team ---------------------------------------------------------- */}
      <section className="section" aria-labelledby="team-heading">
        <div className="container">
          <SectionHeading
            eyebrow="The Studio"
            title="A small team"
            accent="with a large standard"
            intro="Every LuxeAura event is led by a founding director and supported by a styling team that has worked together for years. You will know exactly who is on your event."
            align="center"
          />

          <ul className={styles.team}>
            {team.map((member, index) => (
              <Reveal as="li" key={member.name} className={styles.member} delay={index * 90}>
                <div className={styles.memberMedia}>
                  <SmartImage
                    name={member.image}
                    ratio="1 / 1"
                    widths={[320, 480, 640]}
                    sizes="(max-width: 640px) 72vw, (max-width: 1024px) 42vw, 22vw"
                    position="50% 30%"
                  />
                </div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
                <p className={styles.memberBio}>{member.bio}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Let's Create Something Extraordinary."
        text={`Tell us about your vision, or call the studio on ${contact.phone} and we will talk it through together.`}
        image="venueInteriorSoft"
        secondary="Email the Studio"
      />
    </>
  )
}
