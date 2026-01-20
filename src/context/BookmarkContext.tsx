import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import bookmarksData from '../data/bookmarks.json'

export interface Bookmark {
  id: string
  label: string
  bookId?: string
  chapterId?: number
  reminder?: string
  createdAt?: string
  updatedAt?: string
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

// Utility functions for bookmark storage - easy to migrate to backend API later
const loadBookmarksFromStorage = (): Bookmark[] => {
  try {
    const stored = localStorage.getItem('bookmarks')
    const storedVersion = localStorage.getItem('bookmarks-version')
    const currentVersion = (bookmarksData as any).version
    
    // If version changed or localStorage is empty, reload from JSON
    if (storedVersion !== currentVersion) {
      const jsonBookmarks = (bookmarksData as any).users?.[0]?.bookmarks || []
      if (jsonBookmarks.length > 0) {
        localStorage.setItem('bookmarks', JSON.stringify(jsonBookmarks))
        localStorage.setItem('bookmarks-version', currentVersion)
      }
      return jsonBookmarks
    }
    
    // If version matches and data exists, use localStorage
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
    
    // Fallback to default mock cloud data from JSON
    const jsonBookmarks = (bookmarksData as any).users?.[0]?.bookmarks || []
    if (jsonBookmarks.length > 0) {
      localStorage.setItem('bookmarks', JSON.stringify(jsonBookmarks))
      localStorage.setItem('bookmarks-version', currentVersion)
    }
    return jsonBookmarks
  } catch (error) {
    console.error('Failed to load bookmarks:', error)
    return (bookmarksData as any).users?.[0]?.bookmarks || []
  }
}

const saveBookmarksToStorage = (bookmarks: Bookmark[]): void => {
  try {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  } catch (error) {
    console.error('Failed to save bookmarks:', error)
  }
}

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => loadBookmarksFromStorage())
  const navigate = useNavigate()

  const addBookmark = (label: string) => {
    // Check if bookmark already exists
    const exists = bookmarks.some(b => b.label === label)
    if (exists) {
      removeBookmark(bookmarks.find(b => b.label === label)!.id)
      return
    }

    const chapterId = getChapterFromAnchor(label)
    const newBookmark: Bookmark = {
      id: `bookmark-${Date.now()}`,
      label,
      bookId: 'thebaid',
      chapterId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    const updatedBookmarks = [...bookmarks, newBookmark]
    setBookmarks(updatedBookmarks)
    saveBookmarksToStorage(updatedBookmarks)
  }

  const removeBookmark = (id: string) => {
    const updatedBookmarks = bookmarks.filter(b => b.id !== id)
    setBookmarks(updatedBookmarks)
    saveBookmarksToStorage(updatedBookmarks)
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
