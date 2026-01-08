import { useState, useRef, useEffect } from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5'

interface ElaborationProps {
  text: string;
}

const Elaboration = ({ text }: ElaborationProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: '100%', left: '50%', transform: 'translateX(-50%)' })
  const popupRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen && popupRef.current && buttonRef.current) {
      const popup = popupRef.current
      const button = buttonRef.current.getBoundingClientRect()
      
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const padding = 16
      
      // Calculate max available width
      const maxWidth = Math.min(320, viewportWidth - padding * 2)
      
      let adjustedStyle: any = {
        width: `${maxWidth}px`,
        top: '100%',
        bottom: 'auto',
        marginTop: '8px',
        marginBottom: '0'
      }
      
      // Determine horizontal position
      const buttonCenter = button.left + button.width / 2
      const halfWidth = maxWidth / 2
      
      if (buttonCenter - halfWidth < padding) {
        // Too close to left edge
        adjustedStyle.left = '0'
        adjustedStyle.right = 'auto'
        adjustedStyle.transform = 'none'
      } else if (buttonCenter + halfWidth > viewportWidth - padding) {
        // Too close to right edge
        adjustedStyle.left = 'auto'
        adjustedStyle.right = '0'
        adjustedStyle.transform = 'none'
      } else {
        // Center it
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
      {/* Info Circle Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center hover:opacity-70 transition-opacity"
        aria-label="Show elaboration"
      >
        <IoInformationCircleOutline size={20} color="#4F4432" />
      </button>

      {/* Info Popup Box */}
      {isOpen && (
        <>
          {/* Backdrop to close when clicking outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Info Box - smart positioning */}
          <div
            ref={popupRef}
            className="absolute z-50 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-lg w-80 max-h-96 overflow-y-auto"
            style={{
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: '8px',
              maxWidth: 'calc(100vw - 16px)',
              ...position
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="italic text-sm font-semibold mb-2">
              注释：
            </div>
            <p className="font-normal">{text}</p>
          </div>
        </>
      )}
    </span>
  )
}

export default Elaboration