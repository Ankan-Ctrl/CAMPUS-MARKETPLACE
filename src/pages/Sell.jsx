import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UploadCloud, X } from 'lucide-react'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import Modal from '../components/ui/Modal.jsx'
import BubbleButton from '../components/ui/BubbleButton.jsx'
import { LoaderOne } from '../components/ui/loader.jsx'
import ProductCard from '../components/product/ProductCard.jsx'
import { useApp } from '../context/AppContext.jsx'
import { CATEGORIES, CONDITIONS, DEPARTMENTS, LOCATIONS, TINTS } from '../data/mockData.js'
import { buttonHover, iconHover } from '../lib/motion.js'

const emptyForm = {
  name: '', category: CATEGORIES[0].slug, condition: CONDITIONS[0], price: '',
  description: '', department: DEPARTMENTS[0], location: LOCATIONS[0],
}

export default function Sell() {
  const navigate = useNavigate()
  const { addProduct, showToast, user } = useApp()
  const safeUser = user ?? { id: 'guest', name: 'Guest', department: 'No department', year: 'N/A' }
  const [form, setForm] = useState(emptyForm)
  const [images, setImages] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [publishing, setPublishing] = useState(false)

  const set = (patch) => setForm((f) => ({ ...f, ...patch }))

  const onFiles = (e) => {
    const files = Array.from(e.target.files || [])
    const urls = files.map((f) => URL.createObjectURL(f))
    setImages((prev) => [...prev, ...urls].slice(0, 6))
  }
  const removeImage = (i) => setImages((prev) => prev.filter((_, idx) => idx !== i))

  const categoryMeta = CATEGORIES.find((c) => c.slug === form.category) || CATEGORIES[0]

  const previewProduct = {
    id: 'preview', name: form.name || 'Your item name', price: Number(form.price) || 0,
    category: form.category, condition: form.condition, department: form.department,
    location: form.location, sellerId: safeUser.id, sellerName: safeUser.name, sellerDept: safeUser.department, sellerYear: safeUser.year,
    postedAt: new Date().toISOString(), status: 'active', description: form.description,
    icon: categoryMeta.icon, tint: TINTS[0], images,
  }

  const publish = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.price) {
      showToast('Add at least an item name and price')
      return
    }
    setPublishing(true)
    setTimeout(() => {
      addProduct({
        name: form.name.trim(), price: Number(form.price), category: form.category, condition: form.condition,
        description: form.description.trim() || 'No description provided.', department: form.department,
        location: form.location, sellerId: safeUser.id, sellerName: safeUser.name, sellerDept: safeUser.department, sellerYear: safeUser.year,
        icon: categoryMeta.icon, tint: TINTS[Math.floor(Math.random() * TINTS.length)], images,
      })
      showToast('Listing published')
      navigate('/my-listings')
    }, 700)
  }

  const inputClass = 'w-full border border-hairline rounded px-3.5 py-2.5 text-[14px] outline-none focus:border-ink transition-colors bg-surface'

  return (
    <div className="max-w-3xl mx-auto px-7 py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Sell Item' }]} />
      <h1 className="font-display font-bold text-2xl text-ink mb-7">Sell an item</h1>

      <form onSubmit={publish} className="space-y-6">
        <div>
          <label className="block text-[12.5px] font-mono uppercase tracking-wide text-ink/55 mb-2">Upload images</label>
          <div className="flex flex-wrap gap-3">
            {images.map((src, i) => (
              <div key={i} className="relative w-24 h-24 rounded overflow-hidden border border-hairline">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <motion.button
                  {...iconHover}
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-ink/70 text-bg rounded-full p-0.5"
                  aria-label="Remove image"
                >
                  <X size={12} />
                </motion.button>
              </div>
            ))}
            {images.length < 6 && (
              <label className="w-24 h-24 rounded border border-dashed border-hairline flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-ink transition-colors text-ink/55">
                <UploadCloud size={20} />
                <span className="text-[11px] font-mono">Add photo</span>
                <input type="file" accept="image/*" multiple onChange={onFiles} className="hidden" />
              </label>
            )}
          </div>
        </div>

        <div>
          <label className="block text-[12.5px] font-mono uppercase tracking-wide text-ink/55 mb-2">Product name</label>
          <input className={inputClass} value={form.name} onChange={(e) => set({ name: e.target.value })} placeholder="e.g. Casio FX-991ES Calculator" required />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[12.5px] font-mono uppercase tracking-wide text-ink/55 mb-2">Category</label>
            <select className={inputClass} value={form.category} onChange={(e) => set({ category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[12.5px] font-mono uppercase tracking-wide text-ink/55 mb-2">Condition</label>
            <select className={inputClass} value={form.condition} onChange={(e) => set({ condition: e.target.value })}>
              {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[12.5px] font-mono uppercase tracking-wide text-ink/55 mb-2">Price (&#8377;)</label>
          <input type="number" min="0" className={inputClass} value={form.price} onChange={(e) => set({ price: e.target.value })} placeholder="0" required />
        </div>

        <div>
          <label className="block text-[12.5px] font-mono uppercase tracking-wide text-ink/55 mb-2">Description</label>
          <textarea rows={4} className={inputClass} value={form.description} onChange={(e) => set({ description: e.target.value })} placeholder="Condition details, reason for selling, anything a buyer should know" />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[12.5px] font-mono uppercase tracking-wide text-ink/55 mb-2">Department</label>
            <select className={inputClass} value={form.department} onChange={(e) => set({ department: e.target.value })}>
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[12.5px] font-mono uppercase tracking-wide text-ink/55 mb-2">Meeting location</label>
            <select className={inputClass} value={form.location} onChange={(e) => set({ location: e.target.value })}>
              {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <motion.button {...buttonHover} type="button" onClick={() => setPreviewOpen(true)} className="border border-ink text-ink font-medium text-[14px] px-5 py-3 rounded hover:bg-ink hover:text-bg transition-colors duration-200">
            Preview
          </motion.button>
          <BubbleButton type="submit" disabled={publishing} className="disabled:opacity-70">
            {publishing ? <span className="flex items-center gap-2"><LoaderOne /> Publishing&hellip;</span> : 'Publish Listing'}
          </BubbleButton>
        </div>
      </form>

      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} title="Listing preview">
        <div className="max-w-xs">
          <ProductCard product={previewProduct} />
        </div>
      </Modal>
    </div>
  )
}
