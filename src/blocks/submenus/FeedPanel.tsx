

const FeedPanel = () => {
  return (
    <div>
      <div style={{ marginTop: '1.5rem' }}>
        {/* Cat Profile Section */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div 
          className="mb-2 text-center" 
          style={{ 
            color: 'var(--theme-text)',
            fontSize: 'calc(var(--reading-text-size) * 0.65)'
          }}
        >
          如果您喜欢这个项目，<br />可以请她吃小鱼干！
        </div>

          {/* Cat Avatar */}
          <div 
            className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center"
            style={{ 
              border: '1px solid var(--theme-border)',
            }}
          >
            <img 
              src="https://res.cloudinary.com/dqj2gwlpf/image/upload/v1768251200/wei_phd_yvj1j3.jpg" 
              alt="尾博士"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          
          {/* Cat Info */}
          <div className="text-center">
            <div 
              className="font-bold mb-2" 
              style={{ 
                color: 'var(--theme-text)',
                fontSize: 'calc(var(--reading-text-size) * 1.3)'
              }}
            >
              尾博士
            </div>
            <div 
              className="opacity-80 leading-relaxed" 
              style={{ 
                color: 'var(--theme-text)',
                fontSize: 'calc(var(--reading-text-size) * 0.9)',
                maxWidth: '400px',
                margin: '0 auto'
              }}
            >
              罐头也曾来过尾的肚子
            </div>

            {/* Cat Bio Title */}
            <div 
              className="font-semibold mt-4 mb-2" 
              style={{ 
                color: 'var(--theme-text)',
                fontSize: 'calc(var(--reading-text-size) * 1)',
              }}
            >
              个猫简介
            </div>

            {/* Cat Bio Content */}
            <div 
              className="opacity-80 leading-relaxed" 
              style={{ 
                color: 'var(--theme-text)',
                fontSize: 'calc(var(--reading-text-size) * 0.85)',
                maxWidth: '400px',
                margin: '0 auto',
                textAlign: 'justify',
              }}
            >
              尾尾曾经是猫星赫赫有名的博导，手下带有数个研究生和博士生。带着对人类研究课题的好奇心，尾博士来到地球，有一天，尾尾因为冷静与果敢的品质得到了雅典娜的赏识，然而尾尾竟然和艾瑞斯的猫厮混在了一起。雅典娜经过仔细检查，发现尾尾的智慧没有经过地球审批流程，属于非法滞留的智慧。尾尾的行为引起了雅典娜的震怒，雅典娜决定惩罚尾尾，让她失去非法的智慧，还给她设置了每月理智额度。从此，尾博士变成一只普通的猫，化名为尾尾，在人类的家里流浪，时不时还会失去理智，用力啃咬自己的主人。
            </div>
          </div>
        </div>
        
        <hr style={{ margin: '1.5rem 0' }} />
        
        <p className="text-center" style={{ color: 'var(--theme-text)', fontSize: 'calc(var(--reading-text-size) * 1)' }}>
          我们郑重向您承诺，一切打赏所得都将进入猫的嘴巴
        </p>
        <br/>
      </div>
    </div>
  )
}

export default FeedPanel
