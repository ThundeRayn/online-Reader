import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"

const Chapter5 = () => {
  return (
    <div>
        <ChapterTitle title="第五卷"/>
        <p>翻译组正在思考中...</p>
        <ChapterNavigation currentChapter={5} />
    </div>
  )
}

export default Chapter5
