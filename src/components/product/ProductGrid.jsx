import React from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import { PackageSearch } from 'lucide-react'
import { useSeenTracker } from '../../hooks/useSeenTracker.js'
import { cardEnter, cardAlreadySeen } from '../../lib/motion.js'

// Spec: the whole visible grid animates in together on first load (no
// per-card stagger), and once a card has been seen it never replays its
// entrance - so filtering/paginating only animates genuinely new cards.
export default function ProductGrid({ products, emptyTitle = 'No items found', emptyDescription }) {
  const { hasSeen, markSeen } = useSeenTracker()

  if (products.length === 0) {
    return <EmptyState icon={PackageSearch} title={emptyTitle} description={emptyDescription} />
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
      {products.map((p, i) => {
        const alreadySeen = hasSeen(p.id)
        if (!alreadySeen) markSeen(p.id)
        return (
          <motion.div
            key={p.id}
            initial="hidden"
            animate="visible"
            variants={alreadySeen ? cardAlreadySeen : cardEnter}
            className="break-inside-avoid"
          >
            <ProductCard product={p} tall={i % 5 === 2} />
          </motion.div>
        )
      })}
    </div>
  )
}
