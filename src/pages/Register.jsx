import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AuthLayout from '../components/layout/AuthLayout.jsx'
import { buttonHover } from '../lib/motion.js'
import { useApp } from '../context/AppContext.jsx'
import { DEPARTMENTS } from '../data/mockData.js'

const inputClass = 'w-full border border-hairline rounded px-3.5 py-2.5 text-[14px] outline-none focus:border-ink transition-colors bg-surface'

export default function Register() {
  const { register } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', department: DEPARTMENTS[0], password: '' })

const submit = async (e) => {
  e.preventDefault()

  try {
    await register(
      form.name,
      form.email,
      form.department,
      form.password
    )

    navigate('/')
  } catch (error) {
    alert(error.message)
  }
}
  return (
    <AuthLayout title="Create an account" subtitle="Only students with a campus email can list items.">
      <form onSubmit={submit} className="space-y-3.5">
        <input required placeholder="Full name" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" required placeholder="you@campusmail.edu" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <select className={inputClass} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
          {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <input type="password" required placeholder="Password" className={inputClass} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <motion.button {...buttonHover} type="submit" className="w-full bg-accent text-bg font-semibold text-[14px] py-2.5 rounded hover:bg-accent-deep transition-colors duration-200">
          Create account
        </motion.button>
      </form>
      <p className="text-center text-[13.5px] text-ink/60 mt-5">
        Already have an account? <Link to="/login" className="text-accent-deep font-medium hover:underline">Log in</Link>
      </p>
    </AuthLayout>
  )
}
