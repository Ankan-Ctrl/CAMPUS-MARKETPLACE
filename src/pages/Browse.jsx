import React, { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SidebarFilters from '../components/browse/SidebarFilters.jsx'
import ProductGrid from '../components/product/ProductGrid.jsx'
import LoadingSkeleton from '../components/ui/LoadingSkeleton.jsx'
import Pagination from '../components/ui/Pagination.jsx'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import { useApp } from '../context/AppContext.jsx'
import { DURATION } from '../lib/motion.js'

const PAGE_SIZE = 6

export default function Browse() {
  const { products } = useApp()
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''

  const [filters, setFilters] = useState({
    category: params.get('category') || 'all',
    condition: params.get('condition') || 'all',
    department: 'all',
    location: 'all',
    priceMin: '',
    priceMax: '',
  })
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)

  // keep category/condition in sync if the navbar quick-filters change the URL
  useEffect(() => {
    setFilters((f) => ({
      ...f,
      category: params.get('category') || 'all',
      condition: params.get('condition') || 'all',
    }))
  }, [params])

  const setFiltersAndUrl = (updater) => {
    setFilters((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      const nextParams = new URLSearchParams(params)
      if (next.category === 'all') nextParams.delete('category')
      else nextParams.set('category', next.category)
      if (next.condition === 'all') nextParams.delete('condition')
      else nextParams.set('condition', next.condition)
      setParams(nextParams)
      return next
    })
    setPage(1)
  }

  const resetFilters = () => {
    setFiltersAndUrl({ category: 'all', condition: 'all', department: 'all', location: 'all', priceMin: '', priceMax: '' })
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.status !== 'sold')
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
    if (filters.category !== 'all') list = list.filter((p) => p.category === filters.category)
    if (filters.condition !== 'all') list = list.filter((p) => p.condition === filters.condition)
    if (filters.department !== 'all') list = list.filter((p) => p.department === filters.department)
    if (filters.location !== 'all') list = list.filter((p) => p.location === filters.location)
    if (filters.priceMin) list = list.filter((p) => p.price >= Number(filters.priceMin))
    if (filters.priceMax) list = list.filter((p) => p.price <= Number(filters.priceMax))

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    else list = [...list].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))

    return list
  }, [products, q, filters, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // Stands in for real network latency once results come from an API instead of local mock data.
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(t)
  }, [q, filters, sort, page])

  return (
    <div className="max-w-6xl mx-auto px-7 py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Browse' }]} />
      <div className="flex flex-col lg:flex-row gap-10">
        <SidebarFilters filters={filters} setFilters={setFiltersAndUrl} onReset={resetFilters} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <p className="text-ink/60 text-[14px]">
              {q && <>Results for &ldquo;{q}&rdquo; &middot; </>}
              {filtered.length} item{filtered.length !== 1 ? 's' : ''}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-hairline rounded px-3 py-2 text-[13px] font-mono outline-none focus:border-ink"
            >
              <option value="newest">Newest first</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.hover }}
              >
                <LoadingSkeleton count={PAGE_SIZE} />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.hover }}
              >
                <ProductGrid
                  products={pageItems}
                  emptyTitle="No items match your filters"
                  emptyDescription="Try widening your search or clearing a filter."
                />
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
