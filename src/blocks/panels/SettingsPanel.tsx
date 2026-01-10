import { useState, useEffect, useRef, type RefObject } from 'react'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  buttonRef: RefObject<HTMLButtonElement | null>
}

const SettingsPanel = ({ isOpen, onClose, buttonRef }: SettingsPanelProps) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light')
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'night' | 'bluenight' | 'warmnight' | 'paper' | 'sepia' | 'cream' | 'parchment' | 'linen' | 'ivory'>('light')
  const [textSize, setTextSize] = useState(19)
  const [lineSpacing, setLineSpacing] = useState(1.7)
  const [marginSpacing, setMarginSpacing] = useState(32)
  const panelRef = useRef<HTMLDivElement>(null)

  // Light mode themes
  const lightThemes: Array<typeof selectedTheme> = ['light', 'paper', 'sepia', 'cream', 'parchment', 'linen', 'ivory']
  // Dark mode themes
  const darkThemes: Array<typeof selectedTheme> = ['dark', 'night', 'bluenight', 'warmnight']

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

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && 
          panelRef.current && 
          buttonRef.current &&
          !panelRef.current.contains(event.target as Node) &&
          !buttonRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose, buttonRef])

  return (
    <div 
      ref={panelRef}
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-6 py-6" style={{ borderBottom: '1px solid var(--theme-border)' }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-text)' }}>阅读设置</h3>
        
        <div className="space-y-4 max-w-md mx-auto">
          {/* Theme Mode Switch as Title */}
          <div>
            <div className="flex gap-1 mb-3 text-sm font-semibold" style={{ color: 'var(--theme-text)' }}>
              <button 
                onClick={() => {
                  setThemeMode('light')
                  if (!lightThemes.includes(selectedTheme)) {
                    setSelectedTheme('light')
                  }
                }}
                className="transition-opacity"
                style={{
                  opacity: themeMode === 'light' ? 1 : 0.5,
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer'
                }}
              >
                日间主题
              </button>
              <span style={{ opacity: 0.5 }}>|</span>
              <button 
                onClick={() => {
                  setThemeMode('dark')
                  if (!darkThemes.includes(selectedTheme)) {
                    setSelectedTheme('dark')
                  }
                }}
                className="transition-opacity"
                style={{
                  opacity: themeMode === 'dark' ? 1 : 0.5,
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer'
                }}
              >
                夜间主题
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {themeMode === 'light' ? (
                <>
                  <button 
                    onClick={() => setSelectedTheme('light')}
                    className="px-3 py-1 rounded transition-colors"
                    style={{
                      border: '1px solid var(--theme-border)',
                      backgroundColor: selectedTheme === 'light' ? 'var(--theme-hover-bg)' : 'transparent',
                      color: selectedTheme === 'light' ? 'var(--theme-hover-text)' : 'var(--theme-text)'
                    }}
                  >
                    经典
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
                    纸质
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
                    棕褐
                  </button>
                  <button 
                    onClick={() => setSelectedTheme('cream')}
                    className="px-3 py-1 rounded transition-colors"
                    style={{
                      border: '1px solid var(--theme-border)',
                      backgroundColor: selectedTheme === 'cream' ? 'var(--theme-hover-bg)' : 'transparent',
                      color: selectedTheme === 'cream' ? 'var(--theme-hover-text)' : 'var(--theme-text)'
                    }}
                  >
                    奶油
                  </button>
                  <button 
                    onClick={() => setSelectedTheme('parchment')}
                    className="px-3 py-1 rounded transition-colors"
                    style={{
                      border: '1px solid var(--theme-border)',
                      backgroundColor: selectedTheme === 'parchment' ? 'var(--theme-hover-bg)' : 'transparent',
                      color: selectedTheme === 'parchment' ? 'var(--theme-hover-text)' : 'var(--theme-text)'
                    }}
                  >
                    羊皮纸
                  </button>
                  <button 
                    onClick={() => setSelectedTheme('linen')}
                    className="px-3 py-1 rounded transition-colors"
                    style={{
                      border: '1px solid var(--theme-border)',
                      backgroundColor: selectedTheme === 'linen' ? 'var(--theme-hover-bg)' : 'transparent',
                      color: selectedTheme === 'linen' ? 'var(--theme-hover-text)' : 'var(--theme-text)'
                    }}
                  >
                    亚麻
                  </button>
                  <button 
                    onClick={() => setSelectedTheme('ivory')}
                    className="px-3 py-1 rounded transition-colors"
                    style={{
                      border: '1px solid var(--theme-border)',
                      backgroundColor: selectedTheme === 'ivory' ? 'var(--theme-hover-bg)' : 'transparent',
                      color: selectedTheme === 'ivory' ? 'var(--theme-hover-text)' : 'var(--theme-text)'
                    }}
                  >
                    象牙白
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setSelectedTheme('dark')}
                    className="px-3 py-1 rounded transition-colors"
                    style={{
                      border: '1px solid var(--theme-border)',
                      backgroundColor: selectedTheme === 'dark' ? 'var(--theme-hover-bg)' : 'transparent',
                      color: selectedTheme === 'dark' ? 'var(--theme-hover-text)' : 'var(--theme-text)'
                    }}
                  >
                    暗夜
                  </button>
                  <button 
                    onClick={() => setSelectedTheme('night')}
                    className="px-3 py-1 rounded transition-colors"
                    style={{
                      border: '1px solid var(--theme-border)',
                      backgroundColor: selectedTheme === 'night' ? 'var(--theme-hover-bg)' : 'transparent',
                      color: selectedTheme === 'night' ? 'var(--theme-hover-text)' : 'var(--theme-text)'
                    }}
                  >
                    柔夜
                  </button>
                  <button 
                    onClick={() => setSelectedTheme('bluenight')}
                    className="px-3 py-1 rounded transition-colors"
                    style={{
                      border: '1px solid var(--theme-border)',
                      backgroundColor: selectedTheme === 'bluenight' ? 'var(--theme-hover-bg)' : 'transparent',
                      color: selectedTheme === 'bluenight' ? 'var(--theme-hover-text)' : 'var(--theme-text)'
                    }}
                  >
                    蓝夜
                  </button>
                  <button 
                    onClick={() => setSelectedTheme('warmnight')}
                    className="px-3 py-1 rounded transition-colors"
                    style={{
                      border: '1px solid var(--theme-border)',
                      backgroundColor: selectedTheme === 'warmnight' ? 'var(--theme-hover-bg)' : 'transparent',
                      color: selectedTheme === 'warmnight' ? 'var(--theme-hover-text)' : 'var(--theme-text)'
                    }}
                  >
                    暖夜
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Text Size - Full Width */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--theme-text)' }}>
              字体大小: {textSize}px
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
                行间距: {lineSpacing.toFixed(1)}
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
                左右间距: {marginSpacing}px
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
  )
}

export default SettingsPanel
