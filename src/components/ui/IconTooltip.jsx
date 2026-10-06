import React from 'react'
import './IconTooltip.css'

// Purely presentational: renders the hover label and the CSS "fill" hover effect
// around whatever button is passed in as `children`. It has no onClick and is not
// itself a <button> — the real button lives in `children`, so there is exactly
// one interactive element and one click handler per action.
export default function IconTooltip({ label, tone = 'ink', children }) {
  return (
    <span className="icon-tooltip-wrap" data-tone={tone}>
      <span className="icon-tooltip-bubble">{label}</span>
      <span className="icon-tooltip-btn">
        <span className="icon-tooltip-fill" />
        {children}
      </span>
    </span>
  )
}
