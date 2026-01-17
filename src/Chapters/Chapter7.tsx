import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"

const Chapter7 = () => {
  return (
    <div>
        <ChapterTitle title="第七卷"/>
        <p>你也想看看猫吗？</p>
        <ChapterNavigation currentChapter={7} />
    </div>
  )
}

export default Chapter7
