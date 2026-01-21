import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import ThemeCard from '../../components/ThemeCard';
import Notification from '../../components/Notification';
import { AiOutlineLike } from 'react-icons/ai';
import { BiMessageRounded } from 'react-icons/bi';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

interface CommentData {
  id: string;
  textSelection: string;
  comment: string;
  author: string;
  timestamp: string;
  likes: number;
  replies: (CommentReply)[];
}

interface CommentReply {
  id: string;
  comment: string;
  author: string;
  timestamp: string;
  likes: number;
}

interface CommentCardProps {
  comment: CommentData;
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  const handleLikeClick = () => {
    setNotificationMessage('功能暂未开放~');
    setShowNotification(true);
  };
  
  const checkTruncation = (ref: HTMLDivElement | null) => {
    if (ref) {
      const lineHeight = parseFloat(window.getComputedStyle(ref).lineHeight);
      const height = ref.scrollHeight;
      const maxHeight = lineHeight * 6.5;
      setIsTruncated(height > maxHeight);
    }
  };

  return (
    <ThemeCard
      className="w-full p-4"
      style={{
        fontSize: 'var(--reading-text-size)',
        lineHeight: 'var(--reading-line-height)'
      }}
    >
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2" style={{ color: 'var(--theme-border)', fontSize: 'calc(var(--reading-text-size) * 0.85)' }}>
          <span>{comment.author}</span>
          <span>{formatTimestamp(comment.timestamp)}</span>
        </div>
        <div 
          ref={checkTruncation}
          className="mb-2 leading-relaxed overflow-hidden transition-all duration-500 ease-in-out" 
          style={{ 
            fontSize: 'var(--reading-text-size)', 
            whiteSpace: 'pre-wrap', 
            wordWrap: 'break-word',
            maxHeight: isExpanded ? 'none' : 'calc(var(--reading-text-size) * var(--reading-line-height) * 5.5)',
          }}
        >
          {comment.comment}
        </div>
        
        {/* Expand/Collapse button */}
        {isTruncated && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 mb-2 hover:opacity-70 transition-opacity"
            style={{ color: 'var(--theme-border)', fontSize: 'calc(var(--reading-text-size) * 0.85)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            {isExpanded ? (
              <>
                <MdExpandLess size={16} /> 收起
              </>
            ) : (
              <>
                <MdExpandMore size={16} /> 展开
              </>
            )}
          </button>
        )}
        
        <div className="flex items-center gap-2 mt-1" style={{ color: 'var(--theme-border)', fontSize: 'calc(var(--reading-text-size) * 0.85)' }}>
          <button 
            onClick={handleLikeClick}
            className="flex items-center gap-1 hover:opacity-70 transition-opacity"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--theme-border)' }}
          >
            <AiOutlineLike /> {comment.likes}
          </button>
          {Array.isArray(comment.replies) && comment.replies.length > 0 && (
            <span className="flex items-center gap-1"><BiMessageRounded /> {comment.replies.length} 回复</span>
          )}
        </div>
      </div>


      {/* Replies */}
      {Array.isArray(comment.replies) && comment.replies.length > 0 && (
        <div className="border-t pt-2 mt-2" style={{ borderColor: 'var(--theme-border)' }}>
          <div className="mb-2 font-medium" style={{ color: 'var(--theme-text)', fontSize: 'calc(var(--reading-text-size) * 0.9)' }}>
            回复:
          </div>
          {comment.replies.map((reply, idx) => {
            return (
              <div key={reply.id || idx} className="mb-2 p-2 rounded" style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)', fontSize: 'var(--reading-text-size)' }}>
                <div className="mb-1" style={{ fontSize: 'var(--reading-text-size)' }}>{reply.comment}</div>
                <div className="flex justify-between items-center" style={{ color: 'var(--theme-border)', fontSize: 'calc(var(--reading-text-size) * 0.85)' }}>
                  <span>{reply.author}</span>
                  <span className="flex items-center gap-1"><AiOutlineLike /> {reply.likes}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {showNotification && createPortal(
        <Notification 
          message={notificationMessage}
          duration={1500}
          onClose={() => setShowNotification(false)} 
        />,
        document.body
      )}
    </ThemeCard>
  );
};

export default CommentCard;
