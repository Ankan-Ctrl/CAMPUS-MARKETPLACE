import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, Share2, Flag, MapPin, Calendar } from 'lucide-react'
import ImageGallery from '../components/product/ImageGallery.jsx'
import Carousel from '../components/ui/Carousel.jsx'
import WishlistButton from '../components/product/WishlistButton.jsx'
import SellerCard from '../components/product/SellerCard.jsx'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import Modal from '../components/ui/Modal.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useApp } from '../context/AppContext.jsx'
import { CATEGORIES } from '../data/mockData.js'
import { formatPrice, categoryName } from '../utils/format.js'
import { EASE_OUT, DURATION, buttonHover } from '../lib/motion.js'

const REPORT_REASONS = ['Prohibited item', 'Misleading description', 'Suspected scam', 'Duplicate listing', 'Other']

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, startConversationForProduct, showToast, isWishlisted } = useApp()
  const [reportOpen, setReportOpen] = useState(false)
  const [reportReason, setReportReason] = useState(REPORT_REASONS[0])

  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-7 py-16">
        <EmptyState title="Listing not found" description="This item may have been removed by the seller." />
      </div>
    )
  }

  const chatSeller = () => {
    const convoId = startConversationForProduct(product)
    navigate(`/messages?c=${convoId}`)
  }

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/product/${product.id}`
    try {
      await navigator.clipboard.writeText(url)
      showToast('Link copied to clipboard')
    } catch {
      showToast('Could not copy link')
    }
  }

  const submitReport = (e) => {
    e.preventDefault()
    setReportOpen(false)
    showToast('Listing reported \u2014 our team will take a look')
  }

  return (
    <div className="max-w-6xl mx-auto px-7 py-10">
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Browse', to: '/browse' },
          { label: categoryName(product.category, CATEGORIES), to: `/category/${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION.sectionReveal, ease: EASE_OUT }}
        >
          {product.images && product.images.length > 1
            ? <Carousel images={product.images} baseWidth={520} autoplay={false} loop />
            : <ImageGallery product={product} />}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.sectionReveal, ease: EASE_OUT }}
        >
          <div className="flex items-start justify-between gap-3 mb-1">
            <h1 className="font-display font-bold text-2xl text-ink">{product.name}</h1>
            <WishlistButton productId={product.id} size={22} className="mt-1 flex-shrink-0" />
          </div>
          <p className="font-mono text-2xl text-accent-deep mb-4">{formatPrice(product.price)}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-[12px] font-mono px-2.5 py-1 rounded bg-surface border border-hairline text-ink/70">
              {categoryName(product.category, CATEGORIES)}
            </span>
            <span className="text-[12px] font-mono px-2.5 py-1 rounded bg-surface border border-hairline text-ink/70">
              {product.condition}
            </span>
            {product.status === 'sold' && (
              <span className="text-[12px] font-mono px-2.5 py-1 rounded bg-ink text-bg">SOLD</span>
            )}
          </div>

          <p className="text-ink/80 leading-relaxed mb-6">{product.description}</p>

          <div className="space-y-2 mb-6 text-[14px] text-ink/75">
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-ink/45" /> Meet at: {product.location}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-ink/45" /> Posted {new Date(product.postedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-[12px] font-mono uppercase tracking-wide text-ink/55 mb-2">Seller</p>
            <SellerCard product={product} />
          </div>

          <div className="flex flex-wrap gap-3">
            <motion.button
              {...buttonHover}
              onClick={chatSeller}
              className="flex items-center gap-2 bg-accent text-bg font-semibold text-[14px] px-5 py-3 rounded hover:bg-accent-deep transition-colors duration-200"
            >
              <MessageCircle size={16} /> Chat Seller
            </motion.button>
            <motion.button
              {...buttonHover}
              onClick={share}
              className="flex items-center gap-2 border border-hairline text-ink font-medium text-[14px] px-5 py-3 rounded hover:border-ink transition-colors duration-200"
            >
              <Share2 size={16} /> Share
            </motion.button>
            <motion.button
              {...buttonHover}
              onClick={() => setReportOpen(true)}
              className="flex items-center gap-2 text-ink/55 font-medium text-[14px] px-5 py-3 rounded hover:text-ink transition-colors duration-200"
            >
              <Flag size={16} /> Report Listing
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Modal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        title="Report this listing"
        footer={
          <>
            <button onClick={() => setReportOpen(false)} className="text-[13.5px] font-medium text-ink/60 px-4 py-2">
              Cancel
            </button>
            <button onClick={submitReport} className="text-[13.5px] font-semibold bg-ink text-bg px-4 py-2 rounded">
              Submit report
            </button>
          </>
        }
      >
        <form onSubmit={submitReport} className="space-y-2">
          {REPORT_REASONS.map((r) => (
            <label key={r} className="flex items-center gap-2.5 text-[13.5px] cursor-pointer">
              <input
                type="radio"
                name="reason"
                checked={reportReason === r}
                onChange={() => setReportReason(r)}
                className="accent-accent"
              />
              {r}
            </label>
          ))}
        </form>
      </Modal>
    </div>
  )
}
