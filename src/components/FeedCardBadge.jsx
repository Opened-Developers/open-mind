import Badges from './Badges'

export default function FeedCardBadge({ isAnswered }) {
  if (isAnswered) {
    return (
      <div>
        <Badges>답변 완료</Badges>
      </div>
    )
  }
  return (
    <div>
      <Badges>미답변</Badges>
    </div>
  )
}
