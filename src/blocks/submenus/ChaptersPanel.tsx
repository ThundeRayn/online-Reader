import { useState } from 'react'
import Book from '../../components/Book'
import Notification from '../../components/Notification'


const ChaptersPanel = () => {
  const [notification, setNotification] = useState<{ message: string; show: boolean }>({ 
    message: '', 
    show: false 
  })

  const handleBookClick = (bookTitle: string) => {
    if (bookTitle === '忒拜之战') {
      //window.location.href = '/'
      setNotification({ 
        message: `还在翻译中~`, 
        show: true 
      })
    } else {
      setNotification({ 
        message: `真的没有人翻译吗？？？`, 
        show: true 
      })
    }
  }

  return (
    <div>
      
      <div className="flex flex-col gap-6 px-2" style={{ marginTop: '1.5rem' }}>
        <div 
          onClick={() => handleBookClick('忒拜之战')}
          className="cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity"
        >
          <Book 
            coverText="THEBAID"
            title="忒拜之战"
            author="斯塔提乌斯"
            translator="唐诗榕，肖翔尹"
            status="in-progress"
            description='《忒拜之战》（Thebaid）是罗马诗人斯塔提乌斯（Statius）创作的史诗，共十二卷，讲述希腊神话中忒拜之战的全过程。故事围绕俄狄浦斯之子厄忒俄克勒斯与波吕涅刻斯为王位反目成仇展开，最终引发阿尔戈斯七英雄远征忒拜。史诗描写了神祇的干预、人类的疯狂、亲族相残的悲剧，以及战争带来的全面毁灭。全诗以黑暗、暴烈和宿命感著称，重点刻画战争的残酷与权力欲望对人的吞噬，是罗马文学中最阴郁、最具张力的英雄史诗之一。'
          />
        </div>

        <hr/>以下是我个人也没找到中译版但很推荐的书单<hr/>
        

        <div 
          onClick={() => handleBookClick('后荷马史诗')}
          className="cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity"
        >
          <Book 
            coverText="THE FALL OF TROY"
            title="后荷马史诗"
            author="昆图斯·斯米尔纳乌斯"
            status="not-started"
            description='《特洛伊的陷落》又被称作《后荷马史诗》是希腊诗人昆图斯·士每尔奈乌斯创作的史诗，共十四卷，承接《伊利亚特》。作品描写阿喀琉斯之死、亚马孙女王彭忒西勒亚与墨姆农参战、菲洛克忒忒斯被接回并射杀帕里斯，直至木马计成功与特洛伊城的最终陷落，系统补全了特洛伊战争的结局。'
          />
        </div>

        <div 
          onClick={() => handleBookClick('史诗循环')}
          className="cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity"
        >
          <Book 
            coverText="THE EPIC CYCLE"
            title="史诗循环"
            author="马尔科姆·戴维斯"
            status="not-started"
            description='在荷马的《伊利亚特》和《奥德赛》之后，公元前七至六世纪的诗人又创作了一系列史诗，讲述特洛伊战争的其他阶段及希腊神话的不同领域。虽然这些作品大多已经失传，但后世作家的引文与摘要使我们得以重构其部分内容。亚历山大里亚时期的学者将这些作品统称为“史诗循环”，其中包括《塞普利亚》《埃塞俄比亚》《小伊利亚特》《伊利昂陷落》《归返诗》和《忒勒戈尼亚》等。'
          />
        </div>
      </div>

      <br></br>

      {/* Notification */}
      {notification.show && (
        <Notification 
          message={notification.message} 
          duration={2000}
          onClose={() => setNotification({ message: '', show: false })}
        />
      )}
    </div>
  )
}

export default ChaptersPanel
