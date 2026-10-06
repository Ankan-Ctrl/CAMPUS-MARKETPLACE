import React from 'react'

export default function SellerCard({ product }) {
  const initials = product.sellerName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="border border-hairline rounded p-4 flex items-center gap-3.5">
      <div className="w-11 h-11 rounded-full bg-accent-soft flex items-center justify-center font-mono text-sm text-ink flex-shrink-0">
        {initials}
      </div>
      <div className="min-w-0">
        <p className="font-display font-bold text-ink truncate">{product.sellerName}</p>
        <p className="text-[13px] text-ink/60">{product.sellerDept} &middot; {product.sellerYear}</p>
      </div>
    </div>
  )
}
