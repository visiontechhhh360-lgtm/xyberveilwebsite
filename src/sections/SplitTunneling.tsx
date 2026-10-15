import { useEffect, useMemo, useRef, useState, type ComponentType, type SVGProps } from 'react'
import logoUrl from '../assets/xyberveil-logo-256.webp'
import { IconBrowser, IconChat, IconCode, IconGame, IconGlobe, IconMail } from '../components/Icons'
import { SplitText, Toggle } from '../components/ui'
import { prefersReducedMotion } from '../lib/motion'
import { useReveal } from '../lib/useReveal'
import './SplitTunneling.css'

/**
 * Conceptual Split Tunneling demo. App names are generic categories used
 * purely to illustrate routing — not a statement about specific apps.
 */

type Route = 'vpn' | 'direct'
interface DemoApp { id: string; name: string; icon: ComponentType<SVGProps<SVGSVGElement>>; tint: string }

// Generic app categories with neutral tile colours (no real brands)
const APPS: DemoApp[] = [
  { id: 'browser', name: 'Browser', icon: IconBrowser, tint: '#3b82f6' },
  { id: 'mail', name: 'Email', icon: IconMail, tint: '#0ea5e9' },
  { id: 'chat', name: 'Chat', icon: IconChat, tint: '#22c55e' },
  { id: 'code', name: 'Work', icon: IconCode, tint: '#8b5cf6' },
  { id: 'game', name: 'Games', icon: IconGame, tint: '#f97316' },
]
const INITIAL: Route[] = ['vpn', 'vpn', 'direct', 'vpn', 'direct']

/* ---------- Geometry ---------- */
interface Pt { x: number; y: number }
interface Geo {
  w: number
  h: number
  vertical: boolean
  apps: Pt[]
  outlet: (p: Pt) => Pt
  device: Pt
  vpn: Pt
  direct: Pt
  internet: Pt
}

const H_GEO: Geo = {
  w: 1000,
  h: 560,
  vertical: false,
  apps: [70, 175, 280, 385, 490].map((y) => ({ x: 105, y })),
  outlet: (p) => ({ x: p.x + 88, y: p.y }),
  device: { x: 355, y: 280 },
  vpn: { x: 625, y: 135 },
  direct: { x: 625, y: 425 },
  internet: { x: 895, y: 280 },
}
const V_GEO: Geo = {
  w: 400,
  h: 720,
  vertical: true,
  apps: [44, 122, 200, 278, 356].map((x) => ({ x, y: 62 })),
  outlet: (p) => ({ x: p.x, y: p.y + 40 }),
  device: { x: 200, y: 245 },
  vpn: { x: 104, y: 450 },
  direct: { x: 296, y: 450 },
  internet: { x: 200, y: 650 },
}

const seg = (a: Pt, b: Pt, vertical: boolean) => {
  if (vertical) {
    const dy = (b.y - a.y) * 0.55
    return `C ${a.x} ${a.y + dy}, ${b.x} ${b.y - dy}, ${b.x} ${b.y}`
  }
  const dx = (b.x - a.x) * 0.55
  return `C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`
}
const line = (a: Pt, b: Pt, v: boolean) => `M ${a.x} ${a.y} ${seg(a, b, v)}`
const fullRoute = (g: Geo, i: number, r: Route) => {
  const o = g.outlet(g.apps[i])
  const node = r === 'vpn' ? g.vpn : g.direct
  return `M ${o.x} ${o.y} ${seg(o, g.device, g.vertical)} ${seg(g.device, node, g.vertical)} ${seg(node, g.internet, g.vertical)}`
}
const pct = (g: Geo, p: Pt) => ({ left: `${(p.x / g.w) * 100}%`, top: `${(p.y / g.h) * 100}%` })

/* ---------- Particles ---------- */
const POOL = 44
interface Particle { app: number; route: Route; t: number; speed: number; alive: boolean }

