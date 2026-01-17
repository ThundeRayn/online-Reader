import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"

const Chapter3 = () => {
  return (
    <div>
        <ChapterTitle title="第三卷"/>
        <p>翻译组还在讨论中...</p>
        <ChapterNavigation currentChapter={3} />
    </div>
  )
}

export default Chapter3
