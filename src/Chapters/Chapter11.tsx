import ChapterTitle from "./ChapterTitle"
import ChapterNavigation from "../components/ChapterNavigation"

const Chapter11 = () => {
  return (
    <div>
        <ChapterTitle title="第十一卷"/>
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <img 
            src="https://res.cloudinary.com/dqj2gwlpf/image/upload/v1768251205/wei_disabled_zc8nwf.jpg" 
            alt="Chapter 11 illustration"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        <p>然而命运三女神却没有向尾尾倾斜。就在她妖娆与威严并存的瞬间，那位女猫突然消失，甜美的声音也随风而去，仿佛从未存在。尾尾的眼神瞬间凝固，毛发微颤，肩膀再宽也难以承受这突如其来的失落。原来，这是人类的诡计——赫菲斯托斯制作的的精美小长方黑盒，将虚假的画面与声音投射出来，巧妙地蛊惑了尾尾的心神。尾尾在惊愕中被抓起，裹进抹布，像一位被命运之手挟持的史诗英雄。接下来，是尾尾最不愿面对的试炼——剪指甲。即便是肩膀宽阔如远古战士、眼神炯炯有神的黑布隆冬之子，也只能无奈面对这残酷而荒谬的命运。</p>
        <ChapterNavigation currentChapter={11} />
    </div>
  )
}

export default Chapter11
