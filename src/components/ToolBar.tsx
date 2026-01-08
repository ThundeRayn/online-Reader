import { useState, useEffect } from 'react'
import { IoBookOutline } from 'react-icons/io5'
import { BsBookmark } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'

interface ToolBarProps {
  isMenuOpen: boolean
}

const ToolBar = ({ isMenuOpen }: ToolBarProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show toolbar when reaching the top of the page
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

    const handleClick = () => {
      setIsVisible(true)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', handleClick)
    }
  }, [lastScrollY])

  // Hide when menu is open
  if (isMenuOpen) return null

  return (
    <div
      style={{ 
        backgroundColor: '#F3E5AB',
        position: 'fixed',
        bottom: '-1px',
        left: 0,
        right: 0,
        margin: 0,
        padding: 0,
        width: '100%',
        boxSizing: 'border-box'
      }}
      className={`z-40 border-t border-default-text transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-around p-4 text-default-text">
        <button className="hover:opacity-70 transition-opacity flex items-center gap-2">
          <IoBookOutline size={24} color="#4F4432" />
        </button>
        <button className="hover:opacity-70 transition-opacity flex items-center gap-2">
          <BsBookmark size={22} color="#4F4432" />
        </button>
        <button className="hover:opacity-70 transition-opacity flex items-center gap-2">
          <IoSettingsOutline size={24} color="#4F4432" />
        </button>
      </div>
    </div>
  )
}

export default ToolBar