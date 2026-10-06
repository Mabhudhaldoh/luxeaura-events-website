import Reveal from '../ui/Reveal'
import SmartImage from '../ui/SmartImage'
import Button from '../ui/Button'
import styles from './Intro.module.css'

const paragraphs = [
  'LuxeAura creates bespoke experiences through thoughtful design, refined styling and attention to detail. We begin by understanding the feeling you want your guests to carry home, then build every element of the day around it.',
  'Our work lives at the intersection of architecture and emotion — considered enough to feel effortless, personal enough to feel entirely yours.',
]

export default function Intro() {
  return (
    <section className="section" aria-labelledby="intro-heading">
      <div className="container">
        <div className={styles.grid}>
          {/* Copy */}
          <div className={styles.copy}>
            <Reveal as="p" className="t-eyebrow" delay={0}>
              01 — The Studio
            </Reveal>

            <Reveal as="h2" id="intro-heading" className="t-display" delay={80}>
              Designed With Intention.
              <br />
              Celebrated With <span className="t-accent">Emotion.</span>
            </Reveal>

            {paragraphs.map((text, index) => (
              <Reveal as="p" key={text.slice(0, 24)} className={`t-lead ${styles.paragraph}`} delay={160 + index * 90}>
                {text}
              </Reveal>
            ))}

            <Reveal className={styles.actions} delay={340}>
              <Button to="/about" variant="ghost" size="sm">
                Our Story
              </Button>
              <Button to="/services" variant="ghost" size="sm">
                What We Do
              </Button>
            </Reveal>
          </div>

          {/* Asymmetric image pair */}
          <div className={styles.visual}>
            <Reveal className={styles.primary} variant="clip" delay={120}>
              <SmartImage
                name="intro"
                ratio="3 / 4"
                widths={[480, 720, 960]}
                sizes="(max-width: 900px) 100vw, 46vw"
              />
            </Reveal>

            <Reveal className={styles.secondary} variant="clip" delay={280}>
              <SmartImage
                name="introDetail"
                ratio="4 / 3"
                widths={[360, 520, 640]}
                sizes="(max-width: 900px) 60vw, 24vw"
              />
            </Reveal>

            <Reveal className={styles.caption} delay={420}>
              <span className={styles.captionRule} aria-hidden="true" />
              <span>
                Twelve years of considered
                <br />
                event design in Zimbabwe
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
