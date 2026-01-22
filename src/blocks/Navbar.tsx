import { useState, useEffect } from 'react'
import MenuOverlay from './MenuOverlay'
//import ToolBar from '../components/ToolBar'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleMenuToggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    if (newState) {
      window.dispatchEvent(new Event('menuOverlayOpen'))
    }
  }

  // Handle scroll visibility (show on scroll up, hide on scroll down)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show when reaching the top of the page
      if (currentScrollY < 50) {
        setIsVisible(true)
        setLastScrollY(currentScrollY)
        return
      }

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      {/* Floating Menu Button */}
      <button
        onClick={handleMenuToggle}
        style={{ 
          backgroundColor: 'var(--theme-bg)', 
          color: 'var(--theme-text)', 
          border: '1px solid var(--theme-border)',
          transform: isVisible ? 'translateX(0)' : 'translateX(120px)',
          transition: 'transform 300ms ease-in-out',
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 10000
        }}
        className="w-12 h-12 rounded-full hover:opacity-80 active:opacity-60 transition-opacity flex items-center justify-center"
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