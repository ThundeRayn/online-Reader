import { useState, useRef, useEffect, useCallback } from 'react'

interface InfoBoxProps {
  trigger: React.ReactNode
  title?: string
  content: string
  customContent?: React.ReactNode
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

interface PositionStyle {
  width?: string
  top?: string
  bottom?: string
  left?: string
  right?: string
  transform?: string
  marginTop?: string
  marginBottom?: string
}

const InfoBox = ({ trigger, title, content, customContent, isOpen, onToggle, onClose }: InfoBoxProps) => {
  const [position, setPosition] = useState<PositionStyle>({ 
    top: '100%', 
    left: '50%', 
    transform: 'translateX(-50%)' 
  })
  const popupRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  // Close when menu overlay opens
  useEffect(() => {
    const handleMenuOpen = () => {
      if (isOpen) {
        handleClose()
      }
    }
    
    window.addEventListener('menuOverlayOpen', handleMenuOpen)
    return () => window.removeEventListener('menuOverlayOpen', handleMenuOpen)
  }, [isOpen, handleClose])

  // Smart positioning algorithm
  useEffect(() => {
    if (isOpen && popupRef.current && buttonRef.current) {
      const popup = popupRef.current
      const button = buttonRef.current.getBoundingClientRect()
      
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const padding = 16
      
      const adjustedStyle: PositionStyle = {
        top: '100%',
        bottom: 'auto',
        marginTop: '8px',
        marginBottom: '0'
      }
      
      // Determine horizontal position based on button location
      const buttonCenter = button.left + button.width / 2
      
      if (buttonCenter < viewportWidth / 3) {
        // Button on left side - align left
        adjustedStyle.left = '0'
        adjustedStyle.right = 'auto'
        adjustedStyle.transform = 'none'
      } else if (buttonCenter > (viewportWidth * 2) / 3) {
        // Button on right side - align right
        adjustedStyle.left = 'auto'
        adjustedStyle.right = '0'
        adjustedStyle.transform = 'none'
      } else {
        // Button in center - center the popup
        adjustedStyle.left = '50%'
        adjustedStyle.right = 'auto'
        adjustedStyle.transform = 'translateX(-50%)'
      }
      
      // Apply initial styles
      Object.assign(popup.style, adjustedStyle)
      
      // Check if it fits below, otherwise show above
      setTimeout(() => {
        const rect = popup.getBoundingClientRect()
        if (rect.bottom > viewportHeight - padding) {
          setPosition({
            ...adjustedStyle,
            top: 'auto',
            bottom: '100%',
            marginTop: '0',
            marginBottom: '8px'
          })
        } else {
          setPosition(adjustedStyle)
        }
      }, 0)
    }
  }, [isOpen])

  return (
    <span className="inline-block relative group">
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={onToggle}
        className="inline-flex items-center justify-center hover:opacity-70 active:opacity-50 transition-opacity"
        aria-label="Show info"
      >
        {trigger}
      </button>

      {/* Info Popup Box */}
      {isOpen && (
        <>
          {/* Backdrop to close when clicking outside */}
          <div
            className="fixed inset-0 z-35"
            onClick={handleClose}
          />
          
          {/* Info Box - smart positioning */}
          <div
            ref={popupRef}
            className="absolute z-35 rounded-lg shadow-lg max-h-96 overflow-y-auto"
            style={{
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: '8px',
              width: 'auto',
              minWidth: '200px',
              maxWidth: 'min(320px, calc(100vw - 32px))',
              fontSize: 'calc(var(--reading-text-size) * 0.875)',
              backgroundColor: '#2a2a2a',
              color: '#e0e0e0',
              border: '1px solid #444',
              padding: '1rem',
              ...position
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="italic font-bold mb-2" style={{ fontSize: 'calc(var(--reading-text-size) * 0.8125)' }}>
                {title}
              </div>
            )}
            {customContent ? customContent : <p className="leading-relaxed">{content}</p>}
          </div>
        </>
      )}
    </span>
  )
}

export default InfoBox