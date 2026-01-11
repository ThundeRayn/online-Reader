
import Para101 from "../Paragraphs/Para101"
import Para146 from "../Paragraphs/Para146"
import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"

const Chapter1 = () => {
  return (
    <div className="space-y-16">
        <ChapterTitle title="第一卷"/>
        <Para101 />
        <Para146 />
        <ChapterNavigation currentChapter={1} />
    </div>
  )
}

export default Chapter1