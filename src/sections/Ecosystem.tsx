import { useRef } from 'react'
import { SCREENS } from '../config/site'
import { DesktopAppScreen, Laptop, Monitor, Phone } from '../components/Devices'
import { SplitText } from '../components/ui'
import { gsap, MOTION_OK } from '../lib/gsap'
import { useGsap } from '../lib/useGsap'
import { useReveal } from '../lib/useReveal'
import './Ecosystem.css'

export function Ecosystem() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  // Gentle depth-based parallax: nearer devices move slightly more
  useGsap(root, (mm, el) => {
    mm.add(MOTION_OK, () => {
      el.querySelectorAll<HTMLElement>('[data-depth]').forEach((d) => {
        const depth = parseFloat(d.dataset.depth || '0')
        gsap.fromTo(
          d,
          { y: depth * 24 },
          { y: -depth * 24, ease: 'none', scrollTrigger: { trigger: el.querySelector('.eco__stage'), start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    })
  })

  return (
    <section ref={root} id="devices" className="eco section" aria-labelledby="eco-title">
      <div className="eco__bg" aria-hidden="true" />
      <div className="container">
        <header className="section-head section-head--center">
          <span className="eyebrow" data-reveal="fade">Across devices</span>
          <h2 id="eco-title" className="h2 text-gradient" data-reveal="words">
            <SplitText text={'Your VPN, across the\ndevices you use.'} />
          </h2>
          <p className="lead" data-reveal="up" data-delay="0.1">
            Install Xyberveil on your computer and phone, or add it to Chrome — with apps for Windows, macOS, Linux, iOS and
            Android, plus a Chrome Extension.
          </p>
        </header>

        <div className="eco__stage" data-reveal="fade" aria-hidden="true">
          <span className="eco__floor" />
          <figure className="eco__dev eco__dev--monitor" data-depth="0.1">
            <Monitor><DesktopAppScreen os="windows" /></Monitor>
            <figcaption className="mono">Desktop · Windows</figcaption>
          </figure>
          <figure className="eco__dev eco__dev--laptop" data-depth="0.25">
            <Laptop><DesktopAppScreen os="mac" screens={[SCREENS.desktop.settings]} /></Laptop>
            <figcaption className="mono">Laptop · macOS</figcaption>
          </figure>
          <figure className="eco__dev eco__dev--phone" data-depth="0.45">
            <Phone src={SCREENS.home} />
            <figcaption className="mono">Smartphone</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
