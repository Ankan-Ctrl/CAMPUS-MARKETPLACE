import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function SearchBar({ className = '' }) {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [value, setValue] = useState(params.get('q') || '')

  const submit = (e) => {
    e.preventDefault()
    navigate(value ? `/browse?q=${encodeURIComponent(value)}` : '/browse')
  }

  return (
    <form onSubmit={submit} className={`flex items-center gap-2 border-b border-current/40 pb-1.5 transition-colors duration-200 focus-within:border-ink ${className}`}>
      <Search size={15} className="flex-shrink-0 opacity-70" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search items by name"
        className="bg-transparent outline-none text-[13px] font-mono w-full placeholder:opacity-60"
      />
    </form>
  )
}
