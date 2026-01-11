
import React, { useEffect } from "react";
import commentsData from '../data/comments.json';
import { createPortal } from "react-dom";

interface CommentData {
  id: string;
  textSelection: string;
  startOffset: number;
  endOffset: number;
  comment: string;
  author: string;
  timestamp: string;
  likes: number;
  replies: CommentReply[];
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

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const renderCommentContent = (comments: CommentData[] = []) => {
  if (!comments.length) return <div className="p-4">暂无评论</div>;
  // Build a map of all comments by id for reply lookup
  const allComments: CommentData[] = (commentsData as any).comments || [];
  const commentMap = new Map<string, CommentData>();
  allComments.forEach(c => commentMap.set(c.id, c));

  return (
    <div className="flex flex-col gap-6">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="max-w-sm p-4 rounded shadow-lg"
          style={{
            color: 'var(--theme-text)',
            background: 'var(--theme-bg)',
            border: '1.5px solid var(--theme-border)',
            boxShadow: '0 8px 48px rgba(0,0,0,0.18)',
            fontSize: 'var(--reading-text-size)',
            lineHeight: 'var(--reading-line-height)'
          }}
        >
          <div className="mb-3">
            <div className="font-medium mb-1" style={{ color: 'var(--theme-text)', fontSize: 'calc(var(--reading-text-size) * 0.95)' }}>
              选中文本: "{comment.textSelection}"
            </div>
            <div className="mb-2 leading-relaxed" style={{ fontSize: 'var(--reading-text-size)' }}>
              {comment.comment}
            </div>
            <div className="flex justify-between items-center" style={{ color: 'var(--theme-border)', fontSize: 'calc(var(--reading-text-size) * 0.85)' }}>
              <span>{comment.author}</span>
              <span>{formatTimestamp(comment.timestamp)}</span>
            </div>
            <div className="flex items-center gap-2 mt-1" style={{ color: 'var(--theme-border)', fontSize: 'calc(var(--reading-text-size) * 0.85)' }}>
              <span>👍 {comment.likes}</span>
              {Array.isArray(comment.replies) && comment.replies.length > 0 && (
                <span>💬 {comment.replies.length} 回复</span>
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
                let replyObj: any = null;
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
                      <span>👍 {replyObj.likes}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const CommentModal: React.FC<CommentModalProps> = ({ open, onClose, comments = [] }) => {
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [open]);
  if (!open) return null;

  return createPortal(
    <div
      className="flex flex-col gap-8"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99999,
        background: "rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        id="container-of-cards"
        style={{
          background: "var(--theme-bg, #fff)",
          color: "var(--theme-text, #222)",
          border: "1.5px solid var(--theme-border, #e0e0e0)",
          borderRadius: 18,
          boxShadow: "0 8px 48px rgba(0,0,0,0.18)",
          width: "min(96vw, 700px)",
          minHeight: '110vh',
          maxHeight: '90vh',
          padding: "1.5rem 1rem 10rem 1rem",
          position: "relative",
          overflowY: "auto",
          marginBottom: '-20vh',
        }}
      >
        {renderCommentContent(comments)}
        {/* Extra empty space at the bottom for scroll effect */}
        <div style={{ height: '16vh' }} />

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
      </div>
    </div>,
    document.body
  );
};

export default CommentModal;
