import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"

const Chapter8 = () => {
  return (
    <div>
        <ChapterTitle title="第八卷"/>
        
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <img 
            src="https://res.cloudinary.com/dqj2gwlpf/image/upload/v1768251205/wei_octpus_yodtkk.jpg" 
            alt="Chapter 8 illustration"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        <p>只见那黑布隆冬之子，来自极寒之地的黑猫纵身跃入深渊，胆敢直面波塞冬的怒涛，即使身形矮小，也没有尾巴做平衡，尾尾的肩膀却无比宽阔，精神超过任何一只勇武的猫咪，即使是可怖的斯芬克斯也要对尾尾心生敬畏！海神挥舞三叉戟，惊涛骇浪如同世界末日般席卷而来，而尾尾在水中如风般穿梭，灵巧而无畏。就在她反抗汹涌的吹风机之时，尾尾用上自己被赫尔墨斯亲吻过得脚爪，逃离神明的惩罚，头顶一只怨毒的章鱼，缓缓浮出水面，有如胜利女神骑在尾尾的背上庆祝这凯旋。想必，你也已经被这震撼天地的画面迷住了吧。</p>
        <ChapterNavigation currentChapter={8} />
    </div>
  )
}

export default Chapter8