function useVertical() {
  const [v, setV] = useState(() => typeof window !== 'undefined' && window.innerWidth < 820)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 819px)')
    const on = () => setV(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return v
}

export function SplitTunneling() {
  const root = useRef<HTMLElement>(null)
  const diagramRef = useRef<HTMLDivElement>(null)
  useReveal(root)

  const vertical = useVertical()
  const g = vertical ? V_GEO : H_GEO
  const [routes, setRoutes] = useState<Route[]>(INITIAL)
  const [splitOn, setSplitOn] = useState(true)
  const [drag, setDrag] = useState<{ i: number; dx: number; dy: number; over: Route | null } | null>(null)

  const effective: Route[] = useMemo(() => (splitOn ? routes : routes.map(() => 'vpn' as Route)), [routes, splitOn])
  const effRef = useRef(effective)
  effRef.current = effective

  const vpnCount = effective.filter((r) => r === 'vpn').length
  const directCount = effective.length - vpnCount

  const setRoute = (i: number, r: Route) => setRoutes((rs) => rs.map((x, k) => (k === i ? r : x)))
  const toggle = (i: number) => splitOn && setRoute(i, routes[i] === 'vpn' ? 'direct' : 'vpn')

  /* Hidden measurement paths + particle pool, driven by rAF */
  const vpnPaths = useRef<(SVGPathElement | null)[]>([])
  const directPaths = useRef<(SVGPathElement | null)[]>([])
  const dots = useRef<(SVGCircleElement | null)[]>([])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const parts: Particle[] = Array.from({ length: POOL }, () => ({ app: 0, route: 'vpn', t: 0, speed: 0, alive: false }))
    const nextSpawn = APPS.map((_, i) => i * 220)
    let visible = false
    let raf = 0
    let last = performance.now()
    let clock = 0

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) {
        last = performance.now()
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(loop)
      }
    })
    if (diagramRef.current) io.observe(diagramRef.current)

    function loop(now: number) {
      const dt = Math.min(50, now - last)
      last = now
      clock += dt

      // spawn
      for (let a = 0; a < APPS.length; a++) {
        if (clock >= nextSpawn[a]) {
          nextSpawn[a] = clock + 700 + Math.random() * 500
          const p = parts.find((x) => !x.alive)
          if (p) {
            p.app = a
            p.route = effRef.current[a]
            p.t = 0
            p.speed = (p.route === 'vpn' ? 0.00021 : 0.00017) * (0.85 + Math.random() * 0.3)
            p.alive = true
          }
        }
      }
      // move + draw
      for (let k = 0; k < POOL; k++) {
        const p = parts[k]
        const c = dots.current[k]
        if (!c) continue
        if (!p.alive) {
          c.setAttribute('opacity', '0')
          continue
        }
        p.t += dt * p.speed
        if (p.t >= 1) {
          p.alive = false
          c.setAttribute('opacity', '0')
          continue
        }
        const path = (p.route === 'vpn' ? vpnPaths : directPaths).current[p.app]
        if (!path) continue
        const len = path.getTotalLength()
        const pt = path.getPointAtLength(p.t * len)
        const fade = Math.min(1, p.t * 8, (1 - p.t) * 8)
        c.setAttribute('cx', pt.x.toFixed(1))
        c.setAttribute('cy', pt.y.toFixed(1))
        c.setAttribute('opacity', fade.toFixed(2))
        c.setAttribute('class', `st-dot st-dot--${p.route}`)
      }
      if (visible && !document.hidden) raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [vertical])

  /* ---------- Drag between routes ---------- */
  const onPointerDown = (i: number) => (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!splitOn || e.button !== 0) return
    const startX = e.clientX
    const startY = e.clientY
    const el = diagramRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const scale = rect.width / g.w
    let moved = false

    const nearest = (cx: number, cy: number): Route | null => {
      const x = (cx - rect.left) / scale
      const y = (cy - rect.top) / scale
      const dv = Math.hypot(x - g.vpn.x, y - g.vpn.y)
      const dd = Math.hypot(x - g.direct.x, y - g.direct.y)
      const lim = g.vertical ? 150 : 200
      if (Math.min(dv, dd) > lim) return null
      return dv < dd ? 'vpn' : 'direct'
    }
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      if (!moved && Math.hypot(dx, dy) < 6) return
      moved = true
      setDrag({ i, dx, dy, over: nearest(ev.clientX, ev.clientY) })
    }
    const up = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      if (moved) {
        const target = nearest(ev.clientX, ev.clientY)
        if (target) setRoute(i, target)
        setDrag(null)
        // swallow the click that follows a drag
        const stop = (ce: MouseEvent) => { ce.stopPropagation(); ce.preventDefault() }
        window.addEventListener('click', stop, { capture: true, once: true })
        setTimeout(() => window.removeEventListener('click', stop, { capture: true }), 50)
      }
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  const reduced = typeof window !== 'undefined' && prefersReducedMotion()

  return (
    <section ref={root} id="split-tunneling" className="st section" aria-labelledby="st-title">
      <div className="st__bg" aria-hidden="true" />
      <div className="container">
        <div className="st__head">
          <div className="section-head">
            <span className="eyebrow" data-reveal="fade">Split Tunneling</span>
            <h2 id="st-title" className="h2 text-gradient" data-reveal="words">
              <SplitText text={'Choose what goes\nthrough the VPN.'} />
            </h2>
          </div>
          <div className="st__intro" data-reveal="up" data-delay="0.1">
            <p className="lead">
              With Split Tunneling, selected apps send their traffic through Xyberveil while everything else follows your
              normal connection.
            </p>
            <p className="st__hint mono">Tap an app to switch its route — or drag it onto a path.</p>
          </div>
        </div>

        <div className="st__panel" data-reveal="up">
          <div className="st__winbar" aria-hidden="true">
            <span className="win__lights"><i /><i /><i /></span>
            <span className="st__wintitle"><img src={logoUrl} alt="" width={14} height={14} />Xyberveil — Split Tunneling</span>
          </div>
          <div className="st__toolbar">
            <label className="st__master">
              <span>Split Tunneling</span>
              <Toggle on={splitOn} label="Split Tunneling (demo)" onChange={setSplitOn} />
            </label>
            <p className="st__summary" aria-live="polite">
              <span className="st__count st__count--vpn">{vpnCount}</span> via Xyberveil VPN
              <span className="st__sep" />
              <span className="st__count">{directCount}</span> via normal connection
            </p>
            <div className="st__actions">
              <button type="button" className="st__chip" onClick={() => setRoutes(APPS.map(() => 'vpn'))} disabled={!splitOn}>All via VPN</button>
              <button type="button" className="st__chip" onClick={() => setRoutes(INITIAL)} disabled={!splitOn}>Reset</button>
            </div>
          </div>

          <div
            ref={diagramRef}
            className={`st__diagram ${vertical ? 'is-vertical' : ''} ${drag ? 'is-dragging' : ''} ${!splitOn ? 'is-all' : ''}`}
            style={{ aspectRatio: `${g.w} / ${g.h}` }}
          >
            <svg viewBox={`0 0 ${g.w} ${g.h}`} className="st__svg" aria-hidden="true">
              <defs>
                <linearGradient id="st-vpn-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#38c9d6" />
                  <stop offset="1" stopColor="#8c86ff" />
                </linearGradient>
                <filter id="st-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>

              {/* Tunnel body */}
              <path d={line(g.device, g.vpn, g.vertical) + ' ' + seg(g.vpn, g.internet, g.vertical)} className="st__tunnel" style={{ opacity: vpnCount ? 0.3 : 0.06 }} />
              <path d={line(g.device, g.vpn, g.vertical) + ' ' + seg(g.vpn, g.internet, g.vertical)} className="st__trunk st__trunk--vpn" style={{ opacity: vpnCount ? 1 : 0.2 }} />
              <path d={line(g.device, g.direct, g.vertical) + ' ' + seg(g.direct, g.internet, g.vertical)} className="st__trunk st__trunk--direct" style={{ opacity: directCount ? 1 : 0.2 }} />

              {/* App feeders */}
              {APPS.map((a, i) => (
                <path key={a.id} d={line(g.outlet(g.apps[i]), g.device, g.vertical)} className={`st__feed st__feed--${effective[i]}`} />
              ))}

              {/* Hidden measurement paths */}
              {APPS.map((a, i) => (
                <g key={`m-${a.id}`} fill="none" stroke="none">
                  <path ref={(el) => { vpnPaths.current[i] = el }} d={fullRoute(g, i, 'vpn')} />
                  <path ref={(el) => { directPaths.current[i] = el }} d={fullRoute(g, i, 'direct')} />
                </g>
              ))}

              {/* Particle pool */}
              {!reduced && Array.from({ length: POOL }, (_, k) => (
                <circle key={k} ref={(el) => { dots.current[k] = el }} r={vertical ? 3.4 : 3.2} opacity="0" className="st-dot" />
              ))}
            </svg>

            {/* Nodes */}
            <div className="st__node st__node--device" style={pct(g, g.device)}>
              <span className="st__node-core" />
              <span className="st__node-label">Your device</span>
            </div>
            <div className={`st__node st__node--vpn ${drag?.over === 'vpn' ? 'is-target' : ''} ${drag ? 'is-drop' : ''}`} style={pct(g, g.vpn)}>
              <img src={logoUrl} alt="" width={26} height={26} />
              <span className="st__node-text"><strong>Xyberveil VPN</strong><small>{vpnCount} {vpnCount === 1 ? 'app' : 'apps'}</small></span>
            </div>
            <div className={`st__node st__node--direct ${drag?.over === 'direct' ? 'is-target' : ''} ${drag ? 'is-drop' : ''}`} style={pct(g, g.direct)}>
              <span className="st__node-ico" />
              <span className="st__node-text"><strong>Normal connection</strong><small>{directCount} {directCount === 1 ? 'app' : 'apps'}</small></span>
            </div>
            <div className="st__node st__node--internet" style={pct(g, g.internet)}>
              <IconGlobe width={20} height={20} />
              <span className="st__node-text"><strong>Internet</strong></span>
            </div>

            {/* Apps */}
            {APPS.map((a, i) => {
              const r = effective[i]
              const isDrag = drag?.i === i
              return (
                <button
                  key={a.id}
                  type="button"
                  className={`st__app st__app--${r} ${isDrag ? 'is-drag' : ''}`}
                  style={{
                    ['--tile' as string]: a.tint,
                    ...pct(g, g.apps[i]),
                    ...(isDrag ? { translate: `${drag.dx}px ${drag.dy}px` } : null),
                  }}
                  onClick={() => toggle(i)}
                  onPointerDown={onPointerDown(i)}
                  aria-pressed={r === 'vpn'}
                  aria-label={`${a.name}: ${r === 'vpn' ? 'through Xyberveil VPN' : 'normal connection'}. Activate to switch.`}
                  disabled={!splitOn}
                >
                  <span className="st__app-icon"><a.icon width={18} height={18} /></span>
                  <span className="st__app-text">
                    <span className="st__app-name">{a.name}</span>
                    <span className="st__app-route">{r === 'vpn' ? 'VPN' : 'Direct'}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <p className="st__foot mono">
            {splitOn
              ? 'Conceptual illustration of Split Tunneling routing.'
              : 'Split Tunneling off — in this illustration, all app traffic goes through the VPN.'}
          </p>
        </div>
      </div>
    </section>
  )
}
