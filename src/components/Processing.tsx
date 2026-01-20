interface ProcessingProps {
  text?: string
  reminder?: string
}

const Processing = ({ text, reminder }: ProcessingProps) => {
  return (
    <div>
        <hr />
        <p className="text-center py-3">{text || '以下是没有打磨好的🧠，如果不幸出现可阅读内容，请在此处止步并直接投喂给提丢斯'}</p>
        {reminder && <p className="text-center py-2" style={{ color: 'var(--theme-text)', opacity: 0.7 }}>{reminder}</p>}
        <hr />
    </div>
  )
}

export default Processing