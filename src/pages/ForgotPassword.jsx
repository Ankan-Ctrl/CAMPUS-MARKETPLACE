import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AuthLayout from '../components/layout/AuthLayout.jsx'
import { buttonHover } from '../lib/motion.js'

const inputClass = 'w-full border border-hairline rounded px-3.5 py-2.5 text-[14px] outline-none focus:border-ink transition-colors bg-surface'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <AuthLayout title="Reset your password" subtitle="We'll send a reset link to your campus email.">
      {sent ? (
        <p className="text-[14px] text-ink/75">
          If an account exists for <span className="font-medium text-ink">{email}</span>, a reset link is on its way.
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-3.5">
          <input type="email" required placeholder="you@campusmail.edu" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
          <motion.button {...buttonHover} type="submit" className="w-full bg-accent text-bg font-semibold text-[14px] py-2.5 rounded hover:bg-accent-deep transition-colors duration-200">
            Send reset link
          </motion.button>
        </form>
      )}
      <p className="text-center text-[13.5px] text-ink/60 mt-5">
        <Link to="/login" className="text-accent-deep font-medium hover:underline">Back to login</Link>
      </p>
    </AuthLayout>
  )
}
