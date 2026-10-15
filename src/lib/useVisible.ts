import { useEffect, useRef, useState, type RefObject } from 'react'

/** Ref-based visibility flag — for rAF loops that must not re-render. */
export function useVisibleRef(target: RefObject<Element | null>, rootMargin = '100px') {
  const visible = useRef(false)
  useEffect(() => {
    const el = target.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [target, rootMargin])
  return visible
}

/** State-based visibility — for components that toggle CSS animations. */
export function useInView(target: RefObject<Element | null>, rootMargin = '0px') {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = target.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [target, rootMargin])
  return inView
}
