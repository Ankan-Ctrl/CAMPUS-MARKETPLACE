import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ConversationList from '../components/messages/ConversationList.jsx'
import ChatWindow from '../components/messages/ChatWindow.jsx'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { MessageCircle } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

export default function Messages() {
  const { conversations } = useApp()
  const [params] = useSearchParams()
  const [activeId, setActiveId] = useState(params.get('c') || conversations[0]?.id || null)

  useEffect(() => {
    const c = params.get('c')
    if (c) setActiveId(c)
  }, [params])

  const active = conversations.find((c) => c.id === activeId)

  return (
    <div className="max-w-5xl mx-auto px-7 py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Messages' }]} />
      <h1 className="font-display font-bold text-2xl text-ink mb-7">Messages</h1>

      {conversations.length === 0 ? (
        <EmptyState icon={MessageCircle} title="No conversations yet" description="Message a seller from any product page to start chatting." />
      ) : (
        <div className="flex flex-col lg:flex-row border border-hairline rounded overflow-hidden bg-surface">
          <ConversationList conversations={conversations} activeId={activeId} onSelect={setActiveId} />
          <ChatWindow conversation={active} />
        </div>
      )}
    </div>
  )
}
