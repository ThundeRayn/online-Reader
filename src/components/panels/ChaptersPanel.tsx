import { useEffect, useRef, type RefObject } from 'react'

interface ChaptersPanelProps {
  isOpen: boolean
  onClose: () => void
  buttonRef: RefObject<HTMLButtonElement | null>
}

const ChaptersPanel = ({ isOpen, onClose, buttonRef }: ChaptersPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null)

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
        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-text)' }}>目录</h3>
        
        <div className="space-y-2 max-w-md mx-auto">
          <p className="text-center py-8" style={{ color: 'var(--theme-text)', opacity: 0.6 }}>
            章节目录开发中
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChaptersPanel
