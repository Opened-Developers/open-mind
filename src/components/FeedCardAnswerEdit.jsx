export default function FeedCardAnswerEdit({ question }) {
  return (
    <div>
      <p>{question.subjectId}</p>
      <form>
        <textarea placeholder="답변을 입력해 주세요." />
        <button type="submit">답변 완료</button>
      </form>
    </div>
  )
}
