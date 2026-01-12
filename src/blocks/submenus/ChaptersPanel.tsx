import BackToHomeButton from '../../components/BackToHomeButton'
import Book from '../../components/Book'

interface ChaptersPanelProps {
  onBackToHome: () => void
}

const ChaptersPanel = ({ onBackToHome }: ChaptersPanelProps) => {
  const handleBookClick = () => {
    // Navigate to home page
    window.location.href = '/'
  }

  return (
    <div className="py-8 relative">
      <BackToHomeButton onBackToHome={onBackToHome} />
      <h2 className="text-center mb-6 font-bold" style={{ color: 'var(--theme-text)', fontSize: 'calc(var(--reading-text-size) * 1.5)' }}>
        书架
      </h2>
      
      <div className="flex flex-col gap-6 px-4">
        <div 
          onClick={handleBookClick}
          className="cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity"
        >
          <Book 
            coverText="THEBAID"
            title="特拜之战"
            author="斯塔提乌斯"
            translator="唐诗榕，肖翔尹"
            status="in-progress"
          />
        </div>

        <hr/>《后荷马史诗》和《史诗循环》暂未开放，敬请期待！<hr/>
        

        <div 
          onClick={handleBookClick}
          className="cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity"
        >
          <Book 
            coverText="THE FALL OF TROY"
            title="后荷马史诗"
            author="昆图斯·斯米尔纳乌斯"
            status="not-started"
          />
        </div>

        <div 
          onClick={handleBookClick}
          className="cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity"
        >
          <Book 
            coverText="THE EPIC CYCLE"
            title="史诗循环"
            author="荷马"
            translator="王焕生"
            status="not-started"
          />
        </div>
      </div>
    </div>
  )
}

export default ChaptersPanel
