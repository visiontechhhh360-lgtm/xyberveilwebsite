import { useEffect, type RefObject } from 'react'
import { isCoarsePointer, lerp, prefersReducedMotion } from './motion'

/**
 * Pointer-driven 3D tilt. Writes --rx / --ry / --px / --py CSS variables on
 * the target so CSS decides how to use them (rotation, parallax layers, glare).
 * `area` is the element that listens for pointer movement (defaults to target).
 */
export function useTilt(
  target: RefObject<HTMLElement | null>,
  { max = 10, area }: { max?: number; area?: RefObject<HTMLElement | null> } = {},
) {
  useEffect(() => {
    const el = target.current
    const zone = area?.current ?? el
    if (!el || !zone || prefersReducedMotion() || isCoarsePointer()) return

    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let raf = 0
    let running = false

    const tick = () => {
      cx = lerp(cx, tx, 0.08)
      cy = lerp(cy, ty, 0.08)
      el.style.setProperty('--rx', `${(-cy * max).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(cx * max).toFixed(2)}deg`)
      el.style.setProperty('--px', cx.toFixed(3))
      el.style.setProperty('--py', cy.toFixed(3))
      if (Math.abs(cx - tx) > 0.001 || Math.abs(cy - ty) > 0.001) raf = requestAnimationFrame(tick)
      else running = false
    }
    const kick = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }
    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width) * 2 - 1
      ty = ((e.clientY - r.top) / r.height) * 2 - 1
      kick()
    }
    const onLeave = () => {
      tx = 0
      ty = 0
      kick()
    }

    zone.addEventListener('pointermove', onMove)
    zone.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      zone.removeEventListener('pointermove', onMove)
      zone.removeEventListener('pointerleave', onLeave)
    }
  }, [target, area, max])
}
