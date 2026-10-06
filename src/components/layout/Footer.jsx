import React from 'react'
import { motion } from 'framer-motion'
import { Sprout } from 'lucide-react'
import { revealBlock } from '../../lib/motion.js'

const LINKS = ['About', 'Contact', 'Privacy Policy', 'Terms & Conditions', 'Help']

export default function Footer() {
  return (
    <motion.footer
      className="bg-ink text-bg mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealBlock(15)}
    >
      <div className="max-w-6xl mx-auto px-7 py-14 flex flex-wrap gap-10 justify-between">
        <div>
          <div className="flex items-center gap-2 font-display font-extrabold text-lg mb-2">
            <Sprout size={20} />
            Campus Marketplace
          </div>
          <p className="text-bg/65 text-sm max-w-xs">Buy and sell with students you can actually meet.</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {LINKS.map((l) => (
            <a key={l} href="#" className="text-sm text-bg/80 hover:text-bg transition-colors duration-200">
              {l}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-bg/15 py-5 text-center text-[12.5px] font-mono text-bg/50">
        &copy; {new Date().getFullYear()} Campus Marketplace
      </div>
    </motion.footer>
  )
}
