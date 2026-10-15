import { useLayoutEffect, useRef, type ReactNode } from 'react'
import logoUrl from '../assets/xyberveil-logo-256.webp'
import { SCREENS } from '../config/site'
import './Devices.css'

/**
 * Realistic device system.
 *
 * Every device shares one lighting model (key light from top-left, rim light
 * on the top edge, glare across the glass) and one shadow model (contact +
 * ambient + atmospheric layers via <GroundShadow/>). Screens render real
 * Xyberveil screenshots at their native aspect ratio, or HTML composed at a
 * real design resolution and scaled down uniformly by <ScaledScreen/> — so
 * nothing is ever stretched.
 */

export type DesktopOS = 'mac' | 'windows' | 'linux'
export type PhoneOS = 'ios' | 'android'

/* ---------- Shared pieces ---------- */

export function GroundShadow({ className = '' }: { className?: string }) {
  return (
    <span className={`dev-ground ${className}`} aria-hidden="true">
      <i className="dev-ground__contact" />
      <i className="dev-ground__ambient" />
      <i className="dev-ground__atmos" />
    </span>
  )
}

/** Renders children at a fixed design resolution, scaled to fit the width. */
export function ScaledScreen({ width, height, children }: { width: number; height: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const set = () => el.style.setProperty('--s', String(el.clientWidth / width))
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])
  return (
    <div ref={ref} className="scaled" style={{ aspectRatio: `${width} / ${height}` }}>
      <div className="scaled__inner" style={{ width, height }}>{children}</div>
    </div>
  )
}

/** A real screenshot, fitted without distortion. */
export function Shot({ src, alt = '', eager = false, className = '' }: { src: string; alt?: string; eager?: boolean; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`shot ${className}`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
    />
  )
}

/* ---------- Laptop (16:10 display, 1440×900 design space) ---------- */

export function Laptop({ children, camera = 'notch', className = '' }: { children: ReactNode; camera?: 'notch' | 'dot'; className?: string }) {
  return (
    <div className={`laptop ${className}`}>
      <div className="laptop__lid">
        <div className="laptop__bezel">
          <div className="laptop__screen">
            <ScaledScreen width={1440} height={900}>{children}</ScaledScreen>
            <span className="glare" aria-hidden="true" />
          </div>
          <span className={camera === 'notch' ? 'laptop__notch' : 'laptop__cam'} aria-hidden="true" />
        </div>
      </div>
      <div className="laptop__base" aria-hidden="true">
        <span className="laptop__lip" />
      </div>
      <GroundShadow />
    </div>
  )
}

/* ---------- Desktop display (16:9, 1600×900 design space) ---------- */

export function Monitor({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`monitor ${className}`}>
      <div className="monitor__panel">
        <div className="monitor__bezel">
          <div className="monitor__screen">
            <ScaledScreen width={1600} height={900}>{children}</ScaledScreen>
            <span className="glare" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="monitor__stand" aria-hidden="true">
        <span className="monitor__neck" />
        <span className="monitor__foot" />
      </div>
      <GroundShadow />
    </div>
  )
}

/* ---------- Phone (393×852 screen) ---------- */

export function Phone({ src, os = 'ios', children, className = '', eager = false, alt = '' }: {
  src?: string
  os?: PhoneOS
  children?: ReactNode
  className?: string
  eager?: boolean
  alt?: string
}) {
  return (
    <div className={`phone phone--${os} ${className}`}>
      <span className="phone__btn phone__btn--a" aria-hidden="true" />
      <span className="phone__btn phone__btn--b" aria-hidden="true" />
      <span className="phone__btn phone__btn--c" aria-hidden="true" />
      <div className="phone__frame">
        <div className="phone__screen">
          {src && <Shot src={src} eager={eager} alt={alt} />}
          {os === 'android' && <AndroidStatusBar />}
          {children}
          <span className={os === 'ios' ? 'phone__island' : 'phone__punch'} aria-hidden="true" />
          <span className="glare" aria-hidden="true" />
        </div>
      </div>
      <GroundShadow />
    </div>
  )
}

/**
 * The available screenshots are iOS captures. On an Android frame we cover
 * the iOS status bar with an Android-style one so the device reads correctly.
 */
function AndroidStatusBar() {
  return (
    <div className="phone__android-bar" aria-hidden="true">
      <span>2:08</span>
      <span className="phone__android-icons"><i /><i /><b /></span>
    </div>
  )
}

/* ---------- Desktop environment (inside Laptop / Monitor design space) ---------- */

export function Wallpaper({ os = 'mac', children }: { os?: DesktopOS; children: ReactNode }) {
  return (
    <div className={`wall wall--${os}`}>
      <span className="wall__light" aria-hidden="true" />
      {os === 'mac' && (
        <div className="wall__menubar" aria-hidden="true">
          <span className="wall__menubar-l"><img src={logoUrl} alt="" width={14} height={14} /> Xyberveil</span>
          <span className="wall__menubar-r"><i /><i /><i />Tue 2:08 PM</span>
        </div>
      )}
      {os === 'linux' && (
        <div className="wall__topbar" aria-hidden="true">
          <span />
          <span>Tue 14:08</span>
          <span className="wall__menubar-r"><i /><i /></span>
        </div>
      )}
      <div className="wall__stage">{children}</div>
      {os === 'mac' && (
        <div className="wall__dock" aria-hidden="true">
          <i /><i /><i /><i /><i />
          <b><img src={logoUrl} alt="" width={40} height={40} /></b>
          <i /><i />
        </div>
      )}
      {os === 'windows' && (
        <div className="wall__taskbar" aria-hidden="true">
          <i /><i /><i />
          <b><img src={logoUrl} alt="" width={20} height={20} /></b>
          <i />
          <span className="wall__taskbar-clock">2:08 PM</span>
        </div>
      )}
    </div>
  )
}

/**
 * The real Xyberveil desktop app (Windows/macOS capture, 1200×672 window)
 * placed on an OS desktop. The app draws its own frameless chrome, so the
 * capture is shown as-is at its native aspect ratio; only the surrounding
 * environment (menu bar + dock, or taskbar) and window shadow follow the OS.
 * Pass several `screens` with `active` to cross-fade between captures.
 */
export function DesktopAppScreen({ os = 'mac', screens = [SCREENS.desktop.dashboard], active = 0, eager = false }: {
  os?: DesktopOS
  screens?: string[]
  active?: number
  eager?: boolean
}) {
  return (
    <Wallpaper os={os}>
      <div className={`appwin appwin--${os}`}>
        {screens.map((src, i) => (
          <Shot key={src} src={src} eager={eager} className={i === active ? 'is-on' : ''} />
        ))}
      </div>
    </Wallpaper>
  )
}

/* ---------- Browser (Chrome-style, dark theme) ---------- */

export function BrowserScreen({ popup = false, page, os = 'mac' }: { popup?: boolean; page?: ReactNode; os?: DesktopOS }) {
  return (
    <div className={`browser browser--${os}`}>
      <div className="browser__tabs">
        {os === 'mac' && <span className="win__lights"><i /><i /><i /></span>}
        <span className="browser__tab">
          <i className="browser__favicon" />
          <span>New Tab</span>
          <b>×</b>
        </span>
        <span className="browser__newtab">+</span>
        {os !== 'mac' && <span className="win__ctrl win__ctrl--win"><i /><i /><i /></span>}
      </div>
      <div className="browser__toolbar">
        <span className="browser__nav"><i /><i /><i /></span>
        <span className="browser__omnibox"><i />Search or type a URL</span>
        <span className="browser__exts">
          <span className={`browser__ext ${popup ? 'is-open' : ''}`}><img src={logoUrl} alt="" width={18} height={18} /></span>
          <span className="browser__puzzle" />
          <span className="browser__avatar" />
        </span>
      </div>
      <div className="browser__page">
        {page ?? <PageSkeleton />}
        {popup && (
          <div className="browser__popup">
            <Shot src={SCREENS.homePopup} />
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * A believable, unbranded website shown in the browser (dark mode so it sits
 * naturally in the scene). Generic editorial content — not a real site.
 */
export function PageSkeleton() {
  return (
    <div className="page" aria-hidden="true">
      <header className="page__nav">
        <span className="page__brand"><i />Northline</span>
        <nav><span>World</span><span>Travel</span><span>Tech</span><span>Culture</span></nav>
        <span className="page__btn">Subscribe</span>
      </header>
      <div className="page__hero">
        <div className="page__lead">
          <div className="page__img page__img--a" />
          <small>Travel</small>
          <h3>Slow mornings in coastal towns</h3>
          <p>A quieter way to spend a long weekend by the sea, from early markets to late walks along the harbour.</p>
        </div>
        <div className="page__side">
          {[
            ['b', 'Tech', 'Setting up a calm home office'],
            ['c', 'Culture', 'Five small galleries worth the trip'],
            ['d', 'World', 'Night trains are having a moment'],
          ].map(([k, tag, title]) => (
            <article key={k}>
              <div className={`page__img page__img--${k}`} />
              <div><small>{tag}</small><h4>{title}</h4></div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
