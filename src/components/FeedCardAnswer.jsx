import useRelativeDate from '../hooks/useRelativeDate'

export default function FeedCardAnswer({ question }) {
  return (
    <div>
      <p>{question.subjectId}</p>
      <p>{useRelativeDate(question.answer.createdAt)}</p>
      <p>{question.answer.content}</p>
      {question.answer.isRejected && <p>답변 거절</p>}
    </div>
  )
}
