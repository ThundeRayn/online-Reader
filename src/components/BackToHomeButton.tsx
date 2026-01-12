import { IoArrowBack } from 'react-icons/io5'

interface BackToHomeButtonProps {
  onBackToHome: () => void
}

const BackToHomeButton = ({ onBackToHome }: BackToHomeButtonProps) => {
  return (
    <button
      type="button"
      onClick={onBackToHome}
      className="hover:opacity-70 active:opacity-50 transition-opacity"
      style={{
        color: 'var(--theme-text)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
    >
      <IoArrowBack size={20} />
    </button>
  )
}

export default BackToHomeButton
