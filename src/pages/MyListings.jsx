import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil, Trash2, CheckCircle2, PlusCircle, List } from 'lucide-react'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Modal from '../components/ui/Modal.jsx'
import IconTooltip from '../components/ui/IconTooltip.jsx'
import ProductThumb from '../components/product/ProductThumb.jsx'
import { useApp } from '../context/AppContext.jsx'
import { CATEGORIES, CONDITIONS, DEPARTMENTS, LOCATIONS } from '../data/mockData.js'
import { formatPrice, categoryName } from '../utils/format.js'
import { EASE_OUT, DURATION, buttonHover } from '../lib/motion.js'

export default function MyListings() {
  const { products, user, updateProduct, deleteProduct, markAsSold, showToast } = useApp()
  const safeUser = user ?? { id: 'guest', name: 'Guest' }
  const mine = products.filter((p) => p.sellerId === safeUser.id)

  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const inputClass = 'w-full border border-hairline rounded px-3 py-2 text-[13.5px] outline-none focus:border-ink transition-colors bg-surface'

  const saveEdit = (e) => {
    e.preventDefault()
    updateProduct(editing.id, editing)
    setEditing(null)
    showToast('Listing updated')
  }

  return (
    <div className="max-w-5xl mx-auto px-7 py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'My Listings' }]} />
      <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
        <h1 className="font-display font-bold text-2xl text-ink">My listings</h1>
        <motion.div {...buttonHover} className="inline-block">
          <Link to="/sell" className="flex items-center gap-2 bg-accent text-bg font-semibold text-[14px] px-4 py-2.5 rounded hover:bg-accent-deep transition-colors duration-200">
            <PlusCircle size={16} /> New listing
          </Link>
        </motion.div>
      </div>

      {mine.length === 0 ? (
        <EmptyState icon={List} title="You haven't listed anything yet" description="Create your first listing to see it here." />
      ) : (
        <div className="space-y-3">
          {mine.map((p) => (
            <motion.div
              key={p.id}
              layout
              animate={{ opacity: p.status === 'sold' ? 0.7 : 1 }}
              transition={{ duration: DURATION.sectionReveal, ease: EASE_OUT }}
              className="flex items-center gap-4 border border-hairline rounded p-3.5 bg-surface"
            >
              <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 relative">
                <ProductThumb icon={p.icon} tint={p.tint} image={p.images?.[0]} />
                <AnimatePresence>
                  {p.status === 'sold' && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: DURATION.hover, ease: EASE_OUT }}
                      className="absolute inset-0 bg-ink/50 flex items-center justify-center text-bg text-[10px] font-mono"
                    >
                      SOLD
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${p.id}`} className="font-display font-bold text-ink hover:text-accent-deep transition-colors duration-200 truncate block">
                  {p.name}
                </Link>
                <p className="text-[13px] text-ink/55">{categoryName(p.category, CATEGORIES)} &middot; {p.condition}</p>
                <p className="font-mono text-accent-deep text-[14px] mt-1">{formatPrice(p.price)}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <IconTooltip label={p.status === 'sold' ? 'Mark as active' : 'Mark as sold'} tone="accent">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ duration: DURATION.hover, ease: EASE_OUT }}
                    onClick={() => markAsSold(p.id)}
                    title={p.status === 'sold' ? 'Mark as active' : 'Mark as sold'}
                    aria-label={p.status === 'sold' ? 'Mark as active' : 'Mark as sold'}
                    className={`p-2 rounded transition-colors duration-200 ${p.status === 'sold' ? 'text-accent-deep' : 'text-ink/50 hover:text-ink'}`}
                  >
                    <CheckCircle2 size={18} />
                  </motion.button>
                </IconTooltip>
                <IconTooltip label="Edit listing" tone="ink">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ duration: DURATION.hover, ease: EASE_OUT }}
                    onClick={() => setEditing({ ...p })}
                    className="p-2 text-ink/50 hover:text-ink transition-colors duration-200"
                    title="Edit"
                    aria-label="Edit listing"
                  >
                    <Pencil size={17} />
                  </motion.button>
                </IconTooltip>
                <IconTooltip label="Delete listing" tone="danger">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ duration: DURATION.hover, ease: EASE_OUT }}
                    onClick={() => setDeleting(p)}
                    className="p-2 text-ink/50 hover:text-ink transition-colors duration-200"
                    title="Delete"
                    aria-label="Delete listing"
                  >
                    <Trash2 size={17} />
                  </motion.button>
                </IconTooltip>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit listing"
        footer={
          <>
            <button onClick={() => setEditing(null)} className="text-[13.5px] font-medium text-ink/60 px-4 py-2">Cancel</button>
            <button onClick={saveEdit} className="text-[13.5px] font-semibold bg-ink text-bg px-4 py-2 rounded">Save changes</button>
          </>
        }
      >
        {editing && (
          <form onSubmit={saveEdit} className="space-y-3.5">
            <input className={inputClass} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="Product name" />
            <div className="grid grid-cols-2 gap-3">
              <select className={inputClass} value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
              <select className={inputClass} value={editing.condition} onChange={(e) => setEditing({ ...editing, condition: e.target.value })}>
                {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <input type="number" className={inputClass} value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} placeholder="Price" />
            <textarea rows={3} className={inputClass} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Description" />
            <div className="grid grid-cols-2 gap-3">
              <select className={inputClass} value={editing.department} onChange={(e) => setEditing({ ...editing, department: e.target.value })}>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select className={inputClass} value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })}>
                {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Delete listing?"
        footer={
          <>
            <button onClick={() => setDeleting(null)} className="text-[13.5px] font-medium text-ink/60 px-4 py-2">Cancel</button>
            <button
              onClick={() => { deleteProduct(deleting.id); setDeleting(null); showToast('Listing deleted') }}
              className="text-[13.5px] font-semibold bg-ink text-bg px-4 py-2 rounded"
            >
              Delete
            </button>
          </>
        }
      >
        <p className="text-[14px] text-ink/75">
          This will permanently remove &ldquo;{deleting?.name}&rdquo; from your listings. This can&rsquo;t be undone.
        </p>
      </Modal>
    </div>
  )
}
