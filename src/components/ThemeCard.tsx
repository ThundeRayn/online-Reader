import React, { CSSProperties } from 'react';

interface ThemeCardProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: CSSProperties;
  className?: string;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ children, onClick, style, className = '' }) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: 'var(--theme-bg, #fff)',
        color: 'var(--theme-text, #222)',
        border: '1.5px solid var(--theme-border, #e0e0e0)',
        borderRadius: 18,
        boxShadow: '0 8px 48px rgba(0,0,0,0.18)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default ThemeCard;
