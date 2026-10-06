import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Cursor-aware magnetic pull, capped at a few px per the spec. GSAP owns the
// transform (x/y/scale) on whatever node the returned ref is attached to, so
// it never fights Framer Motion for the same CSS property - Framer Motion is
// used elsewhere (opacity, shadow, layout) on these same elements instead.
export function useMagnetic({ strength = 8, hoverScale = 1 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })
    const scaleTo = gsap.quickTo(el, 'scale', { duration: 0.3, ease: 'power3.out' })

    function onMove(e) {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - rect.left - rect.width / 2
      const relY = e.clientY - rect.top - rect.height / 2
      xTo(Math.max(-strength, Math.min(strength, relX * 0.3)))
      yTo(Math.max(-strength, Math.min(strength, relY * 0.3)))
    }
    function onEnter() {
      if (hoverScale !== 1) scaleTo(hoverScale)
    }
    function onLeave() {
      xTo(0)
      yTo(0)
      if (hoverScale !== 1) scaleTo(1)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength, hoverScale])

  return ref
}
