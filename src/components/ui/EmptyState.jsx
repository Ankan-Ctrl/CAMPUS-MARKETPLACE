import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Inbox } from 'lucide-react'
import { floatLoop } from '../../lib/motion.js'

export default function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <motion.div
        animate={reduceMotion ? {} : floatLoop.animate}
        className="w-14 h-14 rounded-full bg-accent-soft/40 flex items-center justify-center mb-5"
      >
        <Icon size={24} className="text-accent-deep" />
      </motion.div>
      <h3 className="font-display font-bold text-lg text-ink mb-2">{title}</h3>
      {description && <p className="text-ink/60 max-w-sm mb-6">{description}</p>}
      {action}
    </div>
  )
}
