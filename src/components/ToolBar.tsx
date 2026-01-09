import { useState, useEffect, useRef } from 'react'
import { IoBookOutline } from 'react-icons/io5'
import { BsBookmark } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'

interface ToolBarProps {
  isMenuOpen: boolean
}

const ToolBar = ({ isMenuOpen }: ToolBarProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light')
  const [textSize, setTextSize] = useState(16)
  const settingsPanelRef = useRef<HTMLDivElement>(null)
  const settingsButtonRef = useRef<HTMLButtonElement>(null)

  // Apply text size globally to reading content
  useEffect(() => {
    document.documentElement.style.setProperty('--reading-text-size', `${textSize}px`)
  }, [textSize])

  // Close settings panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSettingsOpen && 
          settingsPanelRef.current && 
          settingsButtonRef.current &&
          !settingsPanelRef.current.contains(event.target as Node) &&
          !settingsButtonRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSettingsOpen])

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
      className={`z-40 border-t border-default-text transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* Settings Panel - integrated into toolbar */}
      <div 
        ref={settingsPanelRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isSettingsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 border-b border-default-text">
          <h3 className="text-lg font-bold mb-4 text-default-text">Settings</h3>
          
          <div className="space-y-4 max-w-md mx-auto">
            {/* Theme */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-default-text">Theme</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedTheme('light')}
                  className={`px-3 py-1 border border-default-text rounded transition-colors ${
                    selectedTheme === 'light' 
                      ? 'bg-default-text text-default-bg' 
                      : 'hover:bg-default-text hover:text-default-bg'
                  }`}
                >
                  Light
                </button>
                <button 
                  onClick={() => setSelectedTheme('dark')}
                  className={`px-3 py-1 border border-default-text rounded transition-colors ${
                    selectedTheme === 'dark' 
                      ? 'bg-default-text text-default-bg' 
                      : 'hover:bg-default-text hover:text-default-bg'
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>

            {/* Text Size */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-default-text">
                Text Size: {textSize}px
              </label>
              <input 
                type="range" 
                min="12" 
                max="24" 
                value={textSize}
                onChange={(e) => setTextSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Line Height */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-default-text">Line Spacing</label>
              <input 
                type="range" 
                min="1" 
                max="3" 
                step="0.1"
                defaultValue="1.5"
                className="w-full"
              />
            </div>

            {/* Letter Spacing */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-default-text">Character Spacing</label>
              <input 
                type="range" 
                min="0" 
                max="5" 
                step="0.5"
                defaultValue="0"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar buttons */}
      <div className="flex items-center justify-around p-4 text-default-text">
        <button className="hover:opacity-70 transition-opacity flex items-center gap-2">
          <IoBookOutline size={24} color="#4F4432" />
        </button>
        <button className="hover:opacity-70 transition-opacity flex items-center gap-2">
          <BsBookmark size={22} color="#4F4432" />
        </button>
        <button 
          ref={settingsButtonRef}
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          <IoSettingsOutline size={24} color="#4F4432" />
        </button>
      </div>
    </div>
  )
}

export default ToolBar