import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"

const Chapter10 = () => {
  return (
    <div>
        <ChapterTitle title="第十卷"/>
        <p>字幕组还在赶工中...</p>
        <ChapterNavigation currentChapter={10} />
    </div>
  )
}

export default Chapter10
