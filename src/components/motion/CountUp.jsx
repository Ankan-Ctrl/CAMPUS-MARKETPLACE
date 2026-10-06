import React, { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'

export default function CountUp({ value, duration = 0.8 }) {
  const [display, setDisplay] = useState(0)
  const prefersReduced = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (prefersReduced.current) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [value, duration])

  return <>{display}</>
}
