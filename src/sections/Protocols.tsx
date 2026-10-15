import { useEffect, useRef, useState } from 'react'
import logoUrl from '../assets/xyberveil-logo-256.webp'
import { ANTI_TRACKER, PROTOCOLS } from '../config/site'
import { Phone, ScaledScreen } from '../components/Devices'
import { AppTabBar, IosStatusBar } from '../components/AppChrome'
import { IconBolt, IconCheck, IconChevron, IconGlobe, IconLayers, IconSplit } from '../components/Icons'
import { SplitText } from '../components/ui'
import { useReveal } from '../lib/useReveal'
import './Protocols.css'

/**
 * Protocol picker rendered in the visual language of the real Xyberveil app
 * Settings screen. Protocols are listed in the order provided — not ranked,
 * and no technical specifications are shown.
 */

const WAVES = [
  'M0 40 C 25 10, 50 10, 75 40 S 125 70, 150 40 S 200 10, 225 40 S 275 70, 300 40 S 350 10, 375 40 S 425 70, 450 40 S 500 10, 525 40 S 575 70, 600 40',
  'M0 40 H40 V18 H80 V62 H120 V40 H160 V18 H200 V62 H240 V40 H280 V18 H320 V62 H360 V40 H400 V18 H440 V62 H480 V40 H520 V18 H560 V62 H600 V40',
  'M0 40 L30 16 L60 64 L90 16 L120 64 L150 16 L180 64 L210 16 L240 64 L270 16 L300 64 L330 16 L360 64 L390 16 L420 64 L450 16 L480 64 L510 16 L540 64 L570 16 L600 40',
]

function SettingsScreen({ sel, onSelect, auto, onAuto }: {
  sel: number
  onSelect: (i: number) => void
  auto: boolean
  onAuto: (v: boolean) => void
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const [tracker, setTracker] = useState(false)
  const onKey = (e: React.KeyboardEvent) => {
    if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return
    e.preventDefault()
    const next = (sel + (e.key === 'ArrowDown' ? 1 : -1) + PROTOCOLS.length) % PROTOCOLS.length
    onSelect(next)
    listRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus()
  }

  return (
    <div className="xs">
      <IosStatusBar />
      <h3 className="xs__title">Settings</h3>

      <p className="xs__section">VPN Protocol</p>
      <div ref={listRef} className="xs__group" role="radiogroup" aria-label="VPN protocol" onKeyDown={onKey}>
        {PROTOCOLS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={sel === i}
            tabIndex={sel === i ? 0 : -1}
            className={`xs__row ${sel === i ? 'is-sel' : ''}`}
            onClick={() => onSelect(i)}
          >
            <span className="xs__row-icon"><IconLayers width={22} height={22} /></span>
            <span className="xs__row-text"><strong>{p.name}</strong></span>
            <span className="xs__check">{sel === i && <IconCheck width={22} height={22} />}</span>
          </button>
        ))}
      </div>

      <p className="xs__section">Connection Settings</p>
      <div className="xs__group">
        <div className="xs__row">
          <span className="xs__row-icon"><IconBolt width={22} height={22} /></span>
          <span className="xs__row-text"><strong>Auto Connect</strong></span>
          <button
            type="button"
            role="switch"
            aria-checked={auto}
            aria-label="Auto Connect"
            className={`xs__switch ${auto ? 'is-on' : ''}`}
            onClick={() => onAuto(!auto)}
          >
            <span />
          </button>
        </div>
        <div className="xs__row">
          <span className="xs__row-icon"><IconSplit width={22} height={22} /></span>
          <span className="xs__row-text"><strong>Split Tunneling</strong></span>
          <IconChevron width={20} height={20} className="xs__chev" />
        </div>
        <div className="xs__row">
          <span className="xs__row-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m5.6 5.6 12.8 12.8" /></svg>
          </span>
          <span className="xs__row-text">
            <strong>{ANTI_TRACKER.name}</strong>
            <small>{ANTI_TRACKER.inAppDescription}</small>
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={tracker}
            aria-label={ANTI_TRACKER.name}
            className={`xs__switch ${tracker ? 'is-on' : ''}`}
            onClick={() => setTracker(!tracker)}
          >
            <span />
          </button>
        </div>
      </div>

      <AppTabBar active="settings" />
    </div>
  )
}

export function Protocols() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  const [sel, setSel] = useState(0)
  const [switching, setSwitching] = useState(false)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!switching) return
    const t = setTimeout(() => setSwitching(false), 900)
    return () => clearTimeout(t)
  }, [switching])

  const choose = (i: number) => {
    if (i === sel) return
    setSel(i)
    setSwitching(true)
  }

  const name = PROTOCOLS[sel].name

  return (
    <section ref={root} id="protocols" className="proto section" aria-labelledby="proto-title">
      <div className="proto__bg" aria-hidden="true" />
      <div className="container">
        <header className="section-head">
          <span className="eyebrow" data-reveal="fade">Protocols &amp; Auto Connect</span>
          <h2 id="proto-title" className="h2 text-gradient" data-reveal="words">
            <SplitText text={'Choose how your\nconnection works.'} />
          </h2>
          <p className="lead" data-reveal="up" data-delay="0.1">
            Xyberveil supports multiple VPN protocols. Pick the one you prefer, and let Auto Connect start the VPN for you.
          </p>
        </header>

        <div className="proto__layout">
          <div className="proto__device" data-reveal="up">
            <Phone>
              <ScaledScreen width={393} height={852}>
                <SettingsScreen sel={sel} onSelect={choose} auto={auto} onAuto={setAuto} />
              </ScaledScreen>
            </Phone>
            <p className="proto__note mono">Illustrative screen in the Xyberveil app style — try it.</p>
          </div>

          <div className={`proto__stage ${switching ? 'is-switching' : ''}`} data-reveal="fade" aria-hidden="true">
            <div className="proto__endpoint">
              <span className="proto__endpoint-core"><img src={logoUrl} alt="" width={30} height={30} /></span>
              <small className="mono">Your device</small>
            </div>

            <div className="proto__tunnel">
              <div className="proto__tube" />
              <svg viewBox="0 0 600 80" preserveAspectRatio="none" className="proto__wave">
                <defs>
                  <linearGradient id="proto-grad" x1="0" x2="1">
                    <stop offset="0" stopColor="#38c9d6" />
                    <stop offset="1" stopColor="#8c86ff" />
                  </linearGradient>
                </defs>
                <path d={WAVES[sel % WAVES.length]} key={sel} className="proto__wave-path" />
                <path d={WAVES[sel % WAVES.length]} className="proto__wave-pulse" key={`p${sel}`} />
              </svg>
              <div className="proto__badge">
                <span className={`proto__badge-dot ${switching ? 'is-busy' : ''}`} />
                <span>{switching ? `Switching to ${name}…` : `Connected via ${name}`}</span>
              </div>
            </div>

            <div className="proto__endpoint">
              <span className="proto__endpoint-core proto__endpoint-core--net"><IconGlobe width={24} height={24} /></span>
              <small className="mono">VPN location</small>
            </div>

            <div className={`proto__autoline ${auto ? 'is-on' : ''}`}>
              <IconBolt width={14} height={14} />
              <span>Auto Connect {auto ? 'on' : 'off'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
