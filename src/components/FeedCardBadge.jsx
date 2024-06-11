export default function FeedCardBadge(isAnswered) {
  if (isAnswered) {
    return <p>답변 완료</p>
  }
  return <p>미답변</p>
}
