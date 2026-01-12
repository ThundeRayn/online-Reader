import BackToHomeButton from '../../components/BackToHomeButton'

interface FeedbackPanelProps {
  onBackToHome: () => void
}

const FeedbackPanel = ({ onBackToHome }: FeedbackPanelProps) => {
  return (
    <div className="py-8 relative">
      <BackToHomeButton onBackToHome={onBackToHome} />
      <h2 className="text-center mb-6 font-bold" style={{ color: 'var(--theme-text)', fontSize: 'calc(var(--reading-text-size) * 1.5)' }}>
        反馈
      </h2>
      <p className="text-center" style={{ color: 'var(--theme-text)', fontSize: 'calc(var(--reading-text-size) * 1)' }}>
        欢迎提出您的意见和建议！
      </p>
    </div>
  )
}

export default FeedbackPanel
