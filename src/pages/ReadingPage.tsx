import Title from "../components/Title"
import Para101 from "../Paragraphs/Para101"
import Para146 from "../Paragraphs/Para146"

const ReadingPage = () => {
  return (
    <div className='w-full h-full overflow-y-auto' style={{ padding: 'var(--reading-margin)' }}>
        <Title />
        <div className="flex flex-col gap-14">
        <Para101 />
        <Para146 />

        </div>
    </div>
  )
}

export default ReadingPage