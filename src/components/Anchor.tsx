interface AnchorProps {
    series?: string;
}

const Anchor = (props: AnchorProps) => {
  return (
    <div 
      className="inline italic text-sm font-semibold mb-4 pr-4" 
      style={{ fontSize: 'var(--reading-text-size)' }}
      data-anchor={props.series}
    >
        <span>{props.series}</span>
    </div>
  )
}

export default Anchor