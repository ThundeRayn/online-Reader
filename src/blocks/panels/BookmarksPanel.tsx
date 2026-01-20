import { useEffect, useRef, type RefObject } from 'react'
import { useBookmarks } from '../../context/BookmarkContext'
import { MdDeleteOutline } from 'react-icons/md'

interface BookmarksPanelProps {
  isOpen: boolean
  onClose: () => void
  buttonRef: RefObject<HTMLButtonElement | null>
}

const BookmarksPanel = ({ isOpen, onClose, buttonRef }: BookmarksPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const { bookmarks, removeBookmark, navigateToBookmark } = useBookmarks()

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

  const handleNavigate = (label: string) => {
    navigateToBookmark(label)
    onClose()
  }

  return (
    <div 
      ref={panelRef}
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-6 py-6" style={{ borderBottom: '1px solid var(--theme-border)' }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-text)' }}>书签</h3>
        
        <div className="space-y-2 max-w-md mx-auto max-h-80 overflow-y-auto">
          {bookmarks.length === 0 ? (
            <p className="text-center py-8" style={{ color: 'var(--theme-text)', opacity: 0.6 }}>
              暂无书签
            </p>
          ) : (
            bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="flex items-center justify-between p-3 rounded"
                style={{
                  backgroundColor: 'rgba(var(--theme-text-rgb, 0, 0, 0), 0.05)',
                  borderLeft: '3px solid var(--theme-text)'
                }}
              >
                <button
                  onClick={() => handleNavigate(bookmark.label)}
                  className="flex-1 text-left hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--theme-text)' }}
                >
                  <span className="font-semibold">{bookmark.label}</span>
                </button>
                <button
                  onClick={() => removeBookmark(bookmark.id)}
                  className="hover:opacity-70 transition-opacity ml-2"
                  title="Remove bookmark"
                >
                  <MdDeleteOutline size={18} style={{ color: 'var(--theme-border)' }} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default BookmarksPanel
