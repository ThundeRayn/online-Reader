import { useState } from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5'

interface ElaborationProps {
  text: string;
}

const Elaboration = ({ text }: ElaborationProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setButtonPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
    })
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Info Circle Button */}
      <button
        onClick={handleClick}
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
          
          {/* Info Box */}
          <div
            style={{
              position: 'fixed',
              top: `${buttonPosition.top + 8}px`,
              left: `${buttonPosition.left}px`
            }}
            className="z-50 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-lg max-w-md min-w-[300px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="italic text-sm font-semibold mb-2">
              注释：
            </div>
            <p className="font-normal">{text}</p>
          </div>
        </>
      )}
    </>
  )
}

export default Elaboration