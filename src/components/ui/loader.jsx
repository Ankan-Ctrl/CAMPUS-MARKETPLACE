import React from 'react'
export function LoaderOne({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} role="status" aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-current loader-one-dot" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
      <style>{`
        @keyframes loaderOneBounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }
        .loader-one-dot { animation: loaderOneBounce 1s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .loader-one-dot { animation: none; opacity: 0.85; } }
      `}</style>
    </span>
  )
}
export default LoaderOne
