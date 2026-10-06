import React from 'react'
import { useApp } from '../../context/AppContext.jsx'

export default function Toast() {
  const { toast } = useApp()
  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] font-mono text-[13px] bg-ink text-bg px-4 py-3 rounded shadow-lg transition-all duration-300 pointer-events-none max-w-[85vw]
        ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      {toast}
    </div>
  )
}
