import React from 'react'
import { Link } from 'react-router-dom'
import { Sprout } from 'lucide-react'

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6 py-12">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2 font-display font-extrabold text-lg text-ink mb-8">
          <Sprout size={22} className="text-accent" />
          Campus Marketplace
        </Link>
        <div className="bg-surface border border-hairline rounded p-7">
          <h1 className="font-display font-bold text-xl text-ink mb-1.5">{title}</h1>
          {subtitle && <p className="text-ink/60 text-[13.5px] mb-6">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  )
}
