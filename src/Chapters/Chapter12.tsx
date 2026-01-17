import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"

const Chapter12 = () => {
  return (
    <div>
        <ChapterTitle title="第十二卷"/>
        <p>第十二章，尾尾与亲生女儿的宿命争斗。由于女儿的缺席，我们暂时没有经费开拍，主要是尾尾生完之后，也忘了小孩都去哪了。真是英雄难顾家啊！</p>

        <br/>
        <p>不好意思，这个不是斯塔提乌斯写的</p>
        <ChapterNavigation currentChapter={12} />
    </div>
  )
}

export default Chapter12
