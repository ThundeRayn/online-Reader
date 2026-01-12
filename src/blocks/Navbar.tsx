import { useState } from 'react'
import MenuOverlay from './MenuOverlay'
//import ToolBar from '../components/ToolBar'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuToggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    if (newState) {
      window.dispatchEvent(new Event('menuOverlayOpen'))
    }
  }

  return (
    <>
      {/* Floating Menu Button */}
      <button
        onClick={handleMenuToggle}
        style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)', border: '1px solid var(--theme-border)' }}
        className="sticky top-4 float-right mr-4 z-[10000] w-12 h-12 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center"
      >
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="5" r="1" fill="currentColor" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="12" cy="19" r="1" fill="currentColor" />
          </svg>
        )}
      </button>

      <MenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default Navbar