import { useEffect, useRef } from 'react'
import { isCoarsePointer, lerp, prefersReducedMotion, seeded } from '../lib/motion'

/**
 * Abstract network globe. Nodes are NOT real locations — they are
 * decorative connection points. Dots blend teal → indigo across the sphere,
 * echoing the split colour field of the Xyberveil shield.
 */

type V3 = [number, number, number]

const TEAL: [number, number, number] = [56, 201, 214]
const INDIGO: [number, number, number] = [124, 116, 246]
const ALPHA_STEPS = 6
const HUE_STEPS = 4

function fibonacciSphere(n: number): V3[] {
  const pts: V3[] = []
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const t = phi * i
    pts.push([Math.cos(t) * r, y, Math.sin(t) * r])
  }
  return pts
}

function slerp(a: V3, b: V3, t: number): V3 {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
  const om = Math.acos(dot)
  if (om < 1e-4) return a
  const s = Math.sin(om)
  const k1 = Math.sin((1 - t) * om) / s
  const k2 = Math.sin(t * om) / s
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2]
}

const mix = (t: number) =>
  `${Math.round(lerp(TEAL[0], INDIGO[0], t))},${Math.round(lerp(TEAL[1], INDIGO[1], t))},${Math.round(lerp(TEAL[2], INDIGO[2], t))}`

