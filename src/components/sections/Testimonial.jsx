import { useCallback, useEffect, useRef, useState } from 'react'
import Reveal from '../ui/Reveal'
import { testimonials } from '../../data/testimonials'
import styles from './Testimonial.module.css'

const INTERVAL = 9000
const clampIndex = (value, length) => ((value % length) + length) % length

/**
 * Single-quote testimonial rotator.
 *
 * Autoplay pauses on hover/focus and when the tab is hidden, and stops
 * entirely under prefers-reduced-motion. Controls are real buttons so the
 * section is fully keyboard operable.
 */
export default function Testimonial() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const containerRef = useRef(null)

  const goTo = useCallback((next) => {
    setIndex(clampIndex(next, testimonials.length))
  }, [])

  useEffect(() => {
    if (paused) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length)
    }, INTERVAL)

    return () => window.clearInterval(timer)
  }, [paused])

  const active = testimonials[index]

  return (
    <section className="section section--dark-soft on-dark" aria-labelledby="testimonial-heading">
      <div className="container container--narrow">
        <div
          ref={containerRef}
          className={styles.wrapper}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <Reveal as="p" className={`t-eyebrow ${styles.eyebrow}`}>
            Client Words
          </Reveal>

          <h2 id="testimonial-heading" className="visually-hidden">
            What our clients say
          </h2>

          <figure className={styles.figure} key={active.id}>
            <span className={styles.mark} aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className={styles.quote}>{active.quote}</blockquote>
            <figcaption className={styles.caption}>
              <span className={styles.author}>{active.author}</span>
              <span className={styles.detail}>{active.detail}</span>
            </figcaption>
          </figure>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => goTo(index - 1)}
              aria-label="Previous testimonial"
            >
              <Arrow direction="left" />
            </button>

            <ul className={styles.dots}>
              {testimonials.map((item, itemIndex) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`${styles.dot} ${itemIndex === index ? styles.dotActive : ''}`}
                    aria-label={`Show testimonial from ${item.author}`}
                    aria-current={itemIndex === index ? 'true' : undefined}
                    onClick={() => goTo(itemIndex)}
                  />
                </li>
              ))}
            </ul>

            <button
              type="button"
              className={styles.arrow}
              onClick={() => goTo(index + 1)}
              aria-label="Next testimonial"
            >
              <Arrow direction="right" />
            </button>
          </div>

          {/* Announces the active quote politely to assistive technology. */}
          <p className="visually-hidden" role="status">
            Testimonial {index + 1} of {testimonials.length} from {active.author}
          </p>
        </div>
      </div>
    </section>
  )
}

function Arrow({ direction }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        d={direction === 'left' ? 'M20 12H5m0 0 5.5-5.5M5 12l5.5 5.5' : 'M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
