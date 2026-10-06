import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, Outlet } from 'react-router-dom'
import { pageFade } from '../../lib/motion.js'

export default function PageTransition() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname} initial="initial" animate="animate" exit="exit" variants={pageFade}>
        <Outlet />
      </motion.div>
    </AnimatePresence>
  )
}
