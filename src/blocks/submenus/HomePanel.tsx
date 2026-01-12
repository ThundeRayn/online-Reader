import { GiSpartanHelmet } from 'react-icons/gi'
import Book from '../../components/Book'

const HomePanel = () => {
  return (
    <>
      {/* User Profile Section */}
      <div className="flex items-center gap-4 mb-6">
        {/* Avatar */}
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ 
            backgroundColor: 'var(--theme-border)', 
            color: 'var(--theme-bg)' 
          }}
        >
          <GiSpartanHelmet size={44} />
        </div>
        {/* User Info */}
        <div className="flex flex-col gap-1">
          <div 
            className="font-semibold" 
            style={{ 
              color: 'var(--theme-text)',
              fontSize: 'calc(var(--reading-text-size) * 1.2)'
            }}
          >
            无名
          </div>
          <div 
            className="opacity-70" 
            style={{ 
              color: 'var(--theme-text)',
              fontSize: 'calc(var(--reading-text-size) * 0.8)'
            }}
          >
            未登录
          </div>
        </div>
      </div>
      <hr/>
      
      {/* Book Info Section */}
      <div className="my-6">
        <div 
          className="mb-2" 
          style={{ 
            color: 'var(--theme-text)',
            fontSize: 'calc(var(--reading-text-size) * 0.65)'
          }}
        >
          你正在阅读
        </div>
        <Book 
          coverText="THEBAID"
          title="特拜之战"
          author="斯塔提乌斯"
          translator="唐诗榕，肖翔尹"
        />
      </div>
      <hr style={{ margin: 0 }}/>
    </>
  )
}

export default HomePanel
