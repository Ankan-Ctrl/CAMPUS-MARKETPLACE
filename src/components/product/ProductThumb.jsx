import React from 'react'
import { getIcon } from '../../utils/icons.js'

export default function ProductThumb({ icon, tint, image, className = '' }) {
  if (image) {
    return <img src={image} alt="" className={`w-full h-full object-cover ${className}`} />
  }
  const Icon = getIcon(icon)
  return (
    <div
      className={`flex items-center justify-center w-full h-full ${className}`}
      style={{ background: `linear-gradient(160deg, ${tint}, #FBFBF5)` }}
    >
      <Icon size={56} strokeWidth={1.3} className="text-ink/70" />
    </div>
  )
}
