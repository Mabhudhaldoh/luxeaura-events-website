import { Link } from 'react-router-dom'
import Logo from './Logo'
import NewsletterForm from '../forms/NewsletterForm'
import { site, contact, businessHours, footerNav, legalLinks, socialLinks } from '../../data/site'
import styles from './Footer.module.css'

export default function Footer() {
  const established = site.foundedYear

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand + positioning */}
        <div className={styles.brand}>
          <Logo tone="dark" />
          <p className={styles.tagline}>
            Creating extraordinary experiences through thoughtful design.
          </p>
          <ul className={styles.social}>
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer noopener">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation columns */}
        <nav className={styles.columns} aria-label="Footer">
          {footerNav.map((column) => (
            <div key={column.heading} className={styles.column}>
              <h2 className={styles.columnHeading}>{column.heading}</h2>
              <ul className={styles.columnList}>
                {column.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link to={link.to} className={styles.columnLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={styles.column}>
            <h2 className={styles.columnHeading}>Newsletter</h2>
            <NewsletterForm />
          </div>
        </nav>
      </div>

      {/* Contact strip */}
      <div className={styles.contactStrip}>
        <div className={styles.stripInner}>
          <div className={styles.stripItem}>
            <span className={styles.stripLabel}>Email</span>
            <a href={`mailto:${contact.email}`} className={styles.stripValue}>
              {contact.email}
            </a>
          </div>
          <div className={styles.stripItem}>
            <span className={styles.stripLabel}>Telephone</span>
            <a href={`tel:${contact.phoneHref}`} className={styles.stripValue}>
              {contact.phone}
            </a>
          </div>
          <div className={styles.stripItem}>
            <span className={styles.stripLabel}>Studio</span>
            <span className={styles.stripValue}>{contact.location}</span>
          </div>
          <div className={styles.stripItem}>
            <span className={styles.stripLabel}>Hours</span>
            <span className={styles.stripValue}>
              {businessHours[0].days} · {businessHours[0].hours}
            </span>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className={styles.legal}>
        <p>
          &copy; {site.copyrightYear} {site.name}. All Rights Reserved. Established {established}.
        </p>
        <ul className={styles.legalLinks}>
          {legalLinks.map((link) => (
            <li key={link.to}>
              {link.external ? (
                <a href={link.to}>{link.label}</a>
              ) : (
                <Link to={link.to}>{link.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
