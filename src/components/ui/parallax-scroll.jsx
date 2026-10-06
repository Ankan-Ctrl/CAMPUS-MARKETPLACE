import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '../../lib/utils.js'

export const ParallaxScroll = ({ items, className }) => {
  const gridRef = useRef(null)
  const { scrollYProgress } = useScroll({ container: gridRef, offset: ['start start', 'end start'] })
  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -120])
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 120])
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -120])
  const third = Math.ceil(items.length / 3)
  const firstPart = items.slice(0, third)
  const secondPart = items.slice(third, 2 * third)
  const thirdPart = items.slice(2 * third)
  return (
    <div className={cn('h-[32rem] items-start overflow-y-auto w-full no-scrollbar', className)} ref={gridRef}>
      <div className="grid grid-cols-2 md:grid-cols-3 items-start w-full gap-5 py-2 px-1">
        <div className="grid gap-5">{firstPart.map((el, idx) => (<motion.div style={{ y: translateFirst }} key={'grid-1' + idx}>{el}</motion.div>))}</div>
        <div className="grid gap-5">{secondPart.map((el, idx) => (<motion.div style={{ y: translateSecond }} key={'grid-2' + idx}>{el}</motion.div>))}</div>
        <div className="hidden md:grid gap-5">{thirdPart.map((el, idx) => (<motion.div style={{ y: translateThird }} key={'grid-3' + idx}>{el}</motion.div>))}</div>
      </div>
    </div>
  )
}
export default ParallaxScroll
