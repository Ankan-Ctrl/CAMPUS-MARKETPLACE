import React from 'react'
import { Link } from 'react-router-dom'
import ParallaxScroll from '../ui/parallax-scroll.jsx'
import ProductThumb from '../product/ProductThumb.jsx'
import { useApp } from '../../context/AppContext.jsx'

export default function CampusGallery() {
  const { products } = useApp()
  const items = products.slice(0, 15)
  const tiles = items.map((p) => (
    <Link key={p.id} to={`/product/${p.id}`} className="block rounded-lg overflow-hidden border border-hairline h-40 md:h-48 hover:border-ink transition-colors duration-200">
      <ProductThumb icon={p.icon} tint={p.tint} image={p.images?.[0]} />
    </Link>
  ))
  return (
    <section className="max-w-6xl mx-auto px-7 pb-20">
      <h2 className="font-display font-bold text-2xl text-ink mb-2">A closer look</h2>
      <p className="text-ink/60 text-[14px] mb-7">Scroll through what&rsquo;s on campus right now.</p>
      <ParallaxScroll items={tiles} />
    </section>
  )
}
