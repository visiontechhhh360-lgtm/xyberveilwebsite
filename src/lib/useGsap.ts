import { useLayoutEffect, type DependencyList, type RefObject } from 'react'
import { gsap } from './gsap'

/**
 * Runs GSAP setup scoped to an element and reverts everything on cleanup.
 * The callback receives a gsap.matchMedia instance so each section can
 * branch on reduced motion / breakpoints.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (mm: gsap.MatchMedia, el: HTMLElement) => void,
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    const el = scope.current
    if (!el) return
    const mm = gsap.matchMedia(el)
    setup(mm, el)
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
