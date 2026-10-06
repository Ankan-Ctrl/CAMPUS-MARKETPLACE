import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { DURATION, EASE_OUT } from '../../lib/motion.js'

export default function WishlistButton({ productId, size = 18, className = '' }) {
  const { isWishlisted, toggleWishlist, showToast } = useApp()
  const active = isWishlisted(productId)

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.85 }}
      transition={{ duration: DURATION.hover, ease: EASE_OUT }}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleWishlist(productId)
        showToast(active ? 'Removed from wishlist' : 'Added to wishlist')
      }}
      className={`inline-flex items-center justify-center rounded-full ${className}`}
    >
      <Heart
        size={size}
        className={active ? 'fill-accent-deep text-accent-deep transition-colors duration-200' : 'text-ink/50 transition-colors duration-200'}
      />
    </motion.button>
  )
}
