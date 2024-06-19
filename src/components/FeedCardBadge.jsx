import Badges from './Badges'

export default function FeedCardBadge({ isAnswered }) {
  if (isAnswered) {
    return (
      <div className="width: fit-content">
        <Badges>답변 완료</Badges>
      </div>
    )
  }
  return (
    <div className="width: fit-content">
      <Badges>미답변</Badges>
    </div>
  )
}
