import BackToHomeButton from '../../components/BackToHomeButton'

interface FeedPanelProps {
  onBackToHome: () => void
}

const FeedPanel = ({ onBackToHome }: FeedPanelProps) => {
  return (
    <div className="py-8 relative">
      <BackToHomeButton onBackToHome={onBackToHome} />
      <h2 className="text-center mb-6 font-bold" style={{ color: 'var(--theme-text)', fontSize: 'calc(var(--reading-text-size) * 1.5)' }}>
        投喂
      </h2>
      <p className="text-center" style={{ color: 'var(--theme-text)', fontSize: 'calc(var(--reading-text-size) * 1)' }}>
        感谢您的支持！
      </p>
    </div>
  )
}

export default FeedPanel
