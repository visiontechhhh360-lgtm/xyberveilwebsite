import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS } from '../config/site'
import { IconArrow, IconClose, IconMenu } from '../components/Icons'
import { Button, Logo } from '../components/ui'
import { homeHref, linkProps } from '../lib/links'
import './Nav.css'

/**
 * Fixed header. Geometry never changes with scroll state — only the opacity
 * of a separate glass layer does — so there is no layout shift or jitter.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [pill, setPill] = useState<{ x: number; w: number; on: boolean }>({ x: 0, w: 0, on: false })
  const linksRef = useRef<HTMLUListElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  // Scroll state: a single boolean, re-rendering only when it actually flips
  useEffect(() => {
    const update = () => {
      const next = window.scrollY > 8
      setScrolled((prev) => (prev === next ? prev : next))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Menu: lock page scroll (scrollbar-gutter keeps the width stable), Esc to
  // close, and close automatically when the viewport grows to desktop width
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('is-menu-open', open)
    if (open) sheetRef.current?.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const mq = window.matchMedia('(min-width: 901px)')
    const onMq = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
      root.classList.remove('is-menu-open')
    }
  }, [open])

  const movePill = (e: React.PointerEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>) => {
    const ul = linksRef.current
    if (!ul) return
    const a = e.currentTarget.getBoundingClientRect()
    const u = ul.getBoundingClientRect()
    setPill({ x: a.left - u.left, w: a.width, on: true })
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__bar">
        <span className="nav__glass" aria-hidden="true" />
        <a href={homeHref('#top')} className="nav__brand" aria-label="Xyberveil home">
          <Logo size={32} />
        </a>

        <nav aria-label="Primary" className="nav__primary">
          <ul ref={linksRef} className="nav__links" onPointerLeave={() => setPill((p) => ({ ...p, on: false }))}>
            <span
              className="nav__pill"
              aria-hidden="true"
              style={{ transform: `translateX(${pill.x}px)`, width: pill.w, opacity: pill.on ? 1 : 0 }}
            />
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a {...linkProps(l.href)} onPointerEnter={movePill} onFocus={movePill} onBlur={() => setPill((p) => ({ ...p, on: false }))}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <Button href={homeHref('#downloads')} size="md" className="nav__cta">Download</Button>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav__toggle-icon nav__toggle-icon--menu"><IconMenu /></span>
            <span className="nav__toggle-icon nav__toggle-icon--close"><IconClose /></span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={sheetRef}
        className="nav__sheet"
        data-open={open}
        inert={!open}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      >
        <div className="nav__sheet-panel">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a {...linkProps(l.href)} onClickCapture={() => setOpen(false)}>
                  <span>{l.label}</span>
                  <IconArrow />
                </a>
              </li>
            ))}
          </ul>
          <Button href={homeHref('#downloads')} size="lg" onClick={() => setOpen(false)} className="nav__sheet-cta">Download Xyberveil</Button>
        </div>
      </div>
    </header>
  )
}
