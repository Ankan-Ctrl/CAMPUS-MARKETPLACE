import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { iconHover, DURATION } from '../../lib/motion.js'

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-10 font-mono text-sm">
      <motion.button
        {...iconHover}
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="p-2 border border-hairline rounded disabled:opacity-30 hover:border-ink transition-colors duration-200"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </motion.button>
      {pages.map((p) => (
        <motion.button
          key={p}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: DURATION.hover }}
          onClick={() => onChange(p)}
          className={`w-9 h-9 rounded border transition-colors duration-200 ${
            p === page ? 'bg-ink text-bg border-ink' : 'border-hairline hover:border-ink'
          }`}
        >
          {p}
        </motion.button>
      ))}
      <motion.button
        {...iconHover}
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="p-2 border border-hairline rounded disabled:opacity-30 hover:border-ink transition-colors duration-200"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </motion.button>
    </div>
  )
}
