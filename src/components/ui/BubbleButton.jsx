import React from 'react'
import './BubbleButton.css'
export default function BubbleButton({ children, className = '', ...rest }) {
  return (
    <button className={`bubble-btn px-6 py-3 text-[14px] ${className}`} {...rest}>
      <span className="bubble-dot" /><span className="bubble-dot" /><span className="bubble-dot" /><span className="bubble-dot" /><span className="bubble-dot" />
      <span className="bubble-content">{children}</span>
    </button>
  )
}
