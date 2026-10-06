import React from 'react'

export function ProductCardSkeleton() {
  return (
    <div className="break-inside-avoid mb-6 bg-surface border border-hairline rounded overflow-hidden animate-pulse">
      <div className="aspect-square bg-hairline/40" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-hairline/50 rounded w-3/4" />
        <div className="h-3 bg-hairline/40 rounded w-1/2" />
        <div className="h-3 bg-hairline/40 rounded w-1/3" />
        <div className="h-9 bg-hairline/40 rounded mt-2" />
      </div>
    </div>
  )
}

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
