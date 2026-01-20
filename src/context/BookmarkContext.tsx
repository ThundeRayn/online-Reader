import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface Bookmark {
  id: string
  label: string
  timestamp: number
}

interface BookmarkContextType {
  bookmarks: Bookmark[]
  addBookmark: (label: string) => void
  removeBookmark: (id: string) => void
  navigateToBookmark: (label: string) => void
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)

// Helper function to extract chapter number from anchor label
// Examples: "§ 1.01" -> 1, "§ 2.05" -> 2, "§ 10.03" -> 10
const getChapterFromAnchor = (label: string): number => {
  const match = label.match(/§\s*(\d+)/)
  return match ? parseInt(match[1]) : 1
}

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const navigate = useNavigate()

  const addBookmark = (label: string) => {
    // Check if bookmark already exists
    const exists = bookmarks.some(b => b.label === label)
    if (exists) {
      removeBookmark(bookmarks.find(b => b.label === label)!.id)
      return
    }

    const newBookmark: Bookmark = {
      id: `${label}-${Date.now()}`,
      label,
      timestamp: Date.now()
    }
    setBookmarks([...bookmarks, newBookmark])
  }

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(b => b.id !== id))
  }

  const navigateToBookmark = (label: string) => {
    // Extract chapter number from anchor label (e.g., "§ 1.01" -> chapter 1)
    const chapterId = getChapterFromAnchor(label)
    const currentPath = window.location.pathname
    const isCurrentChapter = currentPath.includes(`/chapter/${chapterId}`) || 
                             (chapterId === 1 && currentPath === '/')
    
    const scrollToElement = () => {
      const element = document.querySelector(`[data-anchor="${label}"]`)
      if (element) {
        // Get element position
        const rect = element.getBoundingClientRect()
        const elementTop = window.scrollY + rect.top
        
        // Calculate scroll position to place element at 25% from top (or nearest valid position)
        const targetScrollTop = Math.max(0, elementTop - window.innerHeight * 0.25)
        
        window.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        })
      }
    }

    if (!isCurrentChapter) {
      // Navigate to the correct chapter first
      navigate(`/chapter/${chapterId}`)
      // Use a small timeout to ensure the chapter loads before scrolling
      setTimeout(scrollToElement, 100)
    } else {
      // Already on the correct chapter, just scroll
      scrollToElement()
    }
  }

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, navigateToBookmark }}>
      {children}
    </BookmarkContext.Provider>
  )
}

export const useBookmarks = () => {
  const context = useContext(BookmarkContext)
  if (!context) {
    throw new Error('useBookmarks must be used within BookmarkProvider')
  }
  return context
}
