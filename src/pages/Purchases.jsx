import React from 'react'
import { ShoppingBag } from 'lucide-react'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function Purchases() {
  const { purchases } = useApp()

  return (
    <div className="max-w-4xl mx-auto px-7 py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Purchases' }]} />
      <h1 className="font-display font-bold text-2xl text-ink mb-7">Purchase history</h1>

      {purchases.length === 0 ? (
        <EmptyState icon={ShoppingBag} title="No purchases yet" description="Items you buy from other students will show up here." />
      ) : (
        <div className="border border-hairline rounded overflow-hidden bg-surface">
          <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[2fr_1fr_1fr_1fr] gap-3 px-5 py-3 border-b border-hairline text-[11.5px] font-mono uppercase tracking-wide text-ink/50">
            <span>Product</span>
            <span className="hidden sm:block">Seller</span>
            <span>Status</span>
            <span className="text-right">Date</span>
          </div>
          {purchases.map((pu) => (
            <div key={pu.id} className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[2fr_1fr_1fr_1fr] gap-3 px-5 py-4 border-b border-hairline last:border-0 items-center">
              <span className="font-medium text-ink truncate">{pu.productName}</span>
              <span className="hidden sm:block text-ink/65 text-[13.5px]">{pu.sellerName}</span>
              <span
                className={`text-[12px] font-mono px-2.5 py-1 rounded w-fit ${
                  pu.status === 'Completed' ? 'bg-accent-soft/40 text-accent-deep' : 'bg-bg border border-hairline text-ink/60'
                }`}
              >
                {pu.status}
              </span>
              <span className="text-right text-ink/55 text-[13px] font-mono">
                {new Date(pu.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
