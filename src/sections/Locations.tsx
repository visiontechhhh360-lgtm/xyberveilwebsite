import { useEffect, useMemo, useRef, useState } from 'react'
import { PRODUCT, locationLabel } from '../config/site'
import { SplitText } from '../components/ui'
import { gsap, MOTION_OK } from '../lib/gsap'
import { prefersReducedMotion, seeded } from '../lib/motion'
import { useGsap } from '../lib/useGsap'
import { useReveal } from '../lib/useReveal'
import { useInView } from '../lib/useVisible'
import './Locations.css'

const W = 1200
const H = 620
const HUB = { x: W / 2, y: H / 2 + 20 }
const COUNT = PRODUCT.locationsCount + 2 // "30+" — abstract nodes, not real places

interface Node { x: number; y: number; r: number }

function buildNodes(): Node[] {
  const rand = seeded(1337)
  const nodes: Node[] = []
  let guard = 0
  while (nodes.length < COUNT && guard++ < 5000) {
    const a = rand() * Math.PI * 2
    const d = Math.sqrt(rand())
    const x = HUB.x + Math.cos(a) * d * (W * 0.46)
    const y = HUB.y + Math.sin(a) * d * (H * 0.42)
    if (Math.hypot(x - HUB.x, y - HUB.y) < 110) continue
    if (nodes.some((n) => Math.hypot(n.x - x, n.y - y) < 78)) continue
    nodes.push({ x, y, r: 3 + rand() * 2.5 })
  }
  return nodes
}

function buildMesh(nodes: Node[]) {
  const edges = new Set<string>()
  nodes.forEach((n, i) => {
    const near = nodes
      .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
    near.forEach(({ j }) => edges.add(i < j ? `${i}-${j}` : `${j}-${i}`))
  })
  return [...edges].map((e) => e.split('-').map(Number) as [number, number])
}

