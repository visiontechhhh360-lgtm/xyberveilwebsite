import { useId, useRef, useState } from 'react'
import { FAQS, NAV_LINKS } from '../config/site'
import { IconArrow, IconPlus } from '../components/Icons'
import { Button, SplitText } from '../components/ui'
import { linkProps } from '../lib/links'
import { useReveal } from '../lib/useReveal'
import './FAQ.css'

const SUPPORT = NAV_LINKS.find((l) => l.label === 'Support')!.href

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId()
  return (
    <li className={`faq__item ${open ? 'is-open' : ''}`}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className="faq__q">
          <span>{q}</span>
          <span className="faq__icon"><IconPlus width={18} height={18} /></span>
        </button>
      </h3>
      <div id={id} className="faq__a" role="region" aria-hidden={!open}>
        <div><p>{a}</p></div>
      </div>
    </li>
  )
}

export function FAQ() {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(0)
  useReveal(root)

  return (
    <section ref={root} id="faq" className="faq section" aria-labelledby="faq-title">
      <div className="faq__bg" aria-hidden="true" />
      <div className="container faq__layout">
        <header className="faq__head">
          <div className="section-head">
            <span className="eyebrow" data-reveal="fade">FAQ</span>
            <h2 id="faq-title" className="h2 text-gradient" data-reveal="words">
              <SplitText text={'Questions,\nanswered.'} />
            </h2>
            <p className="lead" data-reveal="up" data-delay="0.1">The essentials about Xyberveil. Can’t find what you need? Reach out to support.</p>
          </div>
          <div data-reveal="up" data-delay="0.2">
            <Button variant="glass" icon={<IconArrow />} {...linkProps(SUPPORT)}>Contact support</Button>
          </div>
        </header>

        <ul className="faq__list" data-reveal="stagger">
          {FAQS.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </ul>
      </div>
    </section>
  )
}
