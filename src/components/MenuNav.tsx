import React from 'react';
import BackToHomeButton from './BackToHomeButton';

interface MenuNavProps {
  title: string;
  onBackToHome: () => void;
}

const MenuNav: React.FC<MenuNavProps> = ({ title, onBackToHome }) => {
  return (
    <div 
      className="flex items-center justify-between rounded-t-[18px]"
      style={{
        padding: '1rem 1rem 1rem 1rem',
        borderBottom: '1px dotted var(--theme-border)',
        backgroundColor: 'var(--theme-bg)',
        flexShrink: 0,
      }}
    >
      <BackToHomeButton onBackToHome={onBackToHome} />
      <h2 
        className='text-center'
        style={{
          color: 'var(--theme-text)',
          fontSize: 'calc(var(--reading-text-size) * 1.2)',
          fontWeight: 600,
          margin: 0,
        }}
      >
        {title}
      </h2>
      <hr/>
      {/* Invisible spacer to keep title centered */}
      <div style={{ width: '80px' }} />
    </div>
  );
};

export default MenuNav;
