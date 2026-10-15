import { useRef } from 'react'
import logoUrl from '../assets/xyberveil-logo.webp'
import { PLATFORMS } from '../config/site'
import { IconArrow, IconDownload, PlatformIcon } from '../components/Icons'
import { Button, SplitText } from '../components/ui'
import { gsap, MOTION_OK } from '../lib/gsap'
import { useGsap } from '../lib/useGsap'
import { useReveal } from '../lib/useReveal'
import './FinalCTA.css'

export function FinalCTA() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  useGsap(root, (mm, el) => {
    mm.add(MOTION_OK, () => {
      gsap.fromTo(el.querySelector('.cta__orbit-wrap'), { scale: 0.7, opacity: 0, rotate: -30 }, {
        scale: 1, opacity: 1, rotate: 0, duration: 2,
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      })
      gsap.fromTo(el.querySelectorAll('.cta__planet-inner'), { opacity: 0 }, {
        opacity: 1, duration: 1.2, stagger: 0.08, delay: 0.4, ease: 'back.out(2)',
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      })
    })
  })

  return (
    <section ref={root} className="cta section" aria-labelledby="cta-title">
      <div className="cta__bg" aria-hidden="true">
        <span className="cta__aurora" />
      </div>
      <div className="container cta__inner">
        <div className="cta__orbit-wrap" aria-hidden="true">
          <div className="cta__orbit">
            {PLATFORMS.map((p, i) => (
              <span key={p.id} className="cta__planet" style={{ '--i': i, '--n': PLATFORMS.length } as React.CSSProperties}>
                <span className="cta__planet-inner"><PlatformIcon id={p.id} size={20} /></span>
              </span>
            ))}
          </div>
          <div className="cta__logo">
            <img src={logoUrl} alt="" width={180} height={180} loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="cta__copy">
          <h2 id="cta-title" className="cta__title text-gradient" data-reveal="words">
            <SplitText text={'Wherever you connect,\nXyberveil is ready.'} />
          </h2>
          <p className="lead" data-reveal="up" data-delay="0.1">
            Available for Windows, macOS, iOS, Android, Linux and Chrome.
          </p>
          <div className="cta__actions" data-reveal="up" data-delay="0.2">
            <Button href="#downloads" size="lg" icon={<IconDownload />}>Download Xyberveil</Button>
            <Button href="#product" size="lg" variant="glass" icon={<IconArrow />}>Explore Xyberveil</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
