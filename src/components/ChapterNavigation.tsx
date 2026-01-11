import { useNavigate } from 'react-router-dom'

interface ChapterNavigationProps {
  currentChapter: number
}

const ChapterNavigation = ({ currentChapter }: ChapterNavigationProps) => {
  const navigate = useNavigate()

  const handlePreviousChapter = () => {
    if (currentChapter > 1) {
      navigate(`/chapter/${currentChapter - 1}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNextChapter = () => {
    if (currentChapter < 12) {
      navigate(`/chapter/${currentChapter + 1}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="flex justify-between items-center mt-12 mb-8 gap-3">
      {/* Previous Chapter Button */}
      <button
        onClick={handlePreviousChapter}
        disabled={currentChapter <= 1}
        className="w-full py-3 rounded-lg transition-all duration-200"
        style={{
          backgroundColor: currentChapter > 1 ? 'var(--theme-bg)' : 'transparent',
          color: currentChapter > 1 ? 'var(--theme-text)' : 'var(--theme-border)',
          border: '1px solid var(--theme-border)',
          fontSize: 'calc(var(--reading-text-size) * 0.9)',
          fontWeight: '600',
          opacity: currentChapter > 1 ? 1 : 0.5,
          cursor: currentChapter > 1 ? 'pointer' : 'not-allowed'
        }}
      >
        上一章
      </button>

      {/* Next Chapter Button */}
      <button
        onClick={handleNextChapter}
        disabled={currentChapter >= 12}
        className="w-full py-3 rounded-lg transition-all duration-200"
        style={{
          backgroundColor: currentChapter < 12 ? 'var(--theme-bg)' : 'transparent',
          color: currentChapter < 12 ? 'var(--theme-text)' : 'var(--theme-border)',
          border: '1px solid var(--theme-border)',
          fontSize: 'calc(var(--reading-text-size) * 0.9)',
          fontWeight: '600',
          opacity: currentChapter < 12 ? 1 : 0.5,
          cursor: currentChapter < 12 ? 'pointer' : 'not-allowed'
        }}
      >
        下一章
      </button>
    </div>
  )
}

export default ChapterNavigation
