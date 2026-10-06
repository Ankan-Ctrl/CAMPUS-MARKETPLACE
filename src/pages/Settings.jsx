import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import { useApp } from '../context/AppContext.jsx'
import { buttonHover } from '../lib/motion.js'

function Section({ title, children }) {
  return (
    <div className="border border-hairline rounded p-6 bg-surface">
      <h2 className="font-display font-bold text-[16px] text-ink mb-4">{title}</h2>
      {children}
    </div>
  )
}

const inputClass = 'w-full border border-hairline rounded px-3.5 py-2.5 text-[14px] outline-none focus:border-ink transition-colors bg-surface'

export default function Settings() {
  const { user, showToast } = useApp()
  const safeUser = user ?? { name: 'Guest', email: 'guest@example.com', department: 'No department', year: 'N/A' }
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' })
  const [privacy, setPrivacy] = useState({ showEmail: false, showDepartment: true, showOnBrowse: true })

  const changePassword = (e) => {
    e.preventDefault()
    if (!pw.current || !pw.next) return showToast('Fill in all password fields')
    if (pw.next !== pw.confirm) return showToast('New passwords do not match')
    setPw({ current: '', next: '', confirm: '' })
    showToast('Password updated')
  }

  const savePrivacy = () => showToast('Privacy settings saved')

  return (
    <div className="max-w-2xl mx-auto px-7 py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Settings' }]} />
      <h1 className="font-display font-bold text-2xl text-ink mb-7">Settings</h1>

      <div className="space-y-6">
        <Section title="Change password">
          <form onSubmit={changePassword} className="space-y-3.5">
            <input type="password" placeholder="Current password" className={inputClass} value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
            <input type="password" placeholder="New password" className={inputClass} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
            <input type="password" placeholder="Confirm new password" className={inputClass} value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
            <motion.button {...buttonHover} type="submit" className="bg-ink text-bg font-semibold text-[13.5px] px-5 py-2.5 rounded hover:bg-ink/85 transition-colors duration-200">
              Update password
            </motion.button>
          </form>
        </Section>

        <Section title="Privacy settings">
          <div className="space-y-3.5">
            {[
              { key: 'showEmail', label: 'Show my email to buyers I message' },
              { key: 'showDepartment', label: 'Show my department on my listings' },
              { key: 'showOnBrowse', label: 'Let my listings appear in campus-wide Browse' },
            ].map((opt) => (
              <label key={opt.key} className="flex items-center justify-between gap-4 cursor-pointer">
                <span className="text-[14px] text-ink/80">{opt.label}</span>
                <input
                  type="checkbox"
                  checked={privacy[opt.key]}
                  onChange={(e) => setPrivacy({ ...privacy, [opt.key]: e.target.checked })}
                  className="accent-accent w-4 h-4"
                />
              </label>
            ))}
            <motion.button {...buttonHover} onClick={savePrivacy} className="bg-ink text-bg font-semibold text-[13.5px] px-5 py-2.5 rounded hover:bg-ink/85 transition-colors duration-200 mt-1">
              Save privacy settings
            </motion.button>
          </div>
        </Section>

        <Section title="Account information">
          <div className="space-y-2 text-[14px]">
            <div className="flex justify-between border-b border-hairline pb-2.5">
              <span className="text-ink/55">Name</span>
              <span className="text-ink font-medium">{safeUser.name}</span>
            </div>
            <div className="flex justify-between border-b border-hairline pb-2.5 pt-2.5">
              <span className="text-ink/55">Email</span>
              <span className="text-ink font-medium">{safeUser.email}</span>
            </div>
            <div className="flex justify-between pt-2.5">
              <span className="text-ink/55">Department</span>
              <span className="text-ink font-medium">{safeUser.department} &middot; {safeUser.year}</span>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
