import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  duration?: number; // Duration in milliseconds, default 3000ms
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation after mount
    setTimeout(() => setIsAnimating(true), 10);

    // Auto-hide after duration
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300); // Wait for fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '6rem',
        left: '50%',
        transform: `translate(-50%, ${isAnimating ? '0' : '20px'})`,
        opacity: isAnimating ? 1 : 0,
        transition: 'all 300ms ease-in-out',
        zIndex: 100000,
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text)',
        border: '1px solid var(--theme-border)',
        borderRadius: '8px',
        padding: '0.75rem 1.5rem',
        fontSize: 'calc(var(--reading-text-size) * 0.9)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        maxWidth: '90%',
        textAlign: 'center',
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
