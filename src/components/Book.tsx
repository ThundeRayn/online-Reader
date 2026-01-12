interface BookProps {
  coverText: string // English name for book cover
  title: string // Book title
  author: string // Author name
  translator?: string // Optional translator name(s)
  status?: 'in-progress' | 'not-started' | 'completed' // Optional reading status
}

const Book = ({ coverText, title, author, translator, status }: BookProps) => {
  return (
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
      <div className="flex flex-col gap-1">
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
    </div>
  )
}

export default Book
