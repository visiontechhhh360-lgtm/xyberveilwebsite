import { useEffect, useRef, useState } from 'react'
import { FEATURES, PRODUCT, PROTOCOLS } from '../config/site'
import { IconBolt, IconGlobe, IconLayers, IconSplit } from '../components/Icons'
import { SplitText, SpotlightCard, Toggle } from '../components/ui'
import { prefersReducedMotion, seeded } from '../lib/motion'
import { useReveal } from '../lib/useReveal'
import { useInView } from '../lib/useVisible'
import './Features.css'

const ICONS = { locations: IconGlobe, protocols: IconLayers, autoconnect: IconBolt, split: IconSplit }

/* ---------- Mini visuals ---------- */

function LocationsMini() {
  const rand = seeded(42)
  const nodes = Array.from({ length: PRODUCT.locationsCount + 2 }, () => ({
    x: 8 + rand() * 84,
    y: 12 + rand() * 76,
    d: rand() * 4,
  }))
  return (
    <div className="fmini fmini--loc" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.slice(0, 14).map((n, i) => {
          const m = nodes[(i * 7 + 3) % nodes.length]
          return <line key={i} x1={n.x} y1={n.y} x2={m.x} y2={m.y} className="fmini__link" style={{ animationDelay: `${n.d}s` }} />
        })}
      </svg>
      {nodes.map((n, i) => (
        <span key={i} className="fmini__node" style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${n.d}s` }} />
      ))}
      <div className="fmini__big">
        <span className="text-chrome">{PRODUCT.locationsLabel}</span>
        <small className="mono">locations</small>
      </div>
    </div>
  )
}

function ProtocolsMini() {
  const [sel, setSel] = useState(0)
  return (
    <div className="fmini fmini--proto">
      <span className="fmini__label mono">Protocol</span>
      <div className="fmini__opts" role="radiogroup" aria-label="Protocol options (illustrative)">
        {PROTOCOLS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={sel === i}
            className={sel === i ? 'is-sel' : ''}
            onClick={() => setSel(i)}
          >
            <span className="fmini__radio" />
            {p.name}
          </button>
        ))}
        <span className="fmini__indicator" style={{ transform: `translateY(${sel * 100}%)` }} aria-hidden="true" />
      </div>
    </div>
  )
}

function AutoMini() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const [on, setOn] = useState(true)
  const [phase, setPhase] = useState(0) // 0 idle, 1 connecting, 2 connected

  useEffect(() => {
    if (!on) {
      setPhase(0)
      return
    }
    if (!inView) return
    setPhase(0)
    const t1 = setTimeout(() => setPhase(1), 700)
    const t2 = setTimeout(() => setPhase(2), 2200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [on, inView])

  const label = ['Waiting', 'Connecting…', 'Connected'][phase]
  return (
    <div ref={ref} className={`fmini fmini--auto phase-${phase}`}>
      <div className="fmini__auto-row">
        <span>Auto Connect</span>
        <Toggle on={on} label="Auto Connect (demo)" onChange={setOn} />
      </div>
      <div className="fmini__auto-status" aria-live="polite">
        <span className="fmini__auto-ring"><span /></span>
        <span className="fmini__auto-text">{on ? label : 'Off — connect manually'}</span>
      </div>
      <div className="fmini__auto-bar"><span /></div>
    </div>
  )
}

function SplitMini() {
  const still = prefersReducedMotion()
  return (
    <div className="fmini fmini--split" aria-hidden="true">
      <svg viewBox="0 0 400 160" fill="none">
        <defs>
          <linearGradient id="fm-vpn" x1="0" x2="1">
            <stop offset="0" stopColor="#38c9d6" />
            <stop offset="1" stopColor="#8c86ff" />
          </linearGradient>
        </defs>
        <path id="fm-p1" d="M20 80 H140 C190 80 190 30 240 30 H380" stroke="url(#fm-vpn)" strokeWidth="1.5" className="fmini__path" />
        <path id="fm-p2" d="M20 80 H140 C190 80 190 130 240 130 H380" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" strokeDasharray="3 5" />
        {!still && [0, 1, 2, 3].map((i) => (
          <circle key={`a${i}`} r="3" fill="#8ff0f2" className="fmini__dot">
            <animateMotion dur="3.2s" begin={`${i * 0.8}s`} repeatCount="indefinite" rotate="auto">
              <mpath href="#fm-p1" />
            </animateMotion>
          </circle>
        ))}
        {!still && [0, 1, 2].map((i) => (
          <circle key={`b${i}`} r="2.5" fill="#c3cad6" opacity=".6">
            <animateMotion dur="3.8s" begin={`${i * 1.2 + 0.4}s`} repeatCount="indefinite">
              <mpath href="#fm-p2" />
            </animateMotion>
          </circle>
        ))}
        <circle cx="20" cy="80" r="6" fill="#0b1422" stroke="rgba(255,255,255,.4)" />
      </svg>
      <span className="fmini__tag fmini__tag--vpn">Selected apps → VPN</span>
      <span className="fmini__tag fmini__tag--direct">Other traffic → normal connection</span>
    </div>
  )
}

const MINIS = { locations: LocationsMini, protocols: ProtocolsMini, autoconnect: AutoMini, split: SplitMini }

export function Features() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section ref={root} id="features" className="features section" aria-labelledby="features-title">
      <div className="features__bg" aria-hidden="true" />
      <div className="container">
        <header className="section-head features__head">
          <span className="eyebrow" data-reveal="fade">Features</span>
          <h2 id="features-title" className="h2 text-gradient" data-reveal="words">
            <SplitText text={'Everything you need.\nNothing you don’t.'} />
          </h2>
          <p className="lead" data-reveal="up" data-delay="0.1">
            Four core capabilities, designed to give you control over how your connection works.
          </p>
        </header>

        <div className="features__grid" data-reveal="stagger">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.id]
            const Mini = MINIS[f.id]
            return (
              <SpotlightCard as="article" key={f.id} className={`fcard fcard--${f.id}`}>
                <div className="fcard__visual"><Mini /></div>
                <div className="fcard__copy">
                  <span className="fcard__kicker"><Icon width={16} height={16} />{f.kicker}</span>
                  <h3 className="h3">{f.title}</h3>
                  <p className="muted">{f.body}</p>
                </div>
              </SpotlightCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
