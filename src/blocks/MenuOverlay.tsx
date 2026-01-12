import { useEffect, useState } from 'react'
import ThemeCard from '../components/ThemeCard'
import Submenus from './Submenus'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'feed' | 'chapters' | 'about' | 'feedback'>('home')

  useEffect(() => {
    if (isOpen && !shouldRender) {
      // First render the modal
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true)
      setCurrentView('home')
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
        className="fixed top-1/2 left-1/2 z-[9999]"
        style={{
          transform: isAnimating 
            ? 'translate(-50%, -50%)' 
            : 'translate(-50%, calc(-50% + 100vh))',
          transition: 'transform 300ms ease-in-out',
          maxHeight: '80vh',
          width: '100%',
          maxWidth: '600px',
          padding: '0 2rem',
          pointerEvents: 'none',
        }}
      >
        <ThemeCard 
          style={{ 
            padding: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '80vh',
            pointerEvents: 'auto',
           }}
          onClick={(e) => e.stopPropagation()}
        >
          <Submenus 
            currentView={currentView} 
            onBackToHome={() => setCurrentView('home')}
            onNavigate={setCurrentView}
          />
        </ThemeCard>
      </div>
    </div>
  )
}

export default MenuOverlay
