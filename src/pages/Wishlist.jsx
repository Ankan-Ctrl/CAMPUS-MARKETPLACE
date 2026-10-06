import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trash2 } from 'lucide-react'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import ProductThumb from '../components/product/ProductThumb.jsx'
import { useApp } from '../context/AppContext.jsx'
import { CATEGORIES } from '../data/mockData.js'
import { formatPrice, categoryName } from '../utils/format.js'
import { EASE_OUT, DURATION } from '../lib/motion.js'

export default function Wishlist() {
  const { products, wishlist, toggleWishlist, showToast } = useApp()
  const items = products.filter((p) => wishlist.includes(p.id))

  return (
    <div className="max-w-5xl mx-auto px-7 py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
      <h1 className="font-display font-bold text-2xl text-ink mb-7">Your wishlist</h1>

      {items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save items while browsing to find them here later."
          action={<Link to="/browse" className="bg-accent text-bg font-semibold text-[14px] px-5 py-2.5 rounded hover:bg-accent-deep transition-colors duration-200">Browse listings</Link>}
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {items.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: DURATION.card, ease: EASE_OUT } }}
                transition={{ layout: { duration: DURATION.card, ease: EASE_OUT } }}
                className="flex items-center gap-4 border border-hairline rounded p-3.5 bg-surface"
              >
                <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                  <ProductThumb icon={p.icon} tint={p.tint} image={p.images?.[0]} />
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${p.id}`} className="font-display font-bold text-ink hover:text-accent-deep transition-colors duration-200 truncate block">
                    {p.name}
                  </Link>
                  <p className="text-[13px] text-ink/55">{categoryName(p.category, CATEGORIES)} &middot; {p.condition}</p>
                  <p className="font-mono text-accent-deep text-[14px] mt-1">{formatPrice(p.price)}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link to={`/product/${p.id}`} className="text-[13px] font-medium border border-hairline rounded px-3.5 py-2 hover:border-ink transition-colors duration-200">
                    View
                  </Link>
                  <button
                    onClick={() => { toggleWishlist(p.id); showToast('Removed from wishlist') }}
                    aria-label="Remove from wishlist"
                    className="p-2 text-ink/50 hover:text-ink transition-colors duration-200"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
