import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: '#F3E5AB' }}
        className="sticky top-4 float-right mr-4 z-50 w-12 h-12 text-default-text border border-default-text rounded-full hover:opacity-80 transition-opacity flex items-center justify-center"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="5" r="1" fill="currentColor" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          <circle cx="12" cy="19" r="1" fill="currentColor" />
        </svg>
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-default-bg z-[9999]"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-6 text-2xl">
              <a href="#" className="hover:opacity-70 transition-opacity">Home</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Chapters</a>
              <a href="#" className="hover:opacity-70 transition-opacity">About</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Settings</a>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar