import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"

const Chapter10 = () => {
  return (
    <div>
        <ChapterTitle title="第十卷"/>
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <img 
            src="https://res.cloudinary.com/dqj2gwlpf/image/upload/v1768251205/wei_elegant_acjnq5.jpg" 
            alt="Chapter 10 illustration"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        <p>战斗就这样疲惫了黑布隆冬之子勇敢的心灵，使得她湿漉漉的毛发在阳光下闪烁，肩膀宽阔如远古战士般不可侵犯。她于是轻轻交叠双脚，动作优雅如黑色毛担，每一次轻抖胡须都像是战鼓低鸣，肩膀仍宽阔而不可侵犯。然而当尾尾的目光锁定前方的女猫，她的心灵却为自己身上的章鱼味而羞愧起来：她用爪子小心地涂上橄榄油，毛发瞬间蓬松如黑色战袍，肩膀显得更加宽阔威严，仿佛一位远古战士在为战斗整装。</p>
        <ChapterNavigation currentChapter={10} />
    </div>
  )
}

export default Chapter10
