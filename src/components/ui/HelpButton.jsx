import React, { useState } from 'react'
import { LifeBuoy, MessageCircleQuestion } from 'lucide-react'
import Modal from './Modal.jsx'
import './HelpButton.css'
export default function HelpButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="help-fab">
        <div className="help-fab-inner">
          <div className="help-fab-tooltip">
            <div className="help-fab-tooltip-body"><MessageCircleQuestion size={16} /><span>Need help?</span></div>
            <div className="help-fab-tooltip-arrow" />
          </div>
          <button onClick={() => setOpen(true)} className="help-fab-btn" aria-label="Get help">
            <LifeBuoy size={20} /><span className="help-fab-btn-label">Get help</span>
          </button>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Need a hand?">
        <div className="space-y-3 text-[14px] text-ink/80">
          <p>Common things people ask about:</p>
          <ul className="space-y-1.5 list-disc list-inside text-ink/70">
            <li>Meeting a seller safely on campus</li>
            <li>Editing or removing a listing</li>
            <li>Reporting a suspicious listing</li>
          </ul>
          <p className="pt-2 font-mono text-[13px] text-ink/60">hello@campusmarketplace.edu</p>
        </div>
      </Modal>
    </>
  )
}
