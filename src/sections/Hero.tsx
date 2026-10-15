import { useRef } from 'react'
import { PLATFORMS, PRODUCT, SCREENS } from '../config/site'
import { DesktopAppScreen, Laptop, Phone } from '../components/Devices'
import { IconArrow, IconDownload, PlatformIcon } from '../components/Icons'
import { Button, SplitText } from '../components/ui'
import { gsap, MOTION_OK, MOTION_REDUCED } from '../lib/gsap'
import { useGsap } from '../lib/useGsap'
import { useTilt } from '../lib/useTilt'
import { GlobeCanvas } from '../visuals/GlobeCanvas'
import './Hero.css'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  useTilt(stage, { max: 3, area: root })

  useGsap(root, (mm, el) => {
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(el)
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 })
      tl.from(q('.hero__bg-glow'), { opacity: 0, scale: 0.7, duration: 2.4, stagger: 0.2 }, 0)
        .from(q('.hero__grid'), { opacity: 0, duration: 2 }, 0.2)
        .from(q('.hero__eyebrow'), { y: 20, opacity: 0, duration: 1 }, 0.35)
        .from(q('.hero__title .split-word > span'), { yPercent: 120, rotate: 5, duration: 1.4, stagger: 0.06 }, 0.45)
        .from(q('.hero__lead'), { y: 24, opacity: 0, duration: 1.2 }, 0.9)
        .from(q('.hero__ctas > *'), { y: 24, opacity: 0, duration: 1.1, stagger: 0.1 }, 1.0)
        .from(q('.hero__platforms'), { y: 16, opacity: 0, duration: 1 }, 1.2)
        .fromTo(q('.hero__globe'), { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.6 }, 0.2)
        .fromTo(q('.hero__laptop'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.6 }, 0.35)
        .fromTo(
          q('.hero__laptop .laptop__lid'),
          { rotateX: -92 },
          { rotateX: 0, duration: 2, ease: 'power3.out' },
          0.45,
        )
        .fromTo(q('.hero__floor'), { opacity: 0, scaleX: 0.6 }, { opacity: 1, scaleX: 1, duration: 2 }, 0.6)
        .fromTo(q('.hero__phone'), { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.6 }, 1.1)
    })
    // Scroll-out (desktop only — on narrow screens the product sits below the
    // copy and should be fully visible as it scrolls into view)
    mm.add(`${MOTION_OK} and (min-width: 1025px)`, () => {
      const q = gsap.utils.selector(el)
      gsap.to(q('.hero__copy'), {
        yPercent: -18, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom 20%', scrub: true },
      })
      gsap.to(q('.hero__visual'), {
        yPercent: 10, opacity: 0.25, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
    })
    mm.add(MOTION_REDUCED, () => {})
  })

  return (
    <section ref={root} id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__bg-glow hero__bg-glow--teal" />
        <span className="hero__bg-glow hero__bg-glow--indigo" />
        <span className="hero__bg-glow hero__bg-glow--chrome" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__layout">
        <div className="hero__copy">
          <span className="eyebrow hero__eyebrow">Private. Connected. In control.</span>
          <h1 id="hero-title" className="hero__title">
            <SplitText text="Your connection." className="hero__title-a" />
            <SplitText text="Protected your way." className="hero__title-b" />
          </h1>
          <p className="lead hero__lead">
            Xyberveil is a VPN for Windows, macOS, iOS, Android, Linux and Chrome — with {PRODUCT.locationsLabel} locations,
            multiple protocols, Auto Connect and Split Tunneling.
          </p>
          <div className="hero__ctas">
            <Button href="#downloads" size="lg" icon={<IconDownload />}>Download Xyberveil</Button>
            <Button href="#features" size="lg" variant="glass" icon={<IconArrow />}>Explore Features</Button>
          </div>
          <div className="hero__platforms">
            <span className="hero__platforms-label">Available on</span>
            <ul>
              {PLATFORMS.map((p) => (
                <li key={p.id} title={p.name}>
                  <a href="#downloads" aria-label={p.name}><PlatformIcon id={p.id} size={18} /></a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div ref={stage} className="hero__stage">
            <div className="hero__globe-wrap">
              <GlobeCanvas className="hero__globe" />
            </div>
            <span className="hero__floor" />
            <div className="hero__laptop">
              <Laptop><DesktopAppScreen os="mac" eager /></Laptop>
            </div>
            <div className="hero__phone">
              <Phone src={SCREENS.home} eager />
            </div>
          </div>
        </div>
      </div>

      <a href="#statement" className="hero__scroll" aria-label="Scroll to next section">
        <span />
      </a>
    </section>
  )
}
