import getRelativeDate from '../utils/getRelativeDate'

export default function FeedCardAnswer({ question, profile }) {
  return (
    <div>
      <img src={profile.imageSource} alt={'프로필 이미지'} />
      <div>
        <p>{profile.name}</p>
        <p>{getRelativeDate(question.answer.createdAt)}</p>
        <p>{question.answer.content}</p>
        {question.answer.isRejected && <p>답변 거절</p>}
      </div>
    </div>
  )
}
