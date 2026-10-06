import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductThumb from './ProductThumb.jsx'
import { iconHover } from '../../lib/motion.js'

export default function ImageGallery({ product }) {
  const hasRealPhotos = product.images && product.images.length > 0
  const images = hasRealPhotos ? product.images : [0, 1, 2]
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="relative aspect-square rounded overflow-hidden border border-hairline mb-3">
        <AnimatePresence>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <ProductThumb icon={product.icon} tint={product.tint} image={hasRealPhotos ? images[active] : undefined} />
          </motion.div>
        </AnimatePresence>
        <motion.button
          {...iconHover}
          onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-surface/85 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-surface transition-colors duration-200"
          aria-label="Previous image"
        >
          <ChevronLeft size={18} />
        </motion.button>
        <motion.button
          {...iconHover}
          onClick={() => setActive((a) => (a + 1) % images.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-surface/85 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-surface transition-colors duration-200"
          aria-label="Next image"
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>
      <div className="flex gap-3">
        {images.map((img, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActive(i)}
            className={`w-16 h-16 rounded overflow-hidden border transition-colors duration-200 flex-shrink-0 ${
              active === i ? 'border-ink' : 'border-hairline opacity-70 hover:opacity-100'
            }`}
          >
            <ProductThumb icon={product.icon} tint={product.tint} image={hasRealPhotos ? img : undefined} />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
