import { useEffect, useRef, type RefObject } from 'react'
import { useBookmarks } from '../../context/BookmarkContext'
import { MdDeleteOutline } from 'react-icons/md'
import Processing from '../../components/Processing'

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

  // Sort bookmarks by chapter ID (1-12), then by paragraph number within chapter
  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    // Extract chapter and paragraph: "§ 1.01" -> chapter=1, paragraph=01
    const aMatch = a.label.match(/§\s*(\d+)\.(\d+)/)
    const bMatch = b.label.match(/§\s*(\d+)\.(\d+)/)
    
    const aChapter = aMatch ? parseInt(aMatch[1]) : 0
    const bChapter = bMatch ? parseInt(bMatch[1]) : 0
    
    // First sort by chapter (1-12)
    if (aChapter !== bChapter) {
      return aChapter - bChapter
    }
    
    // Within the same chapter, sort by paragraph number (ascending: 01, 05, 15, 114, etc.)
    const aParagraph = aMatch ? parseInt(aMatch[2]) : 0
    const bParagraph = bMatch ? parseInt(bMatch[2]) : 0
    return aParagraph - bParagraph
  })

  return (
    <div 
      ref={panelRef}
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-6 py-6" style={{ borderBottom: '1px solid var(--theme-border)' }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-text)' }}>书签</h3>
        <Processing text='游客状态的书签工具只是暂时的哦，不会被保存'/>

        <div className="mt-2 space-y-2 max-w-md mx-auto max-h-80 overflow-y-auto">
          {bookmarks.length === 0 ? (
            <p className="text-center py-8" style={{ color: 'var(--theme-text)', opacity: 0.6 }}>
              暂无书签
            </p>
          ) : (
            sortedBookmarks.map((bookmark) => (
              
              
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
                  {bookmark.reminder && (
                    <p className="text-sm" style={{ color: 'var(--theme-text)', opacity: 0.7 }}>
                      {bookmark.reminder}
                    </p>
                  )}
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
