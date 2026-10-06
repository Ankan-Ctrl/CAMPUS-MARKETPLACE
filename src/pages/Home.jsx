import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/home/Hero.jsx'
import CategoryCards from '../components/home/CategoryCards.jsx'
import CampusGallery from '../components/home/CampusGallery.jsx'
import ProductGrid from '../components/product/ProductGrid.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function Home() {
  const { products } = useApp()
  const recent = [...products]
    .filter((p) => p.status !== 'sold')
    .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
    .slice(0, 9)

  return (
    <div>
      <Hero />
      <CategoryCards />
      <CampusGallery />
      <section className="max-w-6xl mx-auto px-7 pb-20">
        <div className="flex items-center justify-between mb-7">
          <h2 className="font-display font-bold text-2xl text-ink">Recently added items</h2>
          <Link to="/browse" className="text-[13.5px] font-mono text-accent-deep hover:underline">
            View all &rarr;
          </Link>
        </div>
        <ProductGrid products={recent} />
      </section>
    </div>
  )
}
