import { LuCat } from 'react-icons/lu'

const FeedPanel = () => {
  return (
    <div>
      <div style={{ marginTop: '1.5rem' }}>
        {/* Cat Profile Section */}
        <div className="flex flex-col items-center gap-4 mb-6">
          {/* Cat Avatar */}
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ 
              backgroundColor: 'var(--theme-border)', 
              color: 'var(--theme-bg)' 
            }}
          >
            <LuCat size={56} />
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
              墨拉尼普斯
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
              一只黑猫，命运多舛。<br />
              如果您喜欢这个项目，可以请它吃小鱼干！
            </div>
          </div>
        </div>
        
        <hr style={{ margin: '1.5rem 0' }} />
        
        <p className="text-center" style={{ color: 'var(--theme-text)', fontSize: 'calc(var(--reading-text-size) * 1)' }}>
          感谢您的支持！
        </p>
      </div>
    </div>
  )
}

export default FeedPanel
