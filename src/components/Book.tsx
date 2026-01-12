import { useState } from 'react'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'

interface BookProps {
  coverText: string // English name for book cover
  title: string // Book title
  author: string // Author name
  translator?: string // Optional translator name(s)
  status?: 'in-progress' | 'not-started' | 'completed' // Optional reading status
  description?: string // Optional book description
}

const Book = ({ coverText, title, author, translator, status, description }: BookProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        {/* Book Cover */}
        <div 
          className="w-16 h-20 flex items-center justify-center relative"
          style={{ 
            backgroundColor: 'var(--theme-border)',
            color: 'var(--theme-bg)',
            fontSize: 'calc(var(--reading-text-size) * 0.7)',
            fontWeight: 'bold',
            padding: '0.5rem',
            textAlign: 'center',
            lineHeight: '1.2'
          }}
        >
          {coverText}
          {status && (
            <div 
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
              style={{
                backgroundColor: 
                  status === 'completed' ? '#4ade80' : 
                  status === 'in-progress' ? '#fbbf24' : 
                  '#94a3b8'
              }}
            />
          )}
        </div>
        {/* Book Info */}
        <div className="flex flex-col gap-1 flex-1">
          <div 
            className="font-bold"
            style={{ 
              color: 'var(--theme-text)',
              fontSize: 'calc(var(--reading-text-size) * 1.1)'
            }}
          >
            {title}
          </div>
          <div 
            className="opacity-70"
            style={{ 
              color: 'var(--theme-text)',
              fontSize: 'calc(var(--reading-text-size) * 0.7)'
            }}
          >
            [著] {author}
          </div>
          {translator && (
            <div 
              className="opacity-70"
              style={{ 
                color: 'var(--theme-text)',
                fontSize: 'calc(var(--reading-text-size) * 0.7)'
              }}
            >
              [译] {translator}
            </div>
          )}
        </div>
        {/* Expand Icon */}
        {description && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:opacity-70 active:opacity-50 transition-opacity p-1"
            style={{
              color: 'var(--theme-text)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {isExpanded ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
          </button>
        )}
      </div>
      
      {/* Description Section */}
      <div
        style={{
          maxHeight: isExpanded ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 300ms ease-in-out, opacity 300ms ease-in-out',
          opacity: isExpanded ? 1 : 0,
        }}
      >
        {description && (
          <div 
            className="pl-4 pr-2"
            style={{ 
              color: 'var(--theme-text)',
              fontSize: 'calc(var(--reading-text-size) * 0.85)',
              lineHeight: '1.6',
              paddingTop: '0.5rem',
              borderLeft: '2px solid var(--theme-border)',
              opacity: 0.8,
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  )
}

export default Book
