import React from 'react';
import HomePanel from './submenus/HomePanel';
import FeedPanel from './submenus/FeedPanel';
import ChaptersPanel from './submenus/ChaptersPanel';
import AboutPanel from './submenus/AboutPanel';
import FeedbackPanel from './submenus/FeedbackPanel';
import { LuCat, LuMessageSquareMore } from 'react-icons/lu';
import { PiBooks } from 'react-icons/pi';
import { AiOutlineInfoCircle } from 'react-icons/ai';

interface SubmenusProps {
  currentView: 'home' | 'feed' | 'chapters' | 'about' | 'feedback';
  onBackToHome: () => void;
  onNavigate: (view: 'home' | 'feed' | 'chapters' | 'about' | 'feedback') => void;
}

const Submenus: React.FC<SubmenusProps> = ({ currentView, onBackToHome, onNavigate }) => {
  return (
    <>
      {/* Scrollable Content Area */}
      <div 
        style={{ 
          flex: '1 1 auto',
          overflowY: 'auto',
          padding: '2rem 2rem 0 2rem',
          minHeight: 0,
        }}
      >
        {currentView === 'home' && <HomePanel />}
        {currentView === 'feed' && <FeedPanel onBackToHome={onBackToHome} />}
        {currentView === 'chapters' && <ChaptersPanel onBackToHome={onBackToHome} />}
        {currentView === 'about' && <AboutPanel onBackToHome={onBackToHome} />}
        {currentView === 'feedback' && <FeedbackPanel onBackToHome={onBackToHome} />}
      </div>

      {/* Fixed Navigation at Bottom */}
      <nav 
        className="flex px-4 py-2 justify-around items-center" 
        style={{ 
          paddingTop: '1rem',
          paddingBottom: '1rem',
          borderTop: '1px dotted var(--theme-border)',
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); onNavigate('feed'); }}
          className="hover:opacity-70 active:opacity-50 transition-opacity flex flex-col items-center gap-1"
          style={{ 
            color: currentView === 'feed' ? 'var(--theme-citation)' : 'var(--theme-text)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <LuCat size={26} />
          <span style={{ fontSize: 'calc(var(--reading-text-size) * 0.65)' }}>
            投喂</span>
        </button>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); onNavigate('chapters'); }}
          className="hover:opacity-70 active:opacity-50 transition-opacity flex flex-col items-center gap-1"
          style={{ 
            color: currentView === 'chapters' ? 'var(--theme-citation)' : 'var(--theme-text)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <PiBooks size={26} />
          <span style={{ fontSize: 'calc(var(--reading-text-size) * 0.65)' }}>
            书架</span>
        </button>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
          className="hover:opacity-70 active:opacity-50 transition-opacity flex flex-col items-center gap-1"
          style={{ 
            color: currentView === 'about' ? 'var(--theme-citation)' : 'var(--theme-text)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <AiOutlineInfoCircle size={26} />
          <span style={{ fontSize: 'calc(var(--reading-text-size) * 0.65)' }}>
            声明</span>
        </button>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); onNavigate('feedback'); }}
          className="hover:opacity-70 active:opacity-50 transition-opacity flex flex-col items-center gap-1"
          style={{ 
            color: currentView === 'feedback' ? 'var(--theme-citation)' : 'var(--theme-text)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <LuMessageSquareMore size={26} />
          <span style={{ fontSize: 'calc(var(--reading-text-size) * 0.65)' }}>
            反馈</span>
        </button>
      </nav>
    </>
  );
};

export default Submenus;
