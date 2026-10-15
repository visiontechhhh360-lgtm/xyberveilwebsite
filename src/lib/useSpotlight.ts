import { useEffect, type RefObject } from 'react'
import { isCoarsePointer } from './motion'

/** Tracks the pointer inside an element as --mx / --my (px) for glow effects. */
export function useSpotlight(target: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = target.current
    if (!el || isCoarsePointer()) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [target])
}
