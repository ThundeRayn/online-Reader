import BackToHomeButton from '../../components/BackToHomeButton'

interface AboutPanelProps {
  onBackToHome: () => void
}

const AboutPanel = ({ onBackToHome }: AboutPanelProps) => {
  return (
    <div className="py-8 relative">
      <BackToHomeButton onBackToHome={onBackToHome} />
      <h2 className="text-center mb-6 font-bold" style={{ color: 'var(--theme-text)', fontSize: 'calc(var(--reading-text-size) * 1.5)' }}>
        声明
      </h2>
      <p className="text-center" style={{ color: 'var(--theme-text)', fontSize: 'calc(var(--reading-text-size) * 1)' }}>
        版权声明和相关信息...
      </p>
    </div>
  )
}

export default AboutPanel
