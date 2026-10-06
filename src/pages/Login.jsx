import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AuthLayout from '../components/layout/AuthLayout.jsx'
import { buttonHover } from '../lib/motion.js'
import { useApp } from '../context/AppContext.jsx'

const inputClass = 'w-full border border-hairline rounded px-3.5 py-2.5 text-[14px] outline-none focus:border-ink transition-colors bg-surface'

export default function Login() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e) => {
    e.preventDefault()

    try {
      await login(email, password)
      navigate('/')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <AuthLayout title="Log in" subtitle="Use your campus email to continue.">
      <form onSubmit={submit} className="space-y-3.5">
        <input type="email" required placeholder="you@campusmail.edu" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" required placeholder="Password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-[12.5px] font-mono text-accent-deep hover:underline">Forgot password?</Link>
        </div>
        <motion.button {...buttonHover} type="submit" className="w-full bg-accent text-bg font-semibold text-[14px] py-2.5 rounded hover:bg-accent-deep transition-colors duration-200">
          Log in
        </motion.button>
      </form>
      <p className="text-center text-[13.5px] text-ink/60 mt-5">
        New here? <Link to="/register" className="text-accent-deep font-medium hover:underline">Create an account</Link>
      </p>
    </AuthLayout>
  )
}
