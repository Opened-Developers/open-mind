import Badges from './Badges'

export default function FeedCardBadge({ isAnswered }) {
  if (isAnswered) {
    return <Badges color={'brown'}>답변 완료</Badges>
  }
  return <Badges color={'gray'}>미답변</Badges>
}
