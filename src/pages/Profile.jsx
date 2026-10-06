import React, { useState } from 'react'
import Breadcrumb from '../components/layout/Breadcrumb.jsx'
import Modal from '../components/ui/Modal.jsx'
import ProfileCard from '../components/profile/ProfileCard.jsx'
import { useApp } from '../context/AppContext.jsx'
import { DEPARTMENTS } from '../data/mockData.js'

export default function Profile() {
  const { user, products, purchases, showToast, updateUser } = useApp()
  const safeUser = user ?? { id: 'guest', name: 'Guest', email: 'guest@example.com', department: 'No department', year: 'N/A' }
  const [editOpen, setEditOpen] = useState(false)
  const [form, setForm] = useState(safeUser)

  const itemsListed = products.filter((p) => p.sellerId === safeUser.id).length
  const itemsSold = products.filter((p) => p.sellerId === safeUser.id && p.status === 'sold').length

  const save = (e) => {
    e.preventDefault()
    updateUser(form)
    setEditOpen(false)
    showToast('Profile updated')
  }

  const inputClass = 'w-full border border-hairline rounded px-3 py-2 text-[13.5px] outline-none focus:border-ink transition-colors bg-surface'

  return (
    <div className="max-w-3xl mx-auto px-7 py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'My Profile' }]} />
      <h1 className="font-display font-bold text-2xl text-ink mb-7">My profile</h1>

      <ProfileCard
        user={safeUser}
        itemsListed={itemsListed}
        itemsSold={itemsSold}
        purchaseCount={purchases.length}
        onEdit={() => { setForm(safeUser); setEditOpen(true) }}
      />

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit profile"
        footer={
          <>
            <button onClick={() => setEditOpen(false)} className="text-[13.5px] font-medium text-ink/60 px-4 py-2">Cancel</button>
            <button onClick={save} className="text-[13.5px] font-semibold bg-ink text-bg px-4 py-2 rounded">Save changes</button>
          </>
        }
      >
        <form onSubmit={save} className="space-y-3.5">
          <div>
            <label className="block text-[12px] font-mono uppercase tracking-wide text-ink/55 mb-1.5">Name</label>
            <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-[12px] font-mono uppercase tracking-wide text-ink/55 mb-1.5">Email</label>
            <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-mono uppercase tracking-wide text-ink/55 mb-1.5">Department</label>
              <select className={inputClass} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-mono uppercase tracking-wide text-ink/55 mb-1.5">Year</label>
              <select className={inputClass} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}>
                {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
