import React, { createContext, useContext, useState } from 'react'

export interface Bookmark {
  id: string
  label: string
  timestamp: number
}

interface BookmarkContextType {
  bookmarks: Bookmark[]
  addBookmark: (label: string) => void
  removeBookmark: (id: string) => void
  navigateToBookmark: (id: string) => void
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

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
    // Find element with data-anchor attribute matching the label
    const element = document.querySelector(`[data-anchor="${label}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
