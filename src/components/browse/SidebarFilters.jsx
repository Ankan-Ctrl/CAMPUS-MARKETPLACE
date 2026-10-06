import React from 'react'
import { CATEGORIES, CONDITIONS, DEPARTMENTS, LOCATIONS } from '../../data/mockData.js'

const selectClass =
  'w-full border border-hairline rounded px-3 py-2 text-[13.5px] bg-surface text-ink focus:outline-none focus:border-ink transition-colors'

export default function SidebarFilters({ filters, setFilters, onReset }) {
  const set = (patch) => setFilters((f) => ({ ...f, ...patch }))

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-7">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-ink">Filters</h3>
        <button onClick={onReset} className="text-[12.5px] font-mono text-accent-deep hover:underline">
          Reset
        </button>
      </div>

      <div>
        <label className="block text-[12px] font-mono uppercase tracking-wide text-ink/55 mb-2">Price range</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => set({ priceMin: e.target.value })}
            className="w-full border border-hairline rounded px-2.5 py-2 text-[13.5px] focus:outline-none focus:border-ink"
          />
          <span className="text-ink/40">&ndash;</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => set({ priceMax: e.target.value })}
            className="w-full border border-hairline rounded px-2.5 py-2 text-[13.5px] focus:outline-none focus:border-ink"
          />
        </div>
      </div>

      <div>
        <label className="block text-[12px] font-mono uppercase tracking-wide text-ink/55 mb-2">Category</label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[13.5px] cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={filters.category === 'all'}
              onChange={() => set({ category: 'all' })}
              className="accent-accent"
            />
            All categories
          </label>
          {CATEGORIES.map((c) => (
            <label key={c.slug} className="flex items-center gap-2 text-[13.5px] cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === c.slug}
                onChange={() => set({ category: c.slug })}
                className="accent-accent"
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[12px] font-mono uppercase tracking-wide text-ink/55 mb-2">Condition</label>
        <select className={selectClass} value={filters.condition} onChange={(e) => set({ condition: e.target.value })}>
          <option value="all">Any condition</option>
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[12px] font-mono uppercase tracking-wide text-ink/55 mb-2">Department</label>
        <select className={selectClass} value={filters.department} onChange={(e) => set({ department: e.target.value })}>
          <option value="all">Any department</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[12px] font-mono uppercase tracking-wide text-ink/55 mb-2">Hostel / meeting location</label>
        <select className={selectClass} value={filters.location} onChange={(e) => set({ location: e.target.value })}>
          <option value="all">Any location</option>
          {LOCATIONS.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
    </aside>
  )
}
