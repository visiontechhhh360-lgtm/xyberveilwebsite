import { useRef, useState, type CSSProperties } from 'react'
import { PLATFORMS, SCREENS, type Platform } from '../config/site'
import { BrowserScreen, DesktopAppScreen, Laptop, Phone } from '../components/Devices'
import { IconDownload, PlatformIcon } from '../components/Icons'
import { Button, SplitText } from '../components/ui'
import { linkProps } from '../lib/links'
import { useReveal } from '../lib/useReveal'
import './Downloads.css'

function Mockup({ p }: { p: Platform }) {
  if (p.device === 'phone')
    return (
      <div className="dl__mock dl__mock--phone">
        <Phone src={SCREENS.home} os={p.id === 'android' ? 'android' : 'ios'} />
      </div>
    )
  const os = p.id === 'macos' ? 'mac' : p.id === 'linux' ? 'linux' : 'windows'
  return (
    <div className="dl__mock dl__mock--laptop">
      <Laptop camera={p.id === 'macos' ? 'notch' : 'dot'}>
        {p.device === 'browser' ? <BrowserScreen popup os="mac" /> : <DesktopAppScreen os={os} />}
      </Laptop>
    </div>
  )
}

export function Downloads() {
  const root = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(0)
  useReveal(root)
  const p = PLATFORMS[idx]

  const onKey = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next = idx
    if (e.key in keys) next = (idx + keys[e.key] + PLATFORMS.length) % PLATFORMS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = PLATFORMS.length - 1
    else return
    e.preventDefault()
    setIdx(next)
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
  }

  return (
    <section
      ref={root}
      id="downloads"
      className="dl section"
      aria-labelledby="dl-title"
      style={{ '--tint': p.tint } as CSSProperties}
    >
      <div className="dl__bg" aria-hidden="true" />
      <div className="container">
        <header className="section-head section-head--center">
          <span className="eyebrow" data-reveal="fade">Downloads</span>
          <h2 id="dl-title" className="h2 text-gradient" data-reveal="words">
            <SplitText text="Get Xyberveil on every platform." />
          </h2>
          <p className="lead" data-reveal="up" data-delay="0.1">
            Choose your platform. Xyberveil is available for Windows, macOS, iOS, Android and Linux, and as a Chrome Extension.
          </p>
        </header>

        <div className="dl__tabs" role="tablist" aria-label="Choose a platform" ref={tabsRef} onKeyDown={onKey} data-reveal="stagger">
          {PLATFORMS.map((pl, i) => (
            <button
              key={pl.id}
              id={`dl-tab-${pl.id}`}
              role="tab"
              type="button"
              aria-selected={i === idx}
              aria-controls="dl-panel"
              tabIndex={i === idx ? 0 : -1}
              className={`dl__tab ${i === idx ? 'is-active' : ''}`}
              style={{ '--tab-tint': pl.tint } as CSSProperties}
              onClick={() => setIdx(i)}
            >
              <PlatformIcon id={pl.id} size={22} />
              <span className="dl__tab-name">{pl.short}</span>
            </button>
          ))}
        </div>

        <div id="dl-panel" role="tabpanel" aria-labelledby={`dl-tab-${p.id}`} className="dl__panel glass" data-reveal="up">
          <div className="dl__info" key={`i-${p.id}`}>
            <span className="dl__platform-icon"><PlatformIcon id={p.id} size={30} /></span>
            <h3 className="dl__name">Xyberveil for {p.name}</h3>
            <p className="muted">{p.blurb}</p>
            <div className="dl__cta">
              <Button size="lg" icon={<IconDownload />} {...linkProps(p.href)}>{p.cta}</Button>
            </div>
            <ul className="dl__facts">
              <li>30+ locations</li>
              <li>Multiple protocols</li>
              <li>Auto Connect</li>
              <li>Split Tunneling</li>
            </ul>
            <p className="dl__req mono">[ADD VERIFIED SYSTEM REQUIREMENTS FOR {p.name.toUpperCase()}]</p>
          </div>
          <div className="dl__stage" aria-hidden="true">
            <span className="dl__halo" />
            <Mockup p={p} key={`m-${p.id}`} />
          </div>
        </div>

        <ul className="dl__all" aria-label="All downloads" data-reveal="fade">
          {PLATFORMS.map((pl) => (
            <li key={pl.id}>
              <a className="dl__all-link" {...linkProps(pl.href)}>
                <PlatformIcon id={pl.id} size={16} />
                {pl.name}
                <IconDownload width={14} height={14} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
