import { useRef } from 'react'
import { PLATFORMS } from '../config/site'
import { PlatformIcon } from '../components/Icons'
import { gsap, MOTION_OK } from '../lib/gsap'
import { useGsap } from '../lib/useGsap'
import './Statement.css'

const WORDS: { w: string; hl?: boolean }[] = [
  { w: 'Xyberveil' , hl: true }, { w: 'routes' }, { w: 'your' }, { w: 'internet' }, { w: 'traffic' }, { w: 'through' },
  { w: 'a' }, { w: 'VPN' , hl: true }, { w: 'connection' , hl: true }, { w: '—' }, { w: 'and' }, { w: 'lets' }, { w: 'you' },
  { w: 'choose' }, { w: 'where' , hl: true }, { w: 'it' }, { w: 'connects,' }, { w: 'how' , hl: true }, { w: 'it' },
  { w: 'connects,' }, { w: 'and' }, { w: 'which' , hl: true }, { w: 'apps' , hl: true }, { w: 'use' }, { w: 'it.' },
]

export function Statement() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, (mm, el) => {
    mm.add(MOTION_OK, () => {
      const words = el.querySelectorAll('.statement__w')
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: el.querySelector('.statement__text'), start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
        },
      )
      gsap.to(el.querySelector('.statement__track'), {
        xPercent: -25,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.fromTo(el.querySelector('.statement__beam'), { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 30%', scrub: true },
      })
    })
  })

  const marquee = [...PLATFORMS, ...PLATFORMS, ...PLATFORMS]

  return (
    <section ref={root} id="statement" className="statement section" aria-label="What Xyberveil does">
      <span className="statement__beam" aria-hidden="true" />
      <div className="container">
        <p className="statement__text">
          {WORDS.map((x, i) => (
            <span key={i} className={`statement__w ${x.hl ? 'is-hl' : ''}`}>{x.w} </span>
          ))}
        </p>
      </div>

      <div className="statement__marquee" aria-label="Available platforms">
        <div className="statement__track">
          {marquee.map((p, i) => (
            <span className="statement__item" key={i} aria-hidden={i >= PLATFORMS.length}>
              <PlatformIcon id={p.id} size={34} />
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
