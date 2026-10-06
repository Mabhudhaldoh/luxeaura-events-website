import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { processSteps } from '../../data/process'
import styles from './Process.module.css'

export default function Process() {
  return (
    <section className="section" aria-labelledby="process-heading">
      <div className="container">
        <SectionHeading
          eyebrow="05 — How We Work"
          title="Our"
          accent="Process"
          intro="Four stages, one continuous conversation. You always know where the project is, what happens next and who owns it."
          align="center"
        />

        <ol className={styles.steps}>
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.index} className={styles.step} delay={index * 120}>
              <div className={styles.marker} aria-hidden="true">
                <span className={styles.index}>{step.index}</span>
              </div>

              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.duration}>{step.duration}</p>
              <p className={styles.description}>{step.description}</p>

              <ul className={styles.deliverables}>
                {step.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
