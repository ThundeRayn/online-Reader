import { useEffect, useState } from 'react'
import { GiSpartanHelmet } from 'react-icons/gi'
import ThemeCard from '../components/ThemeCard'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOpen && !shouldRender) {
      // First render the modal
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true)
    }
  }, [isOpen, shouldRender])

  useEffect(() => {
    if (shouldRender && isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAnimating(false)
      
      // Disable scrolling
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      
      // Then trigger animation after a brief delay
      const timer = setTimeout(() => {
        setIsAnimating(true)
      }, 20)
      
      return () => {
        document.body.style.overflow = original
        clearTimeout(timer)
      }
    } else if (shouldRender && !isOpen) {
      // Start closing animation
      setIsAnimating(false)
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 300) // Match transition duration
      return () => clearTimeout(timer)
    }
  }, [isOpen, shouldRender])

  if (!shouldRender) return null

  return (
    <div 
      className="fixed inset-0 z-[9998]"
      style={{
        opacity: isAnimating ? 1 : 0,
        transition: 'opacity 300ms ease-in-out',
      }}
    >
      {/* Transparent backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Menu Window */}
      <div 
        className="fixed top-1/2 left-1/2 z-[9999] w-full px-8"
        style={{
          transform: isAnimating 
            ? 'translate(-50%, -50%)' 
            : 'translate(-50%, calc(-50% + 100vh))',
          transition: 'transform 300ms ease-in-out',
        }}
      >
        <ThemeCard 
          style={{ 
            padding: '2rem',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
           }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* User Profile Section */}
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar */}
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: 'var(--theme-border)', 
                color: 'var(--theme-bg)' 
              }}
            >
              <GiSpartanHelmet size={44} />
            </div>
            {/* User Info */}
            <div className="flex flex-col gap-1">
              <div className="text-xl font-semibold" style={{ color: 'var(--theme-text)' }}>
                匿名希腊战士666
              </div>
              <div className="text-sm opacity-70" style={{ color: 'var(--theme-text)' }}>
                未登录
              </div>
            </div>
          </div>
          <hr/>
          
          {/* Book Intro Section */}
          <div className="mb-6" style={{ color: 'var(--theme-text)' }}>
            你正在阅读
          </div>

          
          <hr/>
          <nav className="flex flex-col gap-6 text-2xl text-center">
            <a href="#" className="hover:opacity-70 active:opacity-50 transition-opacity">Home</a>
            <a href="#" className="hover:opacity-70 active:opacity-50 transition-opacity">Chapters</a>
            <a href="#" className="hover:opacity-70 active:opacity-50 transition-opacity">About</a>
            <a href="#" className="hover:opacity-70 active:opacity-50 transition-opacity">Settings</a>
          </nav>
        </ThemeCard>
      </div>
    </div>
  )
}

export default MenuOverlay
