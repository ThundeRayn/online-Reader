import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"

const Chapter2 = () => {
  return (
    <div>
        <ChapterTitle title="第二卷"/>
        <p>翻译组还在赶工中...</p>
        <ChapterNavigation currentChapter={2} />
    </div>
  )
}

export default Chapter2