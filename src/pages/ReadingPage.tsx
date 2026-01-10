import { useParams } from 'react-router-dom'
import Chapter1 from "../Chapters/Chapter1"
import Chapter2 from '../Chapters/Chapter2'
import Chapter3 from '../Chapters/Chapter3'
import Chapter4 from '../Chapters/Chapter4'
import Chapter5 from '../Chapters/Chapter5'
import Chapter6 from '../Chapters/Chapter6'
import Chapter7 from '../Chapters/Chapter7'
import Chapter8 from '../Chapters/Chapter8'
import Chapter9 from '../Chapters/Chapter9'
import Chapter10 from '../Chapters/Chapter10'
import Chapter11 from '../Chapters/Chapter11'
import Chapter12 from '../Chapters/Chapter12'
import Title from "../components/Title"

const ReadingPage = () => {
  const { chapterId } = useParams<{ chapterId: string }>()
  
  // Default to chapter 1 if no chapterId is specified
  const currentChapter = chapterId ? parseInt(chapterId) : 1

  // Render the appropriate chapter component based on the route
  const renderChapter = () => {
    switch (currentChapter) {
      case 1:
        return <Chapter1 />
      case 2:
        return <Chapter2 />
      case 3:
        return <Chapter3 />
      case 4:
        return <Chapter4 />
      case 5:
        return <Chapter5 />
      case 6:
        return <Chapter6 />
      case 7:
        return <Chapter7 />
      case 8:
        return <Chapter8 />
      case 9:
        return <Chapter9 />
      case 10:
        return <Chapter10 />
      case 11:
        return <Chapter11 />
      case 12:
        return <Chapter12 />
      default:
        return <Chapter1 />
    }
  }

  return (
    <div className='w-full h-full overflow-y-auto' style={{ padding: 'var(--reading-margin)' }}>
      <Title />
      <div className="flex flex-col gap-14">
        {renderChapter()}
      </div>
    </div>
  )
}

export default ReadingPage