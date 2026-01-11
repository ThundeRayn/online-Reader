import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"

const Chapter3 = () => {
  return (
    <div>
        <ChapterTitle title="第三卷"/>
        <p>字幕组还在赶工中...</p>
        <ChapterNavigation currentChapter={3} />
    </div>
  )
}

export default Chapter3
