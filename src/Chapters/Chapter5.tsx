import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"

const Chapter5 = () => {
  return (
    <div>
        <ChapterTitle title="第五卷"/>
        <p>字幕组还在赶工中...</p>
        <ChapterNavigation currentChapter={5} />
    </div>
  )
}

export default Chapter5
