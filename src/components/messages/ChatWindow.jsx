import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { EASE_OUT, DURATION, messageBubble } from '../../lib/motion.js'

export default function ChatWindow({ conversation }) {
  const { sendMessage } = useApp()
  const [text, setText] = useState('')
  const endRef = useRef(null)

  // Only messages added after a conversation was opened should play the
  // slide-in entrance - the initial thread just appears as part of the
  // panel's own fade, per spec ("opening a conversation: fade in").
  const activeConvIdRef = useRef(null)
  const baselineCountRef = useRef(0)
  if (conversation && activeConvIdRef.current !== conversation.id) {
    activeConvIdRef.current = conversation.id
    baselineCountRef.current = conversation.messages.length
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' })
  }, [conversation?.messages?.length])

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-ink/50 text-sm">
        Select a conversation to view messages
      </div>
    )
  }

  const submit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    sendMessage(conversation.id, text.trim())
    setText('')
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={conversation.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.sectionReveal, ease: EASE_OUT }}
        className="flex-1 flex flex-col h-[70vh]"
      >
        <div className="px-5 py-3.5 border-b border-hairline">
          <p className="font-display font-bold text-ink">{conversation.withName}</p>
          <p className="text-[12.5px] text-ink/55">{conversation.productName}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {conversation.messages.length === 0 && (
            <p className="text-center text-ink/45 text-sm mt-8">No messages yet. Say hello!</p>
          )}
          {conversation.messages.map((m, i) => {
            const isNew = i >= baselineCountRef.current
            return (
              <motion.div
                key={m.id}
                initial={isNew ? messageBubble.initial : false}
                animate={messageBubble.animate}
                className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-lg text-[14px] ${
                    m.sender === 'me' ? 'bg-accent text-bg' : 'bg-bg border border-hairline text-ink'
                  }`}
                >
                  {m.text}
                  <div className={`text-[10.5px] mt-1 font-mono ${m.sender === 'me' ? 'text-bg/70' : 'text-ink/45'}`}>{m.time}</div>
                </div>
              </motion.div>
            )
          })}
          <div ref={endRef} />
        </div>

        <form onSubmit={submit} className="flex items-center gap-3 px-5 py-3.5 border-t border-hairline">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message"
            className="flex-1 border border-hairline rounded-full px-4 py-2.5 text-[14px] outline-none focus:border-ink transition-colors duration-200"
          />
          <motion.button
            type="submit"
            aria-label="Send message"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: DURATION.hover, ease: EASE_OUT }}
            className="w-10 h-10 rounded-full bg-accent text-bg flex items-center justify-center flex-shrink-0 hover:bg-accent-deep transition-colors duration-200"
          >
            <Send size={16} />
          </motion.button>
        </form>
      </motion.div>
    </AnimatePresence>
  )
}
