import useRelativeDate from '../hooks/useRelativeDate'

export default function FeedCardQuestion({ question }) {
  return (
    <div>
      <p>질문 ∙ </p>
      <p>{useRelativeDate(question.createdAt)}</p>
      <p>{question.content}</p>
    </div>
  )
}
