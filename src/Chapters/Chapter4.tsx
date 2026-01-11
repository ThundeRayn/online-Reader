import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"

const Chapter4 = () => {
  return (
    <div>
        <ChapterTitle title="第四卷"/>
        <p>字幕组还在赶工中...</p>
        <ChapterNavigation currentChapter={4} />
    </div>
  )
}

export default Chapter4
