import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMagnetic } from '../../hooks/useMagnetic.js'
import { EASE_OUT, DURATION, OFFSET, buttonHover } from '../../lib/motion.js'

function HeroButton({ to, primary, children }) {
  const ref = useMagnetic({ strength: 6 })
  return (
    <motion.div ref={ref} {...buttonHover} className="inline-block">
      <Link
        to={to}
        className={
          primary
            ? 'inline-block bg-accent text-bg font-semibold text-[14.5px] px-6 py-3.5 rounded hover:bg-accent-deep transition-colors duration-200'
            : 'inline-block bg-bg/10 border border-bg/40 backdrop-blur-sm text-bg font-semibold text-[14.5px] px-6 py-3.5 rounded hover:bg-bg/20 transition-colors duration-200'
        }
      >
        {children}
      </Link>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <header className="relative min-h-[92svh] flex items-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(32,48,28,.62) 0%, rgba(32,48,28,.38) 38%, rgba(32,48,28,.08) 62%), linear-gradient(to bottom, rgba(32,48,28,.05) 60%, #F7F6EE 100%)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: OFFSET.medium }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.heroReveal, ease: EASE_OUT }}
        className="relative z-10 max-w-6xl mx-auto px-7 w-full text-bg"
      >
        <p className="font-mono text-[12.5px] tracking-wide opacity-85 mb-5">
          Live on campus &mdash; 18 active listings this week
        </p>
        <h1
          className="font-display font-extrabold leading-[1.02] tracking-tight mb-5"
          style={{ fontSize: 'clamp(38px, 6.5vw, 76px)', maxWidth: '13ch' }}
        >
          Buy, sell, and swap &mdash; right here on campus.
        </h1>
        <p className="max-w-[36ch] opacity-90 mb-8 text-[16px]">
          From textbooks to bicycles, trade directly with students in your own hostel or department. No shipping, no strangers off-campus.
        </p>
        <div className="flex flex-wrap gap-4">
          <HeroButton to="/browse" primary>Browse listings</HeroButton>
          <HeroButton to="/sell">Sell an item</HeroButton>
        </div>
      </motion.div>
    </header>
  )
}
