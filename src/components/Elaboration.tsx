import { useState } from 'react'
import { IoInformationCircleOutline } from 'react-icons/io5'

interface ElaborationProps {
  text: string;
}

const Elaboration = ({ text }: ElaborationProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="inline-block relative">
      {/* Info Circle Button */}
      <button
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
          
          {/* Info Box */}
          <div
            className="absolute left-0 top-8 z-50 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-lg max-w-md min-w-[300px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="italic text-sm font-semibold mb-2">
              注释：
            </div>
            <p className="font-normal">{text}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Elaboration