import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { BiMessageRounded } from 'react-icons/bi';
import { MdContentCopy } from 'react-icons/md';
import { HiOutlinePencil } from 'react-icons/hi';
import CommentCard from './CommentCard';
import ThemeCard from './ThemeCard';


interface CommentData {
  id: string;
  textSelection: string;
  startOffset: number;
  endOffset: number;
  comment: string;
  author: string;
  timestamp: string;
  likes: number;
  replies: (string | CommentReply)[];
}

interface CommentReply {
  id: string;
  comment: string;
  author: string;
  timestamp: string;
  likes: number;
}

interface CommentModalProps {
  open: boolean;
  onClose: () => void;
  comments?: CommentData[];
}


const renderCommentContent = (comments: CommentData[] = []) => {
  if (!comments.length) return <div className="p-4">暂无评论</div>;

  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};


const CommentModal: React.FC<CommentModalProps> = ({ open, onClose, comments = [] }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [overscrollOffset, setOverscrollOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      // First render the modal
      setShouldRender(true);
      setIsAnimating(false);
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      // Then trigger animation after a brief delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 20);
      
      return () => { 
        document.body.style.overflow = original;
        clearTimeout(timer);
      };
    } else {
      // Start closing animation
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Handle overscroll bounce effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isAnimating = false;
    let touchStartY = 0;
    let lastTouchY = 0;

    const handleWheel = (e: WheelEvent) => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      
      const scrollingUp = e.deltaY < 0;
      const scrollingDown = e.deltaY > 0;

      // If at top and trying to scroll up, or at bottom and trying to scroll down
      if ((isAtTop && scrollingUp) || (isAtBottom && scrollingDown)) {
        if (!isAnimating) {
          isAnimating = true;
          // Pull in the direction of scroll (down when scrolling up at top, up when scrolling down at bottom)
          const delta = scrollingUp ? 30 : -30;
          setOverscrollOffset(delta);
          
          // Bounce back smoothly
          setTimeout(() => {
            setOverscrollOffset(0);
            setTimeout(() => {
              isAnimating = false;
            }, 200);
          }, 200);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      lastTouchY = touchStartY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - lastTouchY;
      
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      
      const scrollingUp = deltaY > 0;
      const scrollingDown = deltaY < 0;

      // If at top and trying to scroll up, or at bottom and trying to scroll down
      if ((isAtTop && scrollingUp) || (isAtBottom && scrollingDown)) {
        if (!isAnimating) {
          isAnimating = true;
          // Pull in the direction of scroll
          const delta = scrollingUp ? 30 : -30;
          setOverscrollOffset(delta);
          
          // Bounce back smoothly
          setTimeout(() => {
            setOverscrollOffset(0);
            setTimeout(() => {
              isAnimating = false;
            }, 200);
          }, 200);
        }
      }
      
      lastTouchY = currentY;
    };

    container.addEventListener('wheel', handleWheel);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  // Get selectedText from the first comment (all comments share the same selectedText)
  const selectedText = comments[0]?.textSelection || '';


  return createPortal(
    <div
      className="flex flex-col items-center gap-4"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99999,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: '5vh',
        opacity: isAnimating ? 1 : 0,
        transition: 'opacity 300ms ease-in-out',
      }}
    >
      {/* Selected Text Container at top */}
      {selectedText && (
          <div className="w-full px-4 flex justify-center">
            <ThemeCard
              onClick={(e) => e.stopPropagation()}
              style={{
                padding: '1rem 1rem',
                fontWeight: 600,
                fontSize: 'calc(var(--reading-text-size) * 1.1)',
                letterSpacing: '0.04em',
                width: '100%',
                textAlign: 'center',
                margin: 0,
                display: 'block',
                height: 'auto',
                transform: isAnimating ? 'translateY(0)' : 'translateY(-100%)',
                transition: 'transform 300ms ease-in-out',
              }}
            >
              <span className="text-(--theme-border) font-medium text-[calc(var(--reading-text-size)*0.75)]">选中文本</span><br />
              <span className="text-(--theme-text) font-semibold pb-4 block">&quot;{selectedText}&quot;</span>

              <hr/>
              <div className="flex justify-between px-8 pt-3">
                {/* Comment Icon */}
                <button type="button" className="hover:opacity-70 transition-opacity flex items-center gap-2" onClick={() => {}}>
                  <BiMessageRounded size={24} style={{ color: 'var(--theme-border)' }} />
                </button>
                {/* Copy Icon */}
                <button type="button" className="hover:opacity-70 transition-opacity flex items-center gap-2" onClick={() => {navigator.clipboard.writeText(selectedText);}}>
                  <MdContentCopy size={24} style={{ color: 'var(--theme-border)' }} />
                </button>
                {/* Highlight Icon */}
                <button type="button" className="hover:opacity-70 transition-opacity flex items-center gap-2" onClick={() => {}}>
                  <HiOutlinePencil size={24} style={{ color: 'var(--theme-border)' }} />
                </button>
              </div>
            </ThemeCard>
          </div>
      )}
      {/* Comments displayed below */}
      <div className="w-full px-4 flex justify-center" onClick={onClose}>
        <div
          ref={containerRef}
          id="container-container"
          className="flex flex-col"
          style={{
            color: "var(--theme-text, #222)",
            border: "0px solid var(--theme-border, #e0e0e0)",
            borderRadius: 18,
            boxShadow: "0 8px 48px rgba(0,0,0,0.18)",
            padding: '1.5rem 0rem 0rem 0rem',
            width: '100%',
            flex: 1,
            minHeight: 0,
            maxHeight: '80vh',
            paddingBottom: '25vh',
            position: "relative",
            overflowY: "auto",
            marginBottom: 0,
            transform: isAnimating ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 300ms ease-in-out',
          }}
        >
        <div 
          onClick={(e) => e.stopPropagation()}
          style={{
            transform: `translateY(${overscrollOffset}px)`,
            transition: overscrollOffset !== 0 
              ? 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)' 
              : 'transform 0ms',
          }}
        >
        {renderCommentContent(comments)}
        </div>
        </div>
      </div>

        {/* Close Button */}
        <button
          style={{
            position: "fixed",
            left: '50%',
            bottom: 36,
            transform: 'translateX(-50%)',
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'var(--theme-bg, #fff)',
            color: 'var(--theme-border, #888)',
            border: '2px solid var(--theme-border, #e0e0e0)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            fontSize: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 100000,
            transition: 'background 0.2s, color 0.2s',
          }}
          onClick={onClose}
          aria-label="关闭评论"
          onMouseOver={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--theme-border, #e0e0e0)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--theme-bg, #fff)';
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--theme-bg, #fff)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--theme-border, #888)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{display:'block'}}>
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </button>
    </div>,
    document.body
  );
};


export default CommentModal;
