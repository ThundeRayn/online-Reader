interface ChapterTitleProps {
    title: string;
} 
const ChapterTitle = ({ title }: ChapterTitleProps) => {
  return (
      <p
          className="text-center mb-8"
          style={{
              fontSize: 'calc(var(--reading-text-size) * 1.5)',
              color: 'var(--theme-text)',
              fontWeight: '400'
          }}
      >
          {title}
      </p>
  )
}

export default ChapterTitle