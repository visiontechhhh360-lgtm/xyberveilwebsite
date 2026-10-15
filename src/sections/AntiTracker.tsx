import { useRef, useState } from 'react'
import { ANTI_TRACKER, SCREENS } from '../config/site'
import { IosStatusBar } from '../components/AppChrome'
import { Phone, ScaledScreen } from '../components/Devices'
import { IconArrow, IconShield } from '../components/Icons'
import { SplitText, Toggle } from '../components/ui'
import { prefersReducedMotion } from '../lib/motion'
import { useReveal } from '../lib/useReveal'
import { useInView } from '../lib/useVisible'
import './AntiTracker.css'

/**
 * Anti-Tracker: conceptual flow (website activity → tracking elements →
 * Anti-Tracker), shown next to the REAL Xyberveil Settings screen where the
 * feature lives. No technical behaviour or statistics are implied.
 */

// Positions of tracking-element markers inside the website screen (393×852)
const MARKERS = [
  { x: 300, y: 196 },
  { x: 64, y: 430 },
  { x: 318, y: 560 },
  { x: 120, y: 700 },
]

// Particle paths in stage space (1000×600): leave the left phone, meet the shield
const PATHS = [
  'M300 170 C 380 170, 420 300, 500 300',
  'M300 250 C 390 250, 420 300, 500 300',
  'M300 360 C 390 360, 420 300, 500 300',
  'M300 440 C 380 440, 420 300, 500 300',
]
const PASS = 'M500 300 C 560 300, 600 120, 700 60'

function WebsiteScreen() {
  return (
    <div className="web">
      <IosStatusBar />
      <div className="web__page">
        <div className="web__nav"><b /><i /><i /></div>
        <div className="web__hero" />
        <div className="web__lines"><b /><i /><i /><i /></div>
        <div className="web__media" />
        <div className="web__lines"><i /><i /><i /></div>
        <div className="web__row"><span /><span /></div>
        {MARKERS.map((m, i) => (
          <span key={i} className="web__marker" style={{ left: m.x, top: m.y, animationDelay: `${i * 0.6}s` }}>
            <i />
          </span>
        ))}
      </div>
      <div className="web__bar">
        <span className="web__omni">Search or enter website name</span>
      </div>
    </div>
  )
}

export function AntiTracker() {
  const root = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, '100px')
  const [on, setOn] = useState(true)
  useReveal(root)
  const animate = inView && !prefersReducedMotion()

  return (
    <section ref={root} id="anti-tracker" className="at section" aria-labelledby="at-title">
      <div className="at__bg" aria-hidden="true" />
      <div className="container">
        <div className="at__head">
          <div className="section-head">
            <span className="eyebrow" data-reveal="fade">{ANTI_TRACKER.name}</span>
            <h2 id="at-title" className="h2 text-gradient" data-reveal="words">
              <SplitText text={'Anti-Tracker,\nbuilt into the app.'} />
            </h2>
          </div>
          <div className="at__intro" data-reveal="up" data-delay="0.1">
            <p className="lead">
              Anti-Tracker lives in Xyberveil’s settings. In the app’s own words, it’s there to “
              {ANTI_TRACKER.inAppDescription.charAt(0).toLowerCase() + ANTI_TRACKER.inAppDescription.slice(1)}”
            </p>
            <label className="at__toggle">
              <span>Anti-Tracker</span>
              <Toggle on={on} onChange={setOn} label="Anti-Tracker (demo)" />
            </label>
          </div>
        </div>

        <ol className="at__flow mono" aria-label="How the illustration reads" data-reveal="fade">
          <li>Website activity</li>
          <li aria-hidden="true"><IconArrow width={14} height={14} /></li>
          <li>Tracking elements</li>
          <li aria-hidden="true"><IconArrow width={14} height={14} /></li>
          <li className="is-accent">Anti-Tracker</li>
        </ol>

        <div ref={stageRef} className={`at__stage ${on ? 'is-on' : 'is-off'}`} data-reveal="fade" aria-hidden="true">
          <span className="at__floor" />

          <div className="at__phone at__phone--web">
            <Phone>
              <ScaledScreen width={393} height={852}><WebsiteScreen /></ScaledScreen>
            </Phone>
          </div>

          <svg className="at__flowsvg" viewBox="0 0 1000 600" preserveAspectRatio="none">
            {PATHS.map((d, i) => <path key={i} d={d} className="at__path" />)}
            {!on && <path d={PASS} className="at__path at__path--pass" />}
            {animate &&
              PATHS.map((d, i) =>
                [0, 1].map((k) => (
                  <circle key={`${on}-${i}-${k}`} r="4" className="at__dot">
                    <animateMotion dur={on ? '2.4s' : '3.6s'} begin={`${i * 0.5 + k * 1.2}s`} repeatCount="indefinite" path={on ? d : `${d} ${PASS.replace('M500 300', '')}`} />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur={on ? '2.4s' : '3.6s'} begin={`${i * 0.5 + k * 1.2}s`} repeatCount="indefinite" />
                  </circle>
                )),
              )}
          </svg>

          <div className="at__shield">
            <span className="at__shield-core"><IconShield width={26} height={26} /></span>
            <span className="at__shield-label">{on ? 'Anti-Tracker on' : 'Anti-Tracker off'}</span>
          </div>

          <div className="at__phone at__phone--app">
            <Phone src={SCREENS.settings} alt="">
              <span className="at__overlay">
                <span className="at__row-hl" />
                <span className={`at__switch ${on ? 'is-on' : ''}`}><i /></span>
              </span>
            </Phone>
          </div>
        </div>
        <p className="at__note mono">Conceptual illustration. Right: the real Xyberveil Settings screen.</p>
      </div>
    </section>
  )
}
