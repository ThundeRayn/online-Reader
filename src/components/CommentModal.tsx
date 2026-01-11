import React from "react";
import { createPortal } from "react-dom";

interface CommentModalProps {
  open: boolean;
  top: number;
  left: number;
  onClose: () => void;
  children: React.ReactNode;
}

const CommentModal: React.FC<CommentModalProps> = ({ open, top, left, onClose, children }) => {
  if (!open) return null;
  return createPortal(
    <div
      style={{
        position: "fixed",
        top,
        left,
        transform: "translate(-50%, 0)",
        zIndex: 9999,
        background: "rgba(255,255,255,0.98)",
        borderRadius: 8,
        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
        border: "1px solid #eee",
        minWidth: 320,
        maxWidth: 400,
      }}
    >
      <button
        style={{ position: "absolute", top: 8, right: 12, fontSize: 18, background: "none", border: "none", cursor: "pointer", color: "#888" }}
        onClick={onClose}
        aria-label="关闭评论"
      >
        ×
      </button>
      {children}
    </div>,
    document.body
  );
};

export default CommentModal;
