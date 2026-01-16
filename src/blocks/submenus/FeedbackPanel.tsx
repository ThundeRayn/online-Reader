import { useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import Notification from '../../components/Notification'

const FeedbackPanel = () => {
  const [showNotification, setShowNotification] = useState(false)

  const handleCopyEmail = () => {
    const email = 'shirong@codura.studio'
    navigator.clipboard.writeText(email).then(() => {
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 2000)
    })
  }

  return (
    <div>
      {showNotification && (
        <Notification 
          message="已复制到剪贴板" 
          onClose={() => setShowNotification(false)} 
        />
      )}
      <div style={{ marginTop: '1.5rem', paddingBottom: '2rem' }}>
        <div className="text-center mb-6">
          <h3 style={{ 
            fontSize: 'calc(var(--reading-text-size) * 1.2)', 
            fontWeight: 'bold',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            反馈与建议
          </h3>
          <p style={{ 
            color: 'var(--theme-border)', 
            fontSize: 'calc(var(--reading-text-size) * 0.9)',
            marginBottom: '2rem',
            lineHeight: '1.6',
            fontFamily: 'monospace',
            letterSpacing: '0.05em'
          }}>
            shirong@codura.studio
          </p>
        </div>

        <button
              id="copy-email-button"
              onClick={handleCopyEmail}
              style={{
                width: '100%',
                padding: '0.8rem 1.2rem',
                marginBottom: '1rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: 'var(--theme-text)',
                color: 'var(--theme-bg)',
                fontSize: 'calc(var(--reading-text-size) * 0.95)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLButtonElement
                target.style.opacity = '0.85'
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLButtonElement
                target.style.opacity = '1'
              }}
            >
              <MdContentCopy size={18} />
              复制邮箱
            </button>

        {/* QQ Group Section */}
        <div style={{ maxWidth: '450px', margin: '0 auto' }}>
          {/*<div style={{
            padding: '2rem',
            borderRadius: '8px',
            backgroundColor: 'rgba(var(--theme-text-rgb, 0, 0, 0), 0.02)',
            border: '1px solid var(--theme-border)',
            textAlign: 'center'
          }}>
            <div style={{
              marginBottom: '1.5rem'
            }}>
              <p style={{
                color: 'var(--theme-text)',
                fontSize: 'calc(var(--reading-text-size) * 0.95)',
                marginBottom: '0.8rem'
              }}>
                尾书的讨论群
              </p>
              <div style={{
                fontSize: 'calc(var(--reading-text-size) * 1.8)',
                fontWeight: 'bold',
                color: 'var(--theme-text)',
                marginBottom: '1rem',
                fontFamily: 'monospace',
                letterSpacing: '0.1em'
              }}>
                123456789
              </div>
              <p style={{
                color: 'var(--theme-border)',
                fontSize: 'calc(var(--reading-text-size) * 0.85)',
                marginBottom: '1.5rem'
              }}>
                点击下方复制群号后，用QQ扫描二维码加入群聊
              </p>
            </div>

            // Copy Button 
            <button
              onClick={handleCopyQQ}
              style={{
                width: '100%',
                padding: '0.8rem 1.2rem',
                marginBottom: '1rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: 'var(--theme-text)',
                color: 'var(--theme-bg)',
                fontSize: 'calc(var(--reading-text-size) * 0.95)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.85'
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1'
              }}
            >
              复制群号
            </button>

            // QR Code Placeholder
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto',
              borderRadius: '6px',
              border: '2px dashed var(--theme-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--theme-bg)',
              color: 'var(--theme-border)',
              fontSize: 'calc(var(--reading-text-size) * 0.8)'
            }}>
              QR Code
            </div>

            <p style={{
              color: 'var(--theme-border)',
              fontSize: 'calc(var(--reading-text-size) * 0.75)',
              marginTop: '1rem'
            }}>
              QQ群二维码
            </p>
          </div>*/}

          {/*Info Section*/}
          <div style={{
            marginTop: '2rem',
            padding: '1.2rem',
            borderRadius: '6px',
            border: '1px solid var(--theme-border)',
            backgroundColor: 'rgba(var(--theme-text-rgb, 0, 0, 0), 0.01)'
          }}>
            <p style={{
              color: 'var(--theme-text)',
              fontSize: 'calc(var(--reading-text-size) * 0.9)',
              marginBottom: '0.8rem',
              fontWeight: '500'
            }}>
              💬 这是我的个人邮箱
            </p>

            <p
            style={{
              color: 'var(--theme-text)',
              fontSize: 'calc(var(--reading-text-size) * 0.8)',
              marginBottom: '0.8rem',
              fontWeight: '500'
            }}>
              欢迎
            </p>
            <ul style={{
              listStyle: 'none',
              padding: '0',
              margin: '0',
              color: 'var(--theme-border)',
              fontSize: 'calc(var(--reading-text-size) * 0.85)',
              lineHeight: '1.8'
            }}>
              <li>• 讨论故事内容和人物</li>
              <li>• 分享您的想法和理解</li>
              <li>• 提出改进建议</li>
              <li>• 报告任何技术问题</li>
            </ul>
          </div>

          {/* Warning Message */}
          <div style={{
            marginTop: '1.5rem',
            textAlign: 'center'
          }}>
            <p style={{
              color: 'var(--theme-border)',
              fontSize: 'calc(var(--reading-text-size) * 0.85)',
              fontStyle: 'italic',
              display: 'inline-block',
              padding: '0.6rem 1rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(var(--theme-text-rgb, 0, 0, 0), 0.02)',
              border: '1px solid var(--theme-border)'
            }}>
              对于骚扰、辱骂或恶意内容，将不予回复并保留相关记录。
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default FeedbackPanel
