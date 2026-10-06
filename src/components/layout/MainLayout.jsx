import React from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Toast from '../ui/Toast.jsx'
import PageTransition from '../motion/PageTransition.jsx'
import ClickSpark from '../ui/ClickSpark.jsx'
import HelpButton from '../ui/HelpButton.jsx'

export default function MainLayout() {
  return (
    <ClickSpark sparkColor="#5F7A1F" sparkSize={8} sparkRadius={18} sparkCount={7} duration={400}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <PageTransition />
        </main>
        <Footer />
        <Toast />
        <HelpButton />
      </div>
    </ClickSpark>
  )
}
