import { useEffect, useRef, type AnchorHTMLAttributes, type ReactNode } from 'react'
import logoUrl from '../assets/xyberveil-logo-256.webp'
import { isCoarsePointer, prefersReducedMotion } from '../lib/motion'
import { useSpotlight } from '../lib/useSpotlight'
import './ui.css'

/* ---------- Logo ---------- */
export function Logo({ size = 34, wordmark = true }: { size?: number; wordmark?: boolean }) {
  return (
    <span className="logo">
      <img src={logoUrl} width={size} height={size} alt="" className="logo__mark" />
      {wordmark && <span className="logo__word">Xyberveil</span>}
    </span>
  )
}

/* ---------- Button (magnetic, glow, press state) ---------- */
type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'glass' | 'ghost'
  size?: 'md' | 'lg'
  icon?: ReactNode
}

export function Button({ variant = 'primary', size = 'md', icon, children, className = '', ...rest }: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || isCoarsePointer()) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) / r.width
      const y = (e.clientY - r.top - r.height / 2) / r.height
      el.style.setProperty('--tx', `${x * 8}px`)
      el.style.setProperty('--ty', `${y * 6}px`)
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    }
    const onLeave = () => {
      el.style.setProperty('--tx', '0px')
      el.style.setProperty('--ty', '0px')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <a ref={ref} className={`btn btn--${variant} btn--${size} ${className}`} {...rest}>
      <span className="btn__label">{children}</span>
      {icon && <span className="btn__icon">{icon}</span>}
    </a>
  )
}

/* ---------- SplitText: words wrapped in masks for staggered reveals ---------- */
export function SplitText({ text, className }: { text: string; className?: string }) {
  const lines = text.split('\n')
  return (
    <span className={className} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, li) => (
        <span className="split-line-row" key={li} aria-hidden="true">
          {line.split(' ').map((w, wi) => (
            <span className="split-word" key={wi}>
              <span>{w}</span>
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}

/* ---------- Spotlight card (border + surface glow follows pointer) ---------- */
export function SpotlightCard({ children, className = '', as: Tag = 'div' }: {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'li'
}) {
  const ref = useRef<HTMLDivElement>(null)
  useSpotlight(ref)
  return (
    <Tag ref={ref as never} className={`spot-card ${className}`}>
      <span className="spot-card__glow" aria-hidden="true" />
      {children}
    </Tag>
  )
}

/* ---------- Toggle (visual switch) ---------- */
export function Toggle({ on, label, onChange, size = 'md' }: {
  on: boolean
  label: string
  onChange?: (v: boolean) => void
  size?: 'sm' | 'md'
}) {
  const interactive = !!onChange
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      tabIndex={interactive ? 0 : -1}
      className={`toggle toggle--${size} ${on ? 'is-on' : ''}`}
      onClick={() => onChange?.(!on)}
      disabled={!interactive}
    >
      <span className="toggle__knob" />
    </button>
  )
}

/* ---------- Section seam: animated light line between sections ---------- */
export function Seam({ tone = 'primary' }: { tone?: 'primary' | 'secondary' }) {
  return (
    <div className={`seam seam--${tone}`} aria-hidden="true">
      <span className="seam__line" />
      <span className="seam__spark" />
    </div>
  )
}
