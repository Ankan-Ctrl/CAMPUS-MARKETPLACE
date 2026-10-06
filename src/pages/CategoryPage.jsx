import React from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid.jsx'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import { useApp } from '../context/AppContext.jsx'
import { CATEGORIES } from '../data/mockData.js'

export default function CategoryPage() {
  const { category } = useParams()
  const { products } = useApp()
  const meta = CATEGORIES.find((c) => c.slug === category)
  const items = products.filter((p) => p.category === category && p.status !== 'sold')

  return (
    <div className="max-w-6xl mx-auto px-7 py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Browse', to: '/browse' }, { label: meta?.name || category }]} />
      <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
        <h1 className="font-display font-bold text-2xl text-ink">{meta?.name || category}</h1>
        <Link to="/browse" className="text-[13.5px] font-mono text-accent-deep hover:underline">
          All filters &rarr;
        </Link>
      </div>
      <ProductGrid
        products={items}
        emptyTitle="Nothing listed here yet"
        emptyDescription="Check back soon, or browse other categories."
      />
    </div>
  )
}
