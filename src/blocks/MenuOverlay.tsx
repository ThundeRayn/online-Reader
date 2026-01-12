import { useEffect, useState } from 'react'
import { GiSpartanHelmet  } from 'react-icons/gi'
import { LuMessageSquareMore } from "react-icons/lu";
import { LuCat } from "react-icons/lu";
import { PiBooks  } from "react-icons/pi";
import { AiOutlineInfoCircle } from 'react-icons/ai'
import ThemeCard from '../components/ThemeCard'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOpen && !shouldRender) {
      // First render the modal
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true)
    }
  }, [isOpen, shouldRender])

  useEffect(() => {
    if (shouldRender && isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAnimating(false)
      
      // Disable scrolling
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      
      // Then trigger animation after a brief delay
      const timer = setTimeout(() => {
        setIsAnimating(true)
      }, 20)
      
      return () => {
        document.body.style.overflow = original
        clearTimeout(timer)
      }
    } else if (shouldRender && !isOpen) {
      // Start closing animation
      setIsAnimating(false)
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 300) // Match transition duration
      return () => clearTimeout(timer)
    }
  }, [isOpen, shouldRender])

  if (!shouldRender) return null

  return (
    <div 
      className="fixed inset-0 z-[9998]"
      style={{
        opacity: isAnimating ? 1 : 0,
        transition: 'opacity 300ms ease-in-out',
      }}
    >
      {/* Transparent backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Menu Window */}
      <div 
        className="fixed top-1/2 left-1/2 z-[9999] w-full px-8"
        style={{
          transform: isAnimating 
            ? 'translate(-50%, -50%)' 
            : 'translate(-50%, calc(-50% + 100vh))',
          transition: 'transform 300ms ease-in-out',
        }}
      >
        <ThemeCard 
          style={{ 
            padding: '2rem',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
           }}
          onClick={(e) => e.stopPropagation()}
        >
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
            <div className="flex items-center gap-4">
              {/* Book Cover */}
              <div 
                className="w-16 h-20 flex items-center justify-center"
                style={{ 
                  backgroundColor: 'var(--theme-border)',
                  color: 'var(--theme-bg)',
                  fontSize: 'calc(var(--reading-text-size) * 0.7)',
                  fontWeight: 'bold',
                  padding: '0.5rem',
                  textAlign: 'center',
                  lineHeight: '1.2'
                }}
              >
                THEBAID
              </div>
              {/* Book Info */}
              <div className="flex flex-col gap-1">
                <div 
                  className="font-bold"
                  style={{ 
                    color: 'var(--theme-text)',
                    fontSize: 'calc(var(--reading-text-size) * 1.1)'
                  }}
                >
                  特拜之战
                </div>
                <div 
                  className="opacity-70"
                  style={{ 
                    color: 'var(--theme-text)',
                    fontSize: 'calc(var(--reading-text-size) * 0.7)'
                  }}
                >
                  [著] 斯塔提乌斯
                </div>
                <div 
                  className="opacity-70"
                  style={{ 
                    color: 'var(--theme-text)',
                    fontSize: 'calc(var(--reading-text-size) * 0.7)'
                  }}
                >
                  [译] 唐诗榕，肖翔尹
                </div>
              </div>
            </div>
          </div>

          
          <hr/>
          <nav className="flex justify-around items-center" style={{ paddingTop: '1.5rem' }}>
            <a 
              href="#" 
              className="hover:opacity-70 active:opacity-50 transition-opacity flex flex-col items-center gap-2"
              style={{ color: 'var(--theme-text)' }}
            >
              <LuCat size={28} />
              <span style={{ fontSize: 'calc(var(--reading-text-size) * 0.8)' }}>
                投喂</span>
            </a>
            <a 
              href="#" 
              className="hover:opacity-70 active:opacity-50 transition-opacity flex flex-col items-center gap-2"
              style={{ color: 'var(--theme-text)' }}
            >
              <PiBooks size={28} />
              <span style={{ fontSize: 'calc(var(--reading-text-size) * 0.8)' }}>
                书架</span>
            </a>
            <a 
              href="#" 
              className="hover:opacity-70 active:opacity-50 transition-opacity flex flex-col items-center gap-2"
              style={{ color: 'var(--theme-text)' }}
            >
              <AiOutlineInfoCircle size={28} />
              <span style={{ fontSize: 'calc(var(--reading-text-size) * 0.8)' }}>
                声明</span>
            </a>
            <a 
              href="#" 
              className="hover:opacity-70 active:opacity-50 transition-opacity flex flex-col items-center gap-2"
              style={{ color: 'var(--theme-text)' }}
            >
              <LuMessageSquareMore size={28} />
              <span style={{ fontSize: 'calc(var(--reading-text-size) * 0.8)' }}>
                反馈</span>
            </a>
          </nav>
        </ThemeCard>
      </div>
    </div>
  )
}

export default MenuOverlay
