import { useState, useRef, useEffect } from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5'

interface ElaborationProps {
  note?:string;
  text: string;
  more?:string;
}

interface PositionStyle {
  width?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
  marginTop?: string;
  marginBottom?: string;
}

const Elaboration = ({ note,text }: ElaborationProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<PositionStyle>({ top: '100%', left: '50%', transform: 'translateX(-50%)' })
  const popupRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

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
      //const halfMaxWidth = 160 // Half of 320px max width
      
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
            className="absolute z-50 bg-neutral-800 border-default-text text-default-bg p-4 rounded-lg shadow-lg max-h-96 overflow-y-auto"
            style={{
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: '8px',
              width: 'auto',
              minWidth: '200px',
              maxWidth: 'min(320px, calc(100vw - 32px))',
              ...position
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {note && (
              <div className="italic text-sm font-bold mb-2">
                {note}
              </div>
            )}
            <p className="text-normal leading-5">{text}</p>
          </div>
        </>
      )}
    </span>
  )
}

export default Elaboration