import React from 'react'
import { Link } from 'react-router-dom'
import ProductThumb from './ProductThumb.jsx'
import WishlistButton from './WishlistButton.jsx'
import { CardContainer, CardBody, CardItem } from '../ui/3d-card.jsx'
import { CATEGORIES } from '../../data/mockData.js'
import { timeAgo, formatPrice, categoryName } from '../../utils/format.js'

export default function ProductCard({ product, tall = false }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block break-inside-avoid mb-6 bg-surface border border-hairline rounded overflow-hidden transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_-18px_rgba(32,48,28,0.35)]"
    >
      <CardContainer className="w-full py-0" containerClassName="w-full py-0">
        <CardBody className="w-full h-full">
          <CardItem
            translateZ={40}
            className={`relative overflow-hidden w-full ${tall ? 'aspect-[3/4]' : 'aspect-square'}`}
          >
            <div className="absolute inset-0 transition-transform duration-200 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]">
              <ProductThumb icon={product.icon} tint={product.tint} image={product.images?.[0]} />
            </div>
            {product.status === 'sold' && (
              <span className="absolute top-3 left-3 bg-ink text-bg text-[11px] font-mono px-2 py-1 rounded">
                SOLD
              </span>
            )}
            <WishlistButton
              productId={product.id}
              className="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm p-2 shadow-sm"
            />
          </CardItem>
          <div className="p-4">
            <div className="flex justify-between items-start gap-2 mb-1">
              <CardItem as="h3" translateZ={25} className="font-display font-bold text-[15px] leading-snug text-ink">
                {product.name}
              </CardItem>
            </div>
            <CardItem as="p" translateZ={20} className="font-mono text-accent-deep text-[15px] mb-2">
              {formatPrice(product.price)}
            </CardItem>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg border border-hairline text-ink/70">
                {categoryName(product.category, CATEGORIES)}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg border border-hairline text-ink/70">
                {product.condition}
              </span>
            </div>
            <div className="flex items-center justify-between text-[12.5px] text-ink/55">
              <span>{product.sellerName} &middot; {product.department}</span>
              <span>{timeAgo(product.postedAt)}</span>
            </div>
          </div>
        </CardBody>
      </CardContainer>
    </Link>
  )
}
