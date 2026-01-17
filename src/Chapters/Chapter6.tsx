import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"

const Chapter6 = () => {
  return (
    <div>
        <ChapterTitle title="第六卷"/>
        <p>翻译组要睡觉了。</p>
        <ChapterNavigation currentChapter={6} />
    </div>
  )
}

export default Chapter6
