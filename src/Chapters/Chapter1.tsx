
import Para101 from "../Paragraphs/Para101"
import Para146 from "../Paragraphs/Para146"
import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"
import Processing from "../components/Processing"
import Para188 from "../Paragraphs/Para188"
import Para1114 from "../Paragraphs/Para1114"
import Para1164 from "../Paragraphs/Para1164"
import Para1123 from "../Paragraphs/Para1123"
import Para1197 from "../Paragraphs/Para1197"
import Para1248 from "../Paragraphs/Para1248"
import Para1283 from "../Paragraphs/Para1283"


const Chapter1 = () => {
  return (
    <div className="space-y-16">
        <ChapterTitle title="第一卷"/>
        <Para101 />
        <Para146 />
        <Para188 />
        <Para1114 />
        <Para1123 />
        <Para1164 />
        <Para1197 />
        <Para1248 />
<Processing />
        <Para1283/>
        
        
        <ChapterNavigation currentChapter={1} />
    </div>
  )
}

export default Chapter1