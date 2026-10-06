import React from 'react'

export default function ConversationList({ conversations, activeId, onSelect }) {
  return (
    <div className="w-full lg:w-72 flex-shrink-0 border-r border-hairline lg:h-[70vh] overflow-y-auto">
      {conversations.map((c) => {
        const last = c.messages[c.messages.length - 1]
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full text-left px-4 py-3.5 border-b border-hairline transition-colors ${
              activeId === c.id ? 'bg-accent-soft/25' : 'hover:bg-bg'
            }`}
          >
            <div className="flex justify-between items-baseline gap-2 mb-0.5">
              <span className="font-display font-bold text-[14.5px] text-ink truncate">{c.withName}</span>
              {last && <span className="text-[11px] font-mono text-ink/45 flex-shrink-0">{last.time}</span>}
            </div>
            <p className="text-[12.5px] text-ink/55 truncate mb-1">{c.productName}</p>
            {last && <p className="text-[13px] text-ink/70 truncate">{last.sender === 'me' ? 'You: ' : ''}{last.text}</p>}
          </button>
        )
      })}
    </div>
  )
}
