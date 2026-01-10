import { useState, useEffect, useRef } from 'react'
import { IoBookOutline } from 'react-icons/io5'
import { BsBookmark } from 'react-icons/bs'
import SettingsPanel from './panels/SettingsPanel'
import BookmarksPanel from './panels/BookmarksPanel'
import ChaptersPanel from './panels/ChaptersPanel'

interface ToolBarProps {
  isMenuOpen: boolean
}

const ToolBar = ({ isMenuOpen }: ToolBarProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false)
  const [isChaptersOpen, setIsChaptersOpen] = useState(false)
  
  const settingsButtonRef = useRef<HTMLButtonElement>(null)
  const bookmarksButtonRef = useRef<HTMLButtonElement>(null)
  const chaptersButtonRef = useRef<HTMLButtonElement>(null)

  // Close all panels except the specified one
  const closeOtherPanels = (keepOpen: 'settings' | 'bookmarks' | 'chapters') => {
    if (keepOpen !== 'settings') setIsSettingsOpen(false)
    if (keepOpen !== 'bookmarks') setIsBookmarksOpen(false)
    if (keepOpen !== 'chapters') setIsChaptersOpen(false)
  }

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
      className={`z-40 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{
        backgroundColor: 'var(--theme-bg)',
        borderTop: '1px solid var(--theme-border)',
        position: 'fixed',
        bottom: '-1px',
        left: 0,
        right: 0,
        margin: 0,
        padding: 0,
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Settings Panel */}
      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        buttonRef={settingsButtonRef}
      />

      {/* Bookmarks Panel */}
      <BookmarksPanel 
        isOpen={isBookmarksOpen} 
        onClose={() => setIsBookmarksOpen(false)}
        buttonRef={bookmarksButtonRef}
      />

      {/* Chapters Panel */}
      <ChaptersPanel 
        isOpen={isChaptersOpen} 
        onClose={() => setIsChaptersOpen(false)}
        buttonRef={chaptersButtonRef}
      />

      {/* Toolbar buttons */}
      <div className="flex items-center justify-around p-4">
        <button 
          ref={chaptersButtonRef}
          onClick={() => {
            closeOtherPanels('chapters')
            setIsChaptersOpen(!isChaptersOpen)
          }}
          className="hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          <IoBookOutline size={24} style={{ color: 'var(--theme-text)' }} />
        </button>
        <button 
          ref={bookmarksButtonRef}
          onClick={() => {
            closeOtherPanels('bookmarks')
            setIsBookmarksOpen(!isBookmarksOpen)
          }}
          className="hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          <BsBookmark size={22} style={{ color: 'var(--theme-text)' }} />
        </button>
        <button 
          ref={settingsButtonRef}
          onClick={() => {
            closeOtherPanels('settings')
            setIsSettingsOpen(!isSettingsOpen)
          }}
          className="hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          <span style={{ color: 'var(--theme-text)', fontSize: '22px', fontWeight: '600', fontFamily: 'serif' }}>Aa</span>
        </button>
      </div>
    </div>
  )
}

export default ToolBar