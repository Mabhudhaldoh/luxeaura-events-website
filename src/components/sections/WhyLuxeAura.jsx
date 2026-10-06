import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SmartImage from '../ui/SmartImage'
import { differentiators } from '../../data/differentiators'
import styles from './WhyLuxeAura.module.css'

export default function WhyLuxeAura() {
  return (
    <section className="section section--dark on-dark" aria-labelledby="why-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.intro}>
          <SectionHeading
            eyebrow="04 — Why LuxeAura"
            title="The difference"
            accent="is in the detail"
            intro="Four principles guide every commission we accept. They are not marketing lines — they are the criteria we hold ourselves to when nobody is watching."
            tone="dark"
          />

          <Reveal className={styles.portrait} variant="clip" delay={240}>
            <SmartImage
              name="craftDetail"
              ratio="5 / 4"
              widths={[420, 620, 780]}
              sizes="(max-width: 900px) 100vw, 34vw"
            />
            <figcaption className={styles.caption}>
              Every installation is inspected the evening before the doors open.
            </figcaption>
          </Reveal>
        </div>

        <ol className={styles.list}>
          {differentiators.map((item, index) => (
            <Reveal as="li" key={item.index} className={styles.item} delay={index * 100}>
              <span className={styles.index}>{item.index}</span>
              <div className={styles.body}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
