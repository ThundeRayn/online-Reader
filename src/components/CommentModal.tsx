
import React, { useEffect } from "react";
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
  comment?: CommentData | null;
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

const renderCommentContent = (comment: CommentData | null) => {
  if (!comment) return null;
  return (
    <div
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
          {comment.replies.length > 0 && (
            <span>💬 {comment.replies.length} 回复</span>
          )}
        </div>
      </div>
      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="border-t pt-2 mt-2" style={{ borderColor: 'var(--theme-border)' }}>
          <div className="mb-2 font-medium" style={{ color: 'var(--theme-text)', fontSize: 'calc(var(--reading-text-size) * 0.9)' }}>
            回复:
          </div>
          {comment.replies.map((reply) => (
            <div key={reply.id} className="mb-2 p-2 rounded" style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)', fontSize: 'var(--reading-text-size)' }}>
              <div className="mb-1" style={{ fontSize: 'var(--reading-text-size)' }}>{reply.comment}</div>
              <div className="flex justify-between items-center" style={{ color: 'var(--theme-border)', fontSize: 'calc(var(--reading-text-size) * 0.85)' }}>
                <span>{reply.author}</span>
                <span>👍 {reply.likes}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CommentModal: React.FC<CommentModalProps> = ({ open, onClose, comment }) => {
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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        background: "rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "var(--theme-bg, #fff)",
          color: "var(--theme-text, #222)",
          border: "1.5px solid var(--theme-border, #e0e0e0)",
          borderRadius: 18,
          boxShadow: "0 8px 48px rgba(0,0,0,0.18)",
          width: "min(96vw, 700px)",
          maxHeight: "90vh",
          padding: "2.5rem 2rem 2rem 2rem",
          position: "relative",
          overflowY: "auto",
        }}
      >
        <button
          style={{ position: "absolute", top: 18, right: 24, fontSize: 28, background: "none", border: "none", cursor: "pointer", color: "var(--theme-border, #888)" }}
          onClick={onClose}
          aria-label="关闭评论"
        >
          ×
        </button>
        {renderCommentContent(comment || null)}
      </div>
    </div>,
    document.body
  );
};

export default CommentModal;
