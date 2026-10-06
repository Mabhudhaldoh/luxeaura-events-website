import { Link } from 'react-router-dom'
import styles from './Button.module.css'

const cx = (...values) => values.filter(Boolean).join(' ')

/**
 * Button with three visual weights.
 *
 * `to` renders a router <Link> (client-side navigation),
 * `href` renders a plain anchor (external links, mailto, tel),
 * otherwise a real <button> with type="button" by default.
 */
export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  tone = 'light',
  icon = null,
  className,
  ...rest
}) {
  const classes = cx(
    styles.button,
    styles[variant],
    styles[size],
    styles[`tone-${tone}`],
    className,
  )

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
