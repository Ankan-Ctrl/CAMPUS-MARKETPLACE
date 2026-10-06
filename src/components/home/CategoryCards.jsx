import React from 'react'
import { motion } from 'framer-motion'
import { getIcon } from '../../utils/icons.js'
import { CATEGORIES } from '../../data/mockData.js'
import { MotionLink } from '../motion/MotionLink.jsx'
import { useMagnetic } from '../../hooks/useMagnetic.js'
import { EASE_OUT, DURATION, OFFSET, revealBlock } from '../../lib/motion.js'

function CategoryCard({ cat }) {
  const Icon = getIcon(cat.icon)
  const iconRef = useMagnetic({ strength: 5, hoverScale: 1.05 })

  return (
    <MotionLink
      to={`/category/${cat.slug}`}
      whileHover={{ y: -OFFSET.lift, boxShadow: '0 14px 30px -18px rgba(32,48,28,0.28)' }}
      transition={{ duration: DURATION.hover, ease: EASE_OUT }}
      className="group flex flex-col items-center justify-center gap-3 py-8 px-4 border border-hairline rounded bg-surface hover:border-ink transition-colors duration-200"
    >
      <div
        ref={iconRef}
        className="w-12 h-12 rounded-full bg-accent-soft/40 flex items-center justify-center group-hover:bg-accent-soft/70 transition-colors duration-200"
      >
        <Icon size={22} className="text-accent-deep" />
      </div>
      <span className="text-[13.5px] font-medium text-ink text-center">{cat.name}</span>
    </MotionLink>
  )
}

export default function CategoryCards() {
  return (
    <motion.section
      className="max-w-6xl mx-auto px-7 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={revealBlock()}
    >
      <h2 className="font-display font-bold text-2xl text-ink mb-7">Popular categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.slug} cat={cat} />
        ))}
      </div>
    </motion.section>
  )
}
