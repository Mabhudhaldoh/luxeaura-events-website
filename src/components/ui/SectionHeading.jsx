import Reveal from './Reveal'
import styles from './SectionHeading.module.css'

/**
 * Consistent editorial section header: eyebrow, rule, title, optional
 * introduction and action. `align` controls the left/centre/right rhythm.
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  align = 'left',
  tone = 'light',
  action = null,
  as: Tag = 'h2',
  className,
  children,
}) {
  const classes = [
    styles.heading,
    styles[`align-${align}`],
    tone === 'dark' ? styles.toneDark : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {eyebrow ? (
        <Reveal as="p" className="t-eyebrow" delay={0}>
          {eyebrow}
        </Reveal>
      ) : null}

      <Reveal as={Tag} className="t-display" delay={80}>
        {title}
        {accent ? <> <span className="t-accent">{accent}</span></> : null}
      </Reveal>

      {intro ? (
        <Reveal as="p" className={`${styles.intro} t-lead`} delay={160}>
          {intro}
        </Reveal>
      ) : null}

      {children}

      {action ? (
        <Reveal className={styles.action} delay={220}>
          {action}
        </Reveal>
      ) : null}
    </div>
  )
}
