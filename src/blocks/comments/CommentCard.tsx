import React from 'react';
import commentsData from '../../data/comments.json';
import ThemeCard from '../../components/ThemeCard';
import { AiOutlineLike } from 'react-icons/ai';
import { BiMessageRounded } from 'react-icons/bi';

interface CommentData {
  id: string;
  textSelection: string;
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
  // Build a map of all comments by id for reply lookup
  const allComments: CommentData[] = (commentsData as Record<string, unknown>).comments as CommentData[] || [];
  const commentMap = new Map<string, CommentData>();
  allComments.forEach(c => commentMap.set(c.id, c));

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
        <div className="mb-2 leading-relaxed" style={{ fontSize: 'var(--reading-text-size)' }}>
          {comment.comment}
        </div>
        <div className="flex items-center gap-2 mt-1" style={{ color: 'var(--theme-border)', fontSize: 'calc(var(--reading-text-size) * 0.85)' }}>
          <span className="flex items-center gap-1"><AiOutlineLike /> {comment.likes}</span>
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
            // Support both array of reply IDs (string) and array of reply objects
            let replyObj: CommentReply | undefined = undefined;
            if (typeof reply === 'string') {
              replyObj = commentMap.get(reply);
            } else if (reply && typeof reply === 'object' && reply.id) {
              replyObj = reply;
            }
            if (!replyObj) return null;
            return (
              <div key={replyObj.id || idx} className="mb-2 p-2 rounded" style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)', fontSize: 'var(--reading-text-size)' }}>
                <div className="mb-1" style={{ fontSize: 'var(--reading-text-size)' }}>{replyObj.comment}</div>
                <div className="flex justify-between items-center" style={{ color: 'var(--theme-border)', fontSize: 'calc(var(--reading-text-size) * 0.85)' }}>
                  <span>{replyObj.author}</span>
                  <span className="flex items-center gap-1"><AiOutlineLike /> {replyObj.likes}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ThemeCard>
  );
};

export default CommentCard;