const arc = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2 - Math.hypot(b.x - a.x, b.y - a.y) * 0.28
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`
}

export function Locations() {
  const root = useRef<HTMLElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)
  const nodes = useMemo(buildNodes, [])
  const mesh = useMemo(() => buildMesh(nodes), [nodes])
  const [active, setActive] = useState(6)
  const [userLock, setUserLock] = useState(false)
  const inView = useInView(fieldRef)
  useReveal(root)

  // Ambient auto-cycle when the user isn't interacting
  useEffect(() => {
    if (!inView || userLock || prefersReducedMotion()) return
    const id = setInterval(() => setActive((a) => (a + 7) % nodes.length), 2600)
    return () => clearInterval(id)
  }, [inView, userLock, nodes.length])

  useGsap(root, (mm, el) => {
    mm.add(MOTION_OK, () => {
      const st = { trigger: el.querySelector('.loc__field'), start: 'top 75%', once: true }
      gsap.fromTo(el.querySelectorAll('.loc__node'), { opacity: 0 }, { opacity: 1, duration: 1, stagger: { each: 0.03, from: 'center' }, scrollTrigger: st })
      gsap.fromTo(el.querySelectorAll('.loc__dot'), { scale: 0 }, { scale: 1, transformOrigin: '50% 50%', duration: 1, stagger: { each: 0.03, from: 'center' }, scrollTrigger: st, ease: 'back.out(3)' })
      gsap.fromTo(el.querySelectorAll('.loc__mesh line'), { opacity: 0 }, { opacity: 1, duration: 1.4, stagger: 0.01, scrollTrigger: st, delay: 0.3 })
      gsap.fromTo(el.querySelector('.loc__big'), { yPercent: 10 }, { yPercent: -10, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
    })
  })

  const target = nodes[active]
  const pathD = arc(HUB, target)
  const still = useMemo(() => prefersReducedMotion(), [])

  return (
    <section ref={root} id="locations" className="loc section" aria-labelledby="loc-title">
      <div className="loc__bg" aria-hidden="true" />
      <div className="container">
        <header className="section-head section-head--center">
          <span className="eyebrow" data-reveal="fade">Locations</span>
          <h2 id="loc-title" className="h2 text-gradient" data-reveal="words">
            <SplitText text={`${PRODUCT.locationsLabel} locations to connect to.`} />
          </h2>
          <p className="lead" data-reveal="up" data-delay="0.1">
            Choose where your VPN connection goes. Xyberveil currently provides {PRODUCT.locationsLabel} locations — pick
            the one that suits you.
          </p>
        </header>

        <div ref={fieldRef} className="loc__field" onPointerLeave={() => setUserLock(false)}>
          <div className="loc__big text-chrome" aria-hidden="true">{PRODUCT.locationsLabel}</div>
          <div className="loc__plane">
          <svg viewBox={`0 0 ${W} ${H}`} className="loc__svg" role="group" aria-label={`${PRODUCT.locationsLabel} locations network (abstract)`}>
            <defs>
              <radialGradient id="loc-hub" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#5fe0e8" stopOpacity=".5" />
                <stop offset="1" stopColor="#5fe0e8" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="loc-arc" gradientUnits="userSpaceOnUse" x1={HUB.x} y1={HUB.y} x2={target.x} y2={target.y}>
                <stop offset="0" stopColor="#38c9d6" />
                <stop offset="1" stopColor="#8c86ff" />
              </linearGradient>
            </defs>

            <g className="loc__rings" aria-hidden="true">
              {[120, 220, 320].map((r) => (
                <ellipse key={r} cx={HUB.x} cy={HUB.y} rx={r * 1.6} ry={r} />
              ))}
            </g>

            <g className="loc__mesh" aria-hidden="true">
              {mesh.map(([a, b]) => (
                <line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
              ))}
            </g>

            {/* A few particles travelling the mesh — subtle, not everywhere */}
            {!still && inView && (
              <g className="loc__particles" aria-hidden="true">
                {mesh.filter((_, i) => i % 4 === 0).slice(0, 12).map(([a, b], i) => (
                  <circle key={`p${a}-${b}`} r="1.8">
                    <animateMotion
                      dur={`${3 + (i % 4)}s`}
                      begin={`${(i * 0.7) % 4}s`}
                      repeatCount="indefinite"
                      path={`M ${nodes[a].x} ${nodes[a].y} L ${nodes[b].x} ${nodes[b].y}`}
                    />
                    <animate attributeName="opacity" values="0;0.9;0" dur={`${3 + (i % 4)}s`} begin={`${(i * 0.7) % 4}s`} repeatCount="indefinite" />
                  </circle>
                ))}
              </g>
            )}

            <g aria-hidden="true">
              <path d={pathD} className="loc__arc-glow" key={`g${active}`} />
              <path d={pathD} className="loc__arc" key={`a${active}`} stroke="url(#loc-arc)" />
            </g>

            {nodes.map((n, i) => (
              <g
                key={i}
                className={`loc__node ${i === active ? 'is-active' : ''}`}
                transform={`translate(${n.x} ${n.y})`}
                tabIndex={0}
                role="button"
                aria-label={locationLabel(i)}
                aria-pressed={i === active}
                onPointerEnter={() => { setUserLock(true); setActive(i) }}
                onFocus={() => { setUserLock(true); setActive(i) }}
                onClick={() => { setUserLock(true); setActive(i) }}
              >
                <circle r="18" className="loc__hit" />
                <circle r={n.r + 8} className="loc__halo" />
                <circle r={n.r} className="loc__dot" />
              </g>
            ))}

            <g className="loc__hub" transform={`translate(${HUB.x} ${HUB.y})`} aria-hidden="true">
              <circle r="70" fill="url(#loc-hub)" />
              <circle r="26" className="loc__hub-ring" />
              <circle r="9" className="loc__hub-core" />
            </g>
          </svg>
          </div>

          <div className="loc__readout glass glass--thin" aria-live="polite">
            <span className="loc__readout-k mono">Route</span>
            <span className="loc__readout-v">
              You <span className="loc__readout-arrow" /> <strong>{locationLabel(active)}</strong>
            </span>
          </div>
        </div>

        <p className="loc__note mono">Abstract visualisation — node positions do not represent real geography.</p>
      </div>
    </section>
  )
}
