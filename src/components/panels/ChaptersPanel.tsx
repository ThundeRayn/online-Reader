import { useEffect, useRef, type RefObject } from 'react'
import { useNavigate } from 'react-router-dom'

interface ChaptersPanelProps {
  isOpen: boolean
  onClose: () => void
  buttonRef: RefObject<HTMLButtonElement | null>
}

const ChaptersPanel = ({ isOpen, onClose, buttonRef }: ChaptersPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const handleChapterClick = (chapterNumber: number) => {
    navigate(`/chapter/${chapterNumber}`)
    onClose()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
        
        <div className="space-y-2 max-w-md mx-auto overflow-y-auto max-h-72">
          {/* Chapter 1 */}
          <button 
            onClick={() => handleChapterClick(1)}
            className="block w-full text-left px-4 py-2 rounded transition-colors hover:bg-opacity-10"
            style={{ 
              color: 'var(--theme-text)',
              borderLeft: '3px solid var(--theme-border)'
            }}
          >
            第一章
          </button>

          {/* Chapter 2 */}
          <button 
            onClick={() => handleChapterClick(2)}
            className="block w-full text-left px-4 py-2 rounded transition-colors hover:bg-opacity-10"
            style={{ 
              color: 'var(--theme-text)',
              borderLeft: '3px solid var(--theme-border)'
            }}
          >
            第二章
          </button>

          {/* Chapter 3 */}
          <button 
            onClick={() => handleChapterClick(3)}
            className="block w-full text-left px-4 py-2 rounded transition-colors hover:bg-opacity-10"
            style={{ 
              color: 'var(--theme-text)',
              borderLeft: '3px solid var(--theme-border)'
            }}
          >
            第三章
          </button>

          {/* Chapter 4 */}
          <button 
            onClick={() => handleChapterClick(4)}
            className="block w-full text-left px-4 py-2 rounded transition-colors hover:bg-opacity-10"
            style={{ 
              color: 'var(--theme-text)',
              borderLeft: '3px solid var(--theme-border)'
            }}
          >
            第四章
          </button>

          {/* Chapter 5 */}
          <button 
            onClick={() => handleChapterClick(5)}
            className="block w-full text-left px-4 py-2 rounded transition-colors hover:bg-opacity-10"
            style={{ 
              color: 'var(--theme-text)',
              borderLeft: '3px solid var(--theme-border)'
            }}
          >
            第五章
          </button>

          {/* Chapter 6 */}
          <button 
            onClick={() => handleChapterClick(6)}
            className="block w-full text-left px-4 py-2 rounded transition-colors hover:bg-opacity-10"
            style={{ 
              color: 'var(--theme-text)',
              borderLeft: '3px solid var(--theme-border)'
            }}
          >
            第六章
          </button>

          {/* Chapter 7 */}
          <button 
            onClick={() => handleChapterClick(7)}
            className="block w-full text-left px-4 py-2 rounded transition-colors hover:bg-opacity-10"
            style={{ 
              color: 'var(--theme-text)',
              borderLeft: '3px solid var(--theme-border)'
            }}
          >
            第七章
          </button>

          {/* Chapter 8 */}
          <button 
            onClick={() => handleChapterClick(8)}
            className="block w-full text-left px-4 py-2 rounded transition-colors hover:bg-opacity-10"
            style={{ 
              color: 'var(--theme-text)',
              borderLeft: '3px solid var(--theme-border)'
            }}
          >
            第八章
          </button>

          {/* Chapter 9 */}
          <button 
            onClick={() => handleChapterClick(9)}
            className="block w-full text-left px-4 py-2 rounded transition-colors hover:bg-opacity-10"
            style={{ 
              color: 'var(--theme-text)',
              borderLeft: '3px solid var(--theme-border)'
            }}
          >
            第九章
          </button>

          {/* Chapter 10 */}
          <button 
            onClick={() => handleChapterClick(10)}
            className="block w-full text-left px-4 py-2 rounded transition-colors hover:bg-opacity-10"
            style={{ 
              color: 'var(--theme-text)',
              borderLeft: '3px solid var(--theme-border)'
            }}
          >
            第十章
          </button>

          {/* Chapter 11 */}
          <button 
            onClick={() => handleChapterClick(11)}
            className="block w-full text-left px-4 py-2 rounded transition-colors hover:bg-opacity-10"
            style={{ 
              color: 'var(--theme-text)',
              borderLeft: '3px solid var(--theme-border)'
            }}
          >
            第十一章
          </button>

          {/* Chapter 12 */}
          <button 
            onClick={() => handleChapterClick(12)}
            className="block w-full text-left px-4 py-2 rounded transition-colors hover:bg-opacity-10"
            style={{ 
              color: 'var(--theme-text)',
              borderLeft: '3px solid var(--theme-border)'
            }}
          >
            第十二章
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChaptersPanel
