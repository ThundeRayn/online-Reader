import { useState } from 'react'
import Notification from '../../components/Notification'

const FeedPanel = () => {
  const [showPaymentNotification, setShowPaymentNotification] = useState(false)
  const [showCueNotification, setShowCueNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  const handlePaymentClick = () => {
    setNotificationMessage('尚未开放支付哦~')
    setShowPaymentNotification(true)
    setTimeout(() => setShowPaymentNotification(false), 3000)
  }

  const handleCueClick = () => {
    setNotificationMessage('已催更')
    setShowCueNotification(true)
    setTimeout(() => setShowCueNotification(false), 3000)
  }

  return (
    <div>
      {showPaymentNotification && (
        <Notification 
          message={notificationMessage} 
          onClose={() => setShowPaymentNotification(false)} 
        />
      )}
      {showCueNotification && (
        <Notification 
          message={notificationMessage} 
          onClose={() => setShowCueNotification(false)} 
        />
      )}
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

          {/* Cat Avatars with Arrow */}
          <div className="flex items-center gap-3">
            {/* 尾博士 */}
            <div className="flex flex-col items-center">
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
              <div 
                className="mt-2 font-bold text-center" 
                style={{ 
                  color: 'var(--theme-text)',
                  fontSize: 'calc(var(--reading-text-size) * 0.9)'
                }}
              >
                尾博士
              </div>
            </div>

            {/* Arrow */}
            <div 
              style={{ 
                color: 'var(--theme-text)',
                fontSize: 'calc(var(--reading-text-size) * 1.5)',
                opacity: 0.6,
                marginBottom: '1.5rem'
              }}
            >
              →
            </div>

            {/* 尾尾 */}
            <div className="flex flex-col items-center">
              <div 
                className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center"
                style={{ 
                  border: '1px solid var(--theme-border)',
                }}
              >
                <img 
                  src="https://res.cloudinary.com/dqj2gwlpf/image/upload/c_fill,g_north,w_300,h_300,z_1.5,y_-20/v1768251208/wei_laydown_dsm1ko.jpg" 
                  alt="尾尾"
                  style={{
                    width: '140%',
                    height: '140%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div 
                className="mt-2 font-bold text-center" 
                style={{ 
                  color: 'var(--theme-text)',
                  fontSize: 'calc(var(--reading-text-size) * 0.9)'
                }}
              >
                尾尾
              </div>
            </div>
          </div>
          
          {/* Cat Info */}
          <div className="text-center">
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
              尾尾曾经是猫星赫赫有名的博导，手下带有数个研究生和博士生。带着对人类研究课题的好奇心，尾博士来到了地球。有一天，尾尾因为冷静与果敢的品质得到了雅典娜的赏识，然而尾尾竟然和艾瑞斯的猫厮混在了一起。雅典娜经过仔细检查，发现尾尾的智慧没有经过地球审批流程，属于非法滞留的智慧。尾尾的行为引起了雅典娜的震怒，雅典娜决定惩罚尾尾，剥夺了尾尾的智慧，还给她设置了每月理智额度。从此，尾博士变成一只普通的猫，化名为尾尾，在人类的家里流浪，时不时还会失去理智，用力啃咬自己的主人。
            </div>
          </div>
        </div>
        
        <hr style={{ margin: '1.5rem 0' }} />
        
        <p className="text-center" style={{ color: 'var(--theme-text)', fontSize: 'calc(var(--reading-text-size) * 1)' }}>
          我们郑重向您承诺，一切打赏所得都将进入猫的嘴巴
        </p>
        <br/>

        {/* Payment Info Section */}
        <div className="flex flex-col items-center gap-4">
          <div 
            className="font-semibold" 
            style={{ 
              color: 'var(--theme-text)',
              fontSize: 'calc(var(--reading-text-size) * 1.1)',
            }}
          >
            打赏方式
          </div>
          
          <div className="flex flex-col gap-3 w-full max-w-md">
            {/* 点击催更 */}
            <div 
              className="flex items-center px-4 py-3"
              style={{
                borderRadius: '8px',
                backgroundColor: 'var(--theme-bg)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <span style={{ 
                color: 'var(--theme-text)', 
                fontSize: 'calc(var(--reading-text-size) * 0.9)',
                whiteSpace: 'nowrap'
              }}>
                免费
              </span>
              <span style={{
                flex: 1,
                margin: '0 0.5rem',
                color: 'var(--theme-border)',
                fontSize: 'calc(var(--reading-text-size) * 0.9)',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'clip',
                borderBottom: '2px dotted currentColor',
                display: 'inline-block',
                height: '0.6em',
                verticalAlign: 'middle'
              }}>
              </span>
              <button
                onClick={handleCueClick}
                style={{
                  padding: '0.5rem 1.2rem',
                  borderRadius: '6px',
                  border: '1px solid var(--theme-border)',
                  backgroundColor: 'var(--theme-bg)',
                  color: 'var(--theme-text)',
                  fontSize: 'calc(var(--reading-text-size) * 0.85)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.7'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                催更
              </button>
            </div>

            {/* 5元档 */}
            <div 
              className="flex items-center px-4 py-3"
              style={{
                borderRadius: '8px',
                backgroundColor: 'var(--theme-bg)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <span style={{ 
                color: 'var(--theme-text)', 
                fontSize: 'calc(var(--reading-text-size) * 0.9)',
                whiteSpace: 'nowrap'
              }}>
                冻干
              </span>
              <span style={{
                flex: 1,
                margin: '0 0.5rem',
                color: 'var(--theme-border)',
                fontSize: 'calc(var(--reading-text-size) * 0.9)',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'clip',
                borderBottom: '2px dotted currentColor',
                display: 'inline-block',
                height: '0.6em',
                verticalAlign: 'middle'
              }}>
              </span>
              <button
                onClick={handlePaymentClick}
                style={{
                  padding: '0.5rem 1.2rem',
                  borderRadius: '6px',
                  border: '1px solid var(--theme-border)',
                  backgroundColor: 'var(--theme-bg)',
                  color: 'var(--theme-text)',
                  fontSize: 'calc(var(--reading-text-size) * 0.85)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.7'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                支持
              </button>
            </div>

            {/* 15元档 */}
            <div 
              className="flex items-center px-4 py-3"
              style={{
                borderRadius: '8px',
                backgroundColor: 'var(--theme-bg)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <span style={{ 
                color: 'var(--theme-text)', 
                fontSize: 'calc(var(--reading-text-size) * 0.9)',
                whiteSpace: 'nowrap'
              }}>
                罐头
              </span>
              <span style={{
                flex: 1,
                margin: '0 0.5rem',
                color: 'var(--theme-border)',
                fontSize: 'calc(var(--reading-text-size) * 0.9)',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'clip',
                borderBottom: '2px dotted currentColor',
                display: 'inline-block',
                height: '0.6em',
                verticalAlign: 'middle'
              }}>
              </span>
              <button
                onClick={handlePaymentClick}
                style={{
                  padding: '0.5rem 1.2rem',
                  borderRadius: '6px',
                  border: '1px solid var(--theme-border)',
                  backgroundColor: 'var(--theme-bg)',
                  color: 'var(--theme-text)',
                  fontSize: 'calc(var(--reading-text-size) * 0.85)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.7'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                支持
              </button>
            </div>

            {/* 30元档 */}
            <div 
              className="flex items-center px-4 py-3"
              style={{
                borderRadius: '8px',
                backgroundColor: 'var(--theme-bg)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <span style={{ 
                color: 'var(--theme-text)', 
                fontSize: 'calc(var(--reading-text-size) * 0.9)',
                whiteSpace: 'nowrap'
              }}>
                豪华生骨肉
              </span>
              <span style={{
                flex: 1,
                margin: '0 0.5rem',
                color: 'var(--theme-border)',
                fontSize: 'calc(var(--reading-text-size) * 0.9)',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'clip',
                borderBottom: '2px dotted currentColor',
                display: 'inline-block',
                height: '0.6em',
                verticalAlign: 'middle'
              }}>
              </span>
              <button
                onClick={handlePaymentClick}
                style={{
                  padding: '0.5rem 1.2rem',
                  borderRadius: '6px',
                  border: '1px solid var(--theme-border)',
                  backgroundColor: 'var(--theme-bg)',
                  color: 'var(--theme-text)',
                  fontSize: 'calc(var(--reading-text-size) * 0.85)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.7'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                支持
              </button>
            </div>
          </div>
        </div>
        <br/>
      </div>
    </div>
  )
}

export default FeedPanel
