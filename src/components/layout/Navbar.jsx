import { useCallback, useId, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import Button from '../ui/Button'
import { navLinks, contact, socialLinks } from '../../data/site'
import { useScrolled } from '../../hooks/useScrolled'
import { useScrollLock } from '../../hooks/useScrollLock'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import styles from './Navbar.module.css'

const cx = (...values) => values.filter(Boolean).join(' ')

/** Routes that open with a full-bleed hero, so the bar starts transparent. */
const OVERLAY_ROUTES = new Set(['/'])

export default function Navbar() {
  const location = useLocation()
  // useId returns characters that are awkward inside selectors; normalise it.
  const menuId = `mobile-menu${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(28)

  /*
   * A route change should always dismiss the mobile menu. Adjusting state
   * during render (React's documented alternative to a "sync on prop change"
   * effect) closes it in the same commit as the navigation, so the overlay
   * never paints over the incoming page.
   */
  const [menuPath, setMenuPath] = useState(location.pathname)
  if (menuPath !== location.pathname) {
    setMenuPath(location.pathname)
    if (open) setOpen(false)
  }

  useScrollLock(open)

  const close = useCallback(() => setOpen(false), [])
  const trapRef = useFocusTrap(open, { onEscape: close })

  // Over the top of a full-bleed hero the bar is transparent; everywhere else
  // it is solid. Once scrolled, or while the menu overlay is open, it is always
  // sitting on dark pixels so its contents must stay light.
  const transparent = OVERLAY_ROUTES.has(location.pathname) && !scrolled && !open
  const tone = transparent || open ? 'light' : 'dark'

  return (
    <>
      <header
        className={cx(
          styles.header,
          transparent ? styles.transparent : styles.solid,
          open && styles.menuOpen,
        )}
      >
        <div className={styles.inner}>
          <Logo tone={tone} />

          <nav className={styles.desktopNav} aria-label="Primary">
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cx(styles.navLink, isActive && styles.navLinkActive)
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <Button
              to="/contact"
              variant="outline"
              size="sm"
              tone={tone}
              className={styles.headerCta}
            >
              Plan Your Event
            </Button>

            <button
              type="button"
              className={styles.burger}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              <span className={styles.burgerInner} data-open={open}>
                <span className={styles.burgerLine} />
                <span className={styles.burgerLine} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id={menuId}
        ref={trapRef}
        className={cx(styles.mobileMenu, open && styles.mobileMenuOpen)}
        inert={!open}
      >
        <div className={styles.menuInner}>
          <nav aria-label="Mobile">
            <ul className={styles.mobileList}>
              {navLinks.map((link, index) => (
                <li key={link.to} style={{ '--i': index }}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cx(styles.mobileLink, isActive && styles.mobileLinkActive)
                    }
                  >
                    <span className={styles.mobileIndex}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.menuFooter}>
            <Button to="/contact" variant="secondary" size="lg">
              Plan Your Event
            </Button>

            <a className={styles.menuEmail} href={`mailto:${contact.email}`}>
              {contact.email}
            </a>

            <ul className={styles.menuSocial}>
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noreferrer noopener">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
