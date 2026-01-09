interface AnchorProps {
    series?: string;

}
const Anchor = (props: AnchorProps) => {
  return (
    <div className="inline italic text-sm font-semibold mb-4 pr-4" style={{ fontSize: 'var(--reading-text-size)' }}>
        {props.series}
    </div>
  )
}

export default Anchor