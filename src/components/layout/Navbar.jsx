import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sprout, Heart, MessageCircle, List, User, Menu, X, ChevronDown, LogOut, Settings, ShoppingBag } from 'lucide-react'
import SearchBar from '../browse/SearchBar.jsx'
import { CATEGORIES, CONDITIONS } from '../../data/mockData.js'
import { useApp } from '../../context/AppContext.jsx'
import { useMagnetic } from '../../hooks/useMagnetic.js'
import { EASE_OUT, EASE_IN_OUT, DURATION } from '../../lib/motion.js'

// Its own component so useMagnetic (a hook) gets one instance per link,
// rather than being called inside a .map() in the parent.
function NavItem({ to, end, label }) {
  const ref = useMagnetic({ strength: 6 })
  return (
    <NavLink ref={ref} to={to} end={end} className="relative inline-block py-1">
      {({ isActive }) => (
        <>
          <span
            className={`text-[14px] font-medium transition-colors duration-200 ${
              isActive ? 'text-accent-deep' : 'text-ink/75 hover:text-ink'
            }`}
          >
            {label}
          </span>
          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute left-0 right-0 -bottom-1 h-[1.5px] bg-accent-deep"
              transition={{ duration: 0.3, ease: EASE_OUT }}
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Navbar() {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const profileRef = useRef(null)
  const profileBtnRef = useMagnetic({ strength: 6, hoverScale: 1.04 })
  const menuBtnRef = useMagnetic({ strength: 6 })

  useEffect(() => {
    function onClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const applyQuickFilter = (key, value) => {
    const next = new URLSearchParams(params)
    if (value === 'all') next.delete(key)
    else next.set(key, value)
    navigate(`/browse?${next.toString()}`)
  }

  const safeUser = user ?? { name: 'Guest' }
  const initials = safeUser.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'G'

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/browse', label: 'Browse' },
    { to: '/sell', label: 'Sell Item' },
    { to: '/wishlist', label: 'Wishlist' },
    { to: '/messages', label: 'Messages' },
    { to: '/my-listings', label: 'My Listings' },
  ]

  return (
    <motion.nav
      className="sticky top-0 z-40"
      style={{ borderBottomWidth: 1, borderBottomStyle: 'solid' }}
      animate={scrolled ? 'scrolled' : 'top'}
      variants={{
        top: {
          backgroundColor: 'rgba(247,246,238,0)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(220,220,200,0)',
          boxShadow: '0 8px 24px rgba(32,48,28,0)',
        },
        scrolled: {
          backgroundColor: 'rgba(247,246,238,0.88)',
          backdropFilter: 'blur(14px)',
          borderColor: 'rgba(220,220,200,1)',
          boxShadow: '0 8px 24px rgba(32,48,28,0.06)',
        },
      }}
      transition={{ duration: 0.3, ease: EASE_IN_OUT }}
    >
      <div className="max-w-6xl mx-auto px-5 lg:px-7">
        <div className="flex items-center gap-6 h-16">
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-extrabold text-lg text-ink flex-shrink-0 transition-opacity duration-200 hover:opacity-80"
          >
            <Sprout size={22} className="text-accent" />
            Campus Marketplace
          </Link>

          <div className="hidden lg:flex items-center gap-6 flex-1">
            {links.map((l) => (
              <NavItem key={l.to} to={l.to} end={!!l.end} label={l.label} />
            ))}
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="relative" ref={profileRef}>
              <button
                ref={profileBtnRef}
                onClick={() => setProfileOpen((o) => !o)}
                className="flex items-center gap-1.5 w-9 h-9 rounded-full bg-accent-soft justify-center font-mono text-[12px] text-ink"
                aria-label="Profile menu"
              >
                {initials}
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: DURATION.modal, ease: EASE_OUT }}
                    style={{ transformOrigin: 'top right' }}
                    className="absolute right-0 mt-2 w-52 bg-surface border border-hairline rounded shadow-lg py-1.5"
                  >
                    <Link onClick={() => setProfileOpen(false)} to="/profile" className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] hover:bg-bg transition-colors duration-200">
                      <User size={15} /> My Profile
                    </Link>
                    <Link onClick={() => setProfileOpen(false)} to="/my-listings" className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] hover:bg-bg transition-colors duration-200">
                      <List size={15} /> My Listings
                    </Link>
                    <Link onClick={() => setProfileOpen(false)} to="/purchases" className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] hover:bg-bg transition-colors duration-200">
                      <ShoppingBag size={15} /> Purchases
                    </Link>
                    <Link onClick={() => setProfileOpen(false)} to="/settings" className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] hover:bg-bg transition-colors duration-200">
                      <Settings size={15} /> Settings
                    </Link>
                    <div className="border-t border-hairline my-1.5" />
                    <button
                      onClick={() => { setProfileOpen(false); logout(); navigate('/login') }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] hover:bg-bg transition-colors duration-200 text-left"
                    >
                      <LogOut size={15} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button ref={menuBtnRef} className="lg:hidden text-ink" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-5 h-12 border-t border-hairline/70">
          <SearchBar className="flex-1 max-w-sm" />
          <div className="flex items-center gap-1.5 text-ink/70">
            <ChevronDown size={13} />
            <select
              defaultValue={params.get('category') || 'all'}
              onChange={(e) => applyQuickFilter('category', e.target.value)}
              className="bg-transparent text-[13px] font-mono outline-none cursor-pointer"
              aria-label="Filter by category"
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1.5 text-ink/70">
            <ChevronDown size={13} />
            <select
              defaultValue={params.get('condition') || 'all'}
              onChange={(e) => applyQuickFilter('condition', e.target.value)}
              className="bg-transparent text-[13px] font-mono outline-none cursor-pointer"
              aria-label="Filter by condition"
            >
              <option value="all">Any condition</option>
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DURATION.modal, ease: EASE_IN_OUT }}
            className="lg:hidden border-t border-hairline bg-bg overflow-hidden"
          >
            <div className="px-5 py-4 space-y-4">
              <SearchBar />
              <div className="flex flex-col gap-3">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    end={!!l.end}
                    className={({ isActive }) =>
                      `text-[14px] font-medium transition-colors duration-200 ${isActive ? 'text-accent-deep' : 'text-ink/75'}`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
              <div className="flex gap-3">
                <select
                  defaultValue={params.get('category') || 'all'}
                  onChange={(e) => applyQuickFilter('category', e.target.value)}
                  className="flex-1 border border-hairline rounded px-2 py-2 text-[13px] font-mono"
                >
                  <option value="all">All categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
                <select
                  defaultValue={params.get('condition') || 'all'}
                  onChange={(e) => applyQuickFilter('condition', e.target.value)}
                  className="flex-1 border border-hairline rounded px-2 py-2 text-[13px] font-mono"
                >
                  <option value="all">Any condition</option>
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
