import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { modalOverlay, modalPanel } from '../../lib/motion.js'

export default function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalOverlay}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalPanel}
            className="bg-surface rounded shadow-xl w-full max-w-md border border-hairline"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-hairline">
              <h3 className="font-display font-bold text-lg text-ink">{title}</h3>
              <button onClick={onClose} aria-label="Close" className="text-ink/60 hover:text-ink transition-colors duration-200">
                <X size={18} />
              </button>
            </div>
            <div className="px-5 py-4">{children}</div>
            {footer && <div className="px-5 py-4 border-t border-hairline flex justify-end gap-3">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
