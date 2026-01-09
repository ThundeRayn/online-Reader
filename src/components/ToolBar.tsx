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
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'blue' | 'paper' | 'sepia' | 'mint'>('light')
  const [textSize, setTextSize] = useState(19)
  const [lineSpacing, setLineSpacing] = useState(1.7)
  const [marginSpacing, setMarginSpacing] = useState(32)
  const settingsPanelRef = useRef<HTMLDivElement>(null)
  const settingsButtonRef = useRef<HTMLButtonElement>(null)

  // Apply text size globally to reading content
  useEffect(() => {
    document.documentElement.style.setProperty('--reading-text-size', `${textSize}px`)
  }, [textSize])

  // Apply line spacing globally to reading content
  useEffect(() => {
    document.documentElement.style.setProperty('--reading-line-height', `${lineSpacing}`)
  }, [lineSpacing])

  // Apply margin spacing globally to reading page
  useEffect(() => {
    document.documentElement.style.setProperty('--reading-margin', `${marginSpacing}px`)
  }, [marginSpacing])

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', selectedTheme)
  }, [selectedTheme])

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
      {/* Settings Panel - integrated into toolbar */}
      <div 
        ref={settingsPanelRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isSettingsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6" style={{ borderBottom: '1px solid var(--theme-border)' }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-text)' }}>Settings</h3>
          
          <div className="space-y-4 max-w-md mx-auto">
            {/* Theme */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--theme-text)' }}>Theme</label>
              <div className="flex gap-2 flex-wrap">
                <button 
                  onClick={() => setSelectedTheme('light')}
                  className="px-3 py-1 rounded transition-colors"
                  style={{
                    border: '1px solid var(--theme-border)',
                    backgroundColor: selectedTheme === 'light' ? 'var(--theme-hover-bg)' : 'transparent',
                    color: selectedTheme === 'light' ? 'var(--theme-hover-text)' : 'var(--theme-text)'
                  }}
                >
                  Light
                </button>
                <button 
                  onClick={() => setSelectedTheme('dark')}
                  className="px-3 py-1 rounded transition-colors"
                  style={{
                    border: '1px solid var(--theme-border)',
                    backgroundColor: selectedTheme === 'dark' ? 'var(--theme-hover-bg)' : 'transparent',
                    color: selectedTheme === 'dark' ? 'var(--theme-hover-text)' : 'var(--theme-text)'
                  }}
                >
                  Dark
                </button>
                <button 
                  onClick={() => setSelectedTheme('blue')}
                  className="px-3 py-1 rounded transition-colors"
                  style={{
                    border: '1px solid var(--theme-border)',
                    backgroundColor: selectedTheme === 'blue' ? 'var(--theme-hover-bg)' : 'transparent',
                    color: selectedTheme === 'blue' ? 'var(--theme-hover-text)' : 'var(--theme-text)'
                  }}
                >
                  Blue
                </button>
                <button 
                  onClick={() => setSelectedTheme('paper')}
                  className="px-3 py-1 rounded transition-colors"
                  style={{
                    border: '1px solid var(--theme-border)',
                    backgroundColor: selectedTheme === 'paper' ? 'var(--theme-hover-bg)' : 'transparent',
                    color: selectedTheme === 'paper' ? 'var(--theme-hover-text)' : 'var(--theme-text)'
                  }}
                >
                  Paper
                </button>
                <button 
                  onClick={() => setSelectedTheme('sepia')}
                  className="px-3 py-1 rounded transition-colors"
                  style={{
                    border: '1px solid var(--theme-border)',
                    backgroundColor: selectedTheme === 'sepia' ? 'var(--theme-hover-bg)' : 'transparent',
                    color: selectedTheme === 'sepia' ? 'var(--theme-hover-text)' : 'var(--theme-text)'
                  }}
                >
                  Sepia
                </button>
                <button 
                  onClick={() => setSelectedTheme('mint')}
                  className="px-3 py-1 rounded transition-colors"
                  style={{
                    border: '1px solid var(--theme-border)',
                    backgroundColor: selectedTheme === 'mint' ? 'var(--theme-hover-bg)' : 'transparent',
                    color: selectedTheme === 'mint' ? 'var(--theme-hover-text)' : 'var(--theme-text)'
                  }}
                >
                  Mint
                </button>
              </div>
            </div>

            {/* Text Size - Full Width */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--theme-text)' }}>
                Text Size: {textSize}px
              </label>
              <input 
                type="range" 
                min="15" 
                max="24" 
                value={textSize}
                onChange={(e) => setTextSize(Number(e.target.value))}
                className="w-full slider-large"
              />
            </div>

            {/* Line Spacing and Margin Spacing - Side by Side */}
            <div className="flex gap-4">
              {/* Line Spacing */}
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--theme-text)' }}>
                  Line: {lineSpacing.toFixed(1)}
                </label>
                <input 
                  type="range" 
                  min="1.5" 
                  max="2.0" 
                  step="0.1"
                  value={lineSpacing}
                  onChange={(e) => setLineSpacing(Number(e.target.value))}
                  className="w-full slider-large"
                />
              </div>

              {/* Margin Spacing */}
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--theme-text)' }}>
                  Margin: {marginSpacing}px
                </label>
                <input 
                  type="range" 
                  min="32" 
                  max="52" 
                  step="4"
                  value={marginSpacing}
                  onChange={(e) => setMarginSpacing(Number(e.target.value))}
                  className="w-full slider-large"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar buttons */}
      <div className="flex items-center justify-around p-4">
        <button className="hover:opacity-70 transition-opacity flex items-center gap-2">
          <IoBookOutline size={24} style={{ color: 'var(--theme-text)' }} />
        </button>
        <button className="hover:opacity-70 transition-opacity flex items-center gap-2">
          <BsBookmark size={22} style={{ color: 'var(--theme-text)' }} />
        </button>
        <button 
          ref={settingsButtonRef}
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          <IoSettingsOutline size={24} style={{ color: 'var(--theme-text)' }} />
        </button>
      </div>
    </div>
  )
}

export default ToolBar