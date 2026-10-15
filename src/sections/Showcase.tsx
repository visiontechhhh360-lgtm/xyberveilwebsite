import { useEffect, useRef, useState } from 'react'
import { PRODUCT, SCREENS } from '../config/site'
import { DesktopAppScreen, Laptop, Phone, Shot } from '../components/Devices'
import { IconGlobe, IconPower, IconSliders } from '../components/Icons'
import { SplitText } from '../components/ui'
import { useReveal } from '../lib/useReveal'
import { useTilt } from '../lib/useTilt'
import './Showcase.css'

const STEPS = [
  {
    key: 'status' as const,
    icon: IconPower,
    label: '01 — Connection',
    title: 'See your connection status at a glance.',
    body: 'One control to connect or disconnect, with a clear indicator of whether your traffic is going through the VPN.',
    screen: SCREENS.home,
    desk: SCREENS.desktop.dashboard,
    alt: 'Xyberveil app home screen with the connection switch',
    // hotspot on the real screen, in % of the screenshot
    hot: { left: 28, top: 51, width: 44, height: 10, round: true },
  },
  {
    key: 'location' as const,
    icon: IconGlobe,
    label: '02 — Locations',
    title: `Pick from ${PRODUCT.locationsLabel} locations.`,
    body: 'Choose where your VPN connection goes from more than 30 available locations.',
    screen: SCREENS.countries,
    desk: SCREENS.desktop.dashboard,
    alt: 'Xyberveil app location list',
    hot: { left: 2, top: 40.5, width: 96, height: 50, round: false },
  },
  {
    key: 'controls' as const,
    icon: IconSliders,
    label: '03 — Controls',
    title: 'Set it up the way you want.',
    body: 'Choose a VPN protocol, turn on Auto Connect, and use Split Tunneling to decide which apps go through the VPN.',
    screen: SCREENS.settings,
    desk: SCREENS.desktop.settings,
    alt: 'Xyberveil app settings screen',
    hot: { left: 2, top: 38.5, width: 96, height: 9.5, round: false },
  },
]

const DESK_SCREENS = [...new Set(STEPS.map((s) => s.desk))]

export function Showcase() {
  const root = useRef<HTMLElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  useReveal(root)
  useTilt(tiltRef, { max: 3 })

  // Scroll-driven step activation (desktop step blocks)
  useEffect(() => {
    const blocks = root.current?.querySelectorAll<HTMLElement>('.showcase__step')
    if (!blocks?.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    blocks.forEach((b) => io.observe(b))
    return () => io.disconnect()
  }, [])

  const step = STEPS[active]

  return (
    <section ref={root} id="product" className="showcase section" aria-labelledby="showcase-title">
      <div className="showcase__bg" data-step={step.key} aria-hidden="true" />
      <div className="container">
        <header className="section-head section-head--center showcase__head">
          <span className="eyebrow" data-reveal="fade">The Xyberveil app</span>
          <h2 id="showcase-title" className="h2 text-gradient" data-reveal="words">
            <SplitText text="One VPN. Multiple ways to connect." />
          </h2>
          <p className="lead" data-reveal="up" data-delay="0.15">
            Xyberveil brings the same core controls to desktop, mobile and the browser — connect, pick a location,
            and set things up your way.
          </p>
        </header>

        {/* Mobile / tablet step switcher */}
        <div className="showcase__tabs" role="tablist" aria-label="App areas">
          {STEPS.map((s, i) => (
            <button
              key={s.key}
              role="tab"
              type="button"
              aria-selected={active === i}
              className={active === i ? 'is-active' : ''}
              onClick={() => setActive(i)}
            >
              <s.icon width={16} height={16} />
              {s.label.split(' — ')[1]}
            </button>
          ))}
        </div>

        <div className="showcase__layout">
          <ol className="showcase__steps">
            {STEPS.map((s, i) => (
              <li key={s.key} className={`showcase__step ${active === i ? 'is-active' : ''}`} data-index={i}>
                <span className="showcase__step-label mono">{s.label}</span>
                <h3 className="h3">{s.title}</h3>
                <p className="muted">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="showcase__visual-col">
            <div className="showcase__sticky">
              <div ref={tiltRef} className="showcase__tilt" data-reveal="fade">
                <span className="showcase__floor" aria-hidden="true" />
                <div className="showcase__laptop" aria-hidden="true">
                  <Laptop camera="dot">
                    <DesktopAppScreen os="windows" screens={DESK_SCREENS} active={DESK_SCREENS.indexOf(step.desk)} />
                  </Laptop>
                </div>
                <div className="showcase__phone">
                  <Phone>
                    <div className="showcase__screens">
                      {STEPS.map((s, i) => (
                        <Shot key={s.key} src={s.screen} alt={i === active ? s.alt : ''} className={i === active ? 'is-on' : ''} />
                      ))}
                      <span
                        key={step.key}
                        className={`showcase__hot ${step.hot.round ? 'is-round' : ''}`}
                        aria-hidden="true"
                        style={{ left: `${step.hot.left}%`, top: `${step.hot.top}%`, width: `${step.hot.width}%`, height: `${step.hot.height}%` }}
                      />
                    </div>
                  </Phone>
                </div>
              </div>
              <p className="showcase__note mono">Real Xyberveil app screens (desktop and iOS).</p>
            </div>
          </div>
        </div>

        <div className="showcase__mobile-copy" aria-live="polite">
          <h3 className="h3">{step.title}</h3>
          <p className="muted">{step.body}</p>
        </div>
      </div>
    </section>
  )
}
