import { useRef } from 'react'
import logoUrl from '../assets/xyberveil-logo.webp'
import { IconRoute, IconSliders, IconSplit } from '../components/Icons'
import { gsap, MOTION_OK } from '../lib/gsap'
import { useGsap } from '../lib/useGsap'
import { useReveal } from '../lib/useReveal'
import './Control.css'

/** Purpose of a VPN, stated factually — no unverified security claims. */
const POINTS = [
  {
    icon: IconRoute,
    k: 'Routing',
    title: 'Keep your internet traffic routed through a VPN connection.',
    body: 'When you’re connected, Xyberveil sends your traffic through the VPN location you choose.',
  },
  {
    icon: IconSliders,
    k: 'Choice',
    title: 'Choose how your connection works.',
    body: 'Pick from 30+ locations and multiple VPN protocols, and turn on Auto Connect if you want the VPN to start for you.',
  },
  {
    icon: IconSplit,
    k: 'Control',
    title: 'Control which traffic uses the VPN.',
    body: 'Split Tunneling lets you decide which apps go through Xyberveil and which use your normal connection.',
  },
]

export function Control() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  useGsap(root, (mm, el) => {
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        el.querySelector('.ctrl__shield'),
        { rotateY: -18, rotateX: 8, scale: 0.9 },
        { rotateY: 18, rotateX: -6, scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
      gsap.to(el.querySelector('.ctrl__sweep'), {
        xPercent: 260,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 20%', scrub: true },
      })
      el.querySelectorAll<HTMLElement>('.ctrl__point').forEach((p) => {
        gsap.fromTo(p, { opacity: 0.2 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: p, start: 'top 75%', end: 'top 45%', scrub: true } })
      })
    })
  })

  return (
    <section ref={root} id="control" className="ctrl section" aria-labelledby="ctrl-title">
      <div className="ctrl__bg" aria-hidden="true" />
      <div className="container ctrl__layout">
        <div className="ctrl__visual" aria-hidden="true">
          <div className="ctrl__sticky">
            <div className="ctrl__rings">
              <span /><span /><span />
            </div>
            <div className="ctrl__shield">
              <div className="ctrl__shield-inner">
                <img src={logoUrl} alt="" width={420} height={420} loading="lazy" decoding="async" />
                <span className="ctrl__sweep" />
              </div>
            </div>
          </div>
        </div>

        <div className="ctrl__copy">
          <header className="section-head">
            <span className="eyebrow" data-reveal="fade">Why a VPN</span>
            <h2 id="ctrl-title" className="h2 text-gradient" data-reveal="up">Private. Connected.<br />In control.</h2>
          </header>
          <ol className="ctrl__points">
            {POINTS.map((p) => (
              <li key={p.k} className="ctrl__point">
                <span className="ctrl__k mono"><p.icon width={16} height={16} />{p.k}</span>
                <h3>{p.title}</h3>
                <p className="muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
