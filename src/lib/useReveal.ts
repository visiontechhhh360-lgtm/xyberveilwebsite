import type { RefObject } from 'react'
import { gsap, MOTION_OK, MOTION_REDUCED } from './gsap'
import { useGsap } from './useGsap'

const PRESETS: Record<string, gsap.TweenVars> = {
  up: { y: 48, opacity: 0 },
  fade: { opacity: 0 },
  scale: { scale: 0.92, opacity: 0, y: 30 },
  left: { x: -60, opacity: 0 },
  right: { x: 60, opacity: 0 },
  blur: { opacity: 0, y: 24, filter: 'blur(12px)' },
}

/**
 * Declarative scroll reveals.
 *   data-reveal="up|fade|scale|left|right|blur|words|stagger"
 *   data-delay="0.1"
 * "words" animates `.split-word > span` children (see <SplitText/>).
 * "stagger" animates direct children in sequence.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGsap(scope, (mm, root) => {
    mm.add(MOTION_OK, () => {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        const type = el.dataset.reveal || 'up'
        const delay = parseFloat(el.dataset.delay || '0')
        const scrollTrigger = { trigger: el, start: 'top 88%', once: true }

        if (type === 'words') {
          gsap.set(el, { opacity: 1 })
          gsap.fromTo(el.querySelectorAll('.split-word > span'), { yPercent: 115, rotate: 4 }, {
            yPercent: 0,
            rotate: 0,
            duration: 1.2,
            stagger: 0.045,
            delay,
            scrollTrigger,
          })
          return
        }
        if (type === 'stagger') {
          gsap.set(el, { opacity: 1 })
          gsap.fromTo(
            el.children,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.08, delay, scrollTrigger, clearProps: 'transform' },
          )
          return
        }
        gsap.fromTo(el, PRESETS[type] ?? PRESETS.up, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          delay,
          duration: 1.2,
          scrollTrigger,
          clearProps: 'filter,transform',
        })
      })
    })
    mm.add(MOTION_REDUCED, () => {
      gsap.set(root.querySelectorAll('[data-reveal]'), { opacity: 1 })
    })
  })
}
