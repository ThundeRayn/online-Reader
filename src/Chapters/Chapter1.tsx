
import Para101 from "../Paragraphs/Para101"
import Para146 from "../Paragraphs/Para146"
import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"
import Processing from "../components/Processing"
import Para188 from "../Paragraphs/Para188"
import Para1114 from "../Paragraphs/Para1114"

const Chapter1 = () => {
  return (
    <div className="space-y-16">
        <ChapterTitle title="第一卷"/>
        <Para101 />
        
        <Para146 />
        
        <Para188 />

        <Para1114 />
        
<Processing />
        

        <ChapterNavigation currentChapter={1} />
    </div>
  )
}

export default Chapter1