import React from 'react'
import { motion } from 'framer-motion'
import { Pencil } from 'lucide-react'
import CountUp from '../motion/CountUp.jsx'
import { buttonHover } from '../../lib/motion.js'

export default function ProfileCard({ user, itemsListed, itemsSold, purchaseCount, onEdit }) {
  const safeUser = user ?? { name: 'Guest', department: 'No department', year: 'N/A', email: 'guest@example.com' }
  const initials = safeUser.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'G'

  return (
    <div className="bg-surface border border-hairline rounded p-7">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
        <div className="w-20 h-20 rounded-full bg-accent-soft flex items-center justify-center font-mono text-2xl text-ink flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display font-bold text-xl text-ink">{safeUser.name}</h2>
          <p className="text-ink/60 text-[14px]">{safeUser.department} &middot; {safeUser.year}</p>
          <p className="text-ink/60 text-[14px]">{safeUser.email}</p>
        </div>
        <motion.button
          {...buttonHover}
          onClick={onEdit}
          className="flex items-center gap-2 border border-ink rounded px-4 py-2.5 text-[13.5px] font-medium hover:bg-ink hover:text-bg transition-colors duration-200 self-start"
        >
          <Pencil size={14} /> Edit Profile
        </motion.button>
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-hairline pt-6">
        <div className="text-center">
          <p className="font-display font-extrabold text-2xl text-ink"><CountUp value={itemsListed} /></p>
          <p className="text-[12.5px] text-ink/55 font-mono mt-1">Items Listed</p>
        </div>
        <div className="text-center border-x border-hairline">
          <p className="font-display font-extrabold text-2xl text-ink"><CountUp value={itemsSold} /></p>
          <p className="text-[12.5px] text-ink/55 font-mono mt-1">Items Sold</p>
        </div>
        <div className="text-center">
          <p className="font-display font-extrabold text-2xl text-ink"><CountUp value={purchaseCount} /></p>
          <p className="text-[12.5px] text-ink/55 font-mono mt-1">Purchases</p>
        </div>
      </div>
    </div>
  )
}
