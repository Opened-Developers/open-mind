import Badges from './Badges'

export default function FeedCardBadge({ isAnswered }) {
  if (isAnswered) {
    return <Badges>답변 완료</Badges>
  }
  return <Badges>미답변</Badges>
}
