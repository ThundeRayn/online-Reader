import { useEffect, useState } from 'react'
import { useBookmarks } from '../context/BookmarkContext'

const FloatingBookmark = () => {
  const { bookmarks, addBookmark } = useBookmarks()
  const [currentAnchor, setCurrentAnchor] = useState<string | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect if device is mobile (touch-enabled)
  useEffect(() => {
    const isTouchDevice = () => {
      return (('ontouchstart' in window) ||
              (navigator.maxTouchPoints > 0))
    }
    setIsMobile(isTouchDevice())
  }, [])

  useEffect(() => {
    const detectCurrentAnchor = () => {
      // Get all anchor elements
      const anchors = document.querySelectorAll('[data-anchor]')
      const viewportMidpoint = window.innerHeight / 2
      let nextAnchor: string | null = null

      // Find the lowest anchor that is above the midpoint (currently reading area)
      for (let i = anchors.length - 1; i >= 0; i--) {
        const rect = anchors[i].getBoundingClientRect()
        // Anchor must be above midpoint (reading area)
        if (rect.top < viewportMidpoint) {
          nextAnchor = anchors[i].getAttribute('data-anchor')
          break
        }
      }

      // Only update if we found a valid anchor
      if (nextAnchor) {
        setCurrentAnchor(nextAnchor)
        setIsBookmarked(bookmarks.some(b => b.label === nextAnchor))
      }
    }

    window.addEventListener('scroll', detectCurrentAnchor)
    detectCurrentAnchor() // Initial check

    return () => window.removeEventListener('scroll', detectCurrentAnchor)
  }, [bookmarks])

  const handleBookmarkClick = () => {
    if (currentAnchor) {
      addBookmark(currentAnchor)
    }
  }

  return (
    <div
      className="fixed left-0 top-12 z-30 transition-all duration-300"
      onClick={handleBookmarkClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={currentAnchor ? `Bookmark ${currentAnchor}` : 'Scroll to a paragraph first'}
      style={{
        width: '100px',
        height: '30px',
        cursor: 'pointer',
        // Rectangle with triangular notch CUT INTO the right side
        clipPath: 'polygon(0 0, 100% 0, 100% 15%, 85% 50%, 100% 85%, 100% 100%, 0 100%)',
        // Transition for fill/border
        backgroundColor: isBookmarked ? 'var(--theme-text)' : 'var(--theme-bg)',
        // Dynamic translation based on device type and bookmark state
        // On mobile: always show more (no hover effect possible)
        // On desktop: use hover-based animation
        transform: isMobile 
          ? (isBookmarked ? 'translateX(-24px)' : 'translateX(-56px)')
          : (isHovered ? 'translateX(0)' : (isBookmarked ? 'translateX(-24px)' : 'translateX(-80px)')),
        transition: 'all 0.3s ease',
      }}
    >
      {!isBookmarked && (
        <svg
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          viewBox="0 0 100 30"
          preserveAspectRatio="none"
        >
          {/* Top line */}
          <line x1="0" y1="0" x2="100" y2="0" stroke="var(--theme-text)" strokeWidth="1" />
          {/* Left line */}
          <line x1="0" y1="0" x2="0" y2="30" stroke="var(--theme-text)" strokeWidth="1" />
          {/* Bottom line */}
          <line x1="0" y1="30" x2="100" y2="30" stroke="var(--theme-text)" strokeWidth="1" />
          {/* Top right to notch top */}
          <line x1="100" y1="0" x2="100" y2="4.5" stroke="var(--theme-text)" strokeWidth="1" />
          {/* Notch top line going in */}
          <line x1="100" y1="4.5" x2="85" y2="15" stroke="var(--theme-text)" strokeWidth="1" />
          {/* Notch bottom line going out */}
          <line x1="85" y1="15" x2="100" y2="25.5" stroke="var(--theme-text)" strokeWidth="1" />
          {/* Bottom right line */}
          <line x1="100" y1="25.5" x2="100" y2="30" stroke="var(--theme-text)" strokeWidth="1" />
        </svg>
      )}
      {currentAnchor && (
        <div
          className="absolute left-full top-0 ml-2 px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            backgroundColor: 'var(--theme-bg)',
            border: '1px solid var(--theme-border)',
            color: 'var(--theme-text)',
            fontSize: 'calc(var(--reading-text-size) * 0.8)',
          }}
        >
          {currentAnchor}
        </div>
      )}
    </div>
  )
}

export default FloatingBookmark