export function GlobeCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = prefersReducedMotion()
    const small = window.innerWidth < 720
    const dots = fibonacciSphere(small ? 650 : 1150)
    const rand = seeded(7)

    // Decorative nodes (abstract, not geographic)
    const nodes: V3[] = Array.from({ length: 14 }, () => {
      const u = rand() * 2 - 1
      const th = rand() * Math.PI * 2
      const r = Math.sqrt(1 - u * u)
      return [Math.cos(th) * r, u * 0.8, Math.sin(th) * r] as V3
    })
    const arcs = Array.from({ length: 11 }, (_, i) => ({
      a: nodes[i % nodes.length],
      b: nodes[(i * 5 + 3) % nodes.length],
      speed: 0.12 + rand() * 0.14,
      offset: rand(),
      h: 0.12 + rand() * 0.14,
    }))

    const colors = Array.from({ length: HUE_STEPS }, (_, i) => mix(i / (HUE_STEPS - 1)))
    const buckets: Path2D[][] = []

    let w = 0
    let h = 0
    let dpr = 1
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
    }
    resize()
    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) draw(0)
    })
    ro.observe(canvas)

    // Pointer influence
    let px = 0
    let py = 0
    let cpx = 0
    let cpy = 0
    const onPointer = (e: PointerEvent) => {
      px = (e.clientX / window.innerWidth) * 2 - 1
      py = (e.clientY / window.innerHeight) * 2 - 1
    }
    if (!isCoarsePointer() && !reduced) window.addEventListener('pointermove', onPointer, { passive: true })

    let rotY = 0.6
    const baseTilt = -0.32

    const project = (p: V3, ry: number, rx: number, R: number, cx: number, cy: number) => {
      const cosY = Math.cos(ry), sinY = Math.sin(ry)
      const x1 = p[0] * cosY - p[2] * sinY
      const z1 = p[0] * sinY + p[2] * cosY
      const cosX = Math.cos(rx), sinX = Math.sin(rx)
      const y2 = p[1] * cosX - z1 * sinX
      const z2 = p[1] * sinX + z1 * cosX
      return { x: cx + x1 * R, y: cy + y2 * R, z: z2, sx: x1 }
    }

    function draw(time: number) {
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const R = Math.min(w, h) * 0.42
      const cx = w / 2
      const cy = h / 2
      cpx = lerp(cpx, px, 0.04)
      cpy = lerp(cpy, py, 0.04)
      const ry = rotY + cpx * 0.25
      const rx = baseTilt + cpy * 0.12

      // Sphere body + rim for depth
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R)
      body.addColorStop(0, 'rgba(56,201,214,0.10)')
      body.addColorStop(0.6, 'rgba(60,52,190,0.06)')
      body.addColorStop(1, 'rgba(3,7,12,0)')
      ctx.fillStyle = body
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fill()
      const rim = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R)
      rim.addColorStop(0, 'rgba(95,224,232,0.35)')
      rim.addColorStop(0.5, 'rgba(255,255,255,0.04)')
      rim.addColorStop(1, 'rgba(140,134,255,0.3)')
      ctx.strokeStyle = rim
      ctx.lineWidth = 1
      ctx.stroke()

      // Dots, bucketed by hue + alpha to minimise fillStyle changes
      for (let hIdx = 0; hIdx < HUE_STEPS; hIdx++) {
        buckets[hIdx] = []
        for (let a = 0; a < ALPHA_STEPS; a++) buckets[hIdx][a] = new Path2D()
      }
      for (const d of dots) {
        const p = project(d, ry, rx, R, cx, cy)
        const depth = (p.z + 1) / 2 // 0 back → 1 front
        const hue = Math.min(HUE_STEPS - 1, Math.max(0, Math.floor(((p.sx + 1) / 2) * HUE_STEPS)))
        const a = Math.min(ALPHA_STEPS - 1, Math.floor(depth * ALPHA_STEPS))
        const s = 0.8 + depth * 1.5
        buckets[hue][a].rect(p.x - s / 2, p.y - s / 2, s, s)
      }
      for (let hIdx = 0; hIdx < HUE_STEPS; hIdx++) {
        for (let a = 0; a < ALPHA_STEPS; a++) {
          const alpha = 0.1 + (a / (ALPHA_STEPS - 1)) ** 1.3 * 0.85
          ctx.fillStyle = `rgba(${colors[hIdx]},${alpha.toFixed(3)})`
          ctx.fill(buckets[hIdx][a])
        }
      }

      // Arcs + travelling pulses
      const t = time / 1000
      ctx.lineCap = 'round'
      for (const arc of arcs) {
        const SEG = 40
        let prev: ReturnType<typeof project> | null = null
        const pts: ReturnType<typeof project>[] = []
        for (let i = 0; i <= SEG; i++) {
          const k = i / SEG
          const s = slerp(arc.a, arc.b, k)
          const lift = 1 + Math.sin(Math.PI * k) * arc.h
          const p = project([s[0] * lift, s[1] * lift, s[2] * lift], ry, rx, R, cx, cy)
          pts.push(p)
          if (prev && (p.z > -0.15 || prev.z > -0.15)) {
            const alpha = Math.max(0, Math.min(1, (p.z + 0.2) * 1.2)) * 0.28
            ctx.strokeStyle = `rgba(150,220,235,${alpha.toFixed(3)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(prev.x, prev.y)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
          }
          prev = p
        }
        const prog = (t * arc.speed + arc.offset) % 1
        const head = pts[Math.floor(prog * SEG)]
        if (head && head.z > -0.1) {
          const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 10)
          g.addColorStop(0, 'rgba(210,250,255,0.95)')
          g.addColorStop(0.3, 'rgba(95,224,232,0.5)')
          g.addColorStop(1, 'rgba(95,224,232,0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(head.x, head.y, 10, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Nodes
      for (let i = 0; i < nodes.length; i++) {
        const p = project(nodes[i], ry, rx, R, cx, cy)
        if (p.z < -0.05) continue
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.6 + i)
        const alpha = Math.min(1, (p.z + 0.1) * 1.4)
        ctx.fillStyle = `rgba(95,224,232,${(0.12 * alpha * (0.6 + pulse)).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 7 + pulse * 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(230,252,255,${(0.95 * alpha).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let raf = 0
    let last = performance.now()
    let visible = true
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !reduced) {
        last = performance.now()
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(loop)
      }
    })
    io.observe(canvas)

    function loop(now: number) {
      const dt = Math.min(64, now - last)
      last = now
      rotY += dt * 0.00009
      draw(now)
      if (visible && !document.hidden) raf = requestAnimationFrame(loop)
    }
    const onVis = () => {
      if (!document.hidden && visible && !reduced) {
        last = performance.now()
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(loop)
      }
    }
    document.addEventListener('visibilitychange', onVis)

    if (reduced) draw(0)
    else raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
