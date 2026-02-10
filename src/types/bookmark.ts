export interface Bookmark {
  id: string
  label: string
  bookId?: string
  chapterId?: number
  reminder?: string
  createdAt?: string
  updatedAt?: string
}

export interface BookmarksDataType {
  version: string
  users: Array<{ bookmarks: Bookmark[] }>
}
