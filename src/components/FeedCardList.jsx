import styles from './FeedCardList.module.css'
import messagesIcon from '../assets/icons/ic_messages.svg'
import FeedCard from './FeedCard'

export default function FeedCardList({
  questions,
  questionCount,
  isMyFeed,
  profile = null,
}) {
  if (questions.length === 0) {
    return (
      <div>
        <div className={styles['messages-container']}>
          <img src={messagesIcon} alt="질문 메시지 아이콘" />
          <p>아직 질문이 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className={styles['messages-container']}>
        <img src={messagesIcon} alt="질문 메시지 아이콘" />
        <p>{questionCount}개의 질문이 있습니다.</p>
      </div>
      <div className={styles['feed-card-container']}>
        {questions.map((question) => (
          <FeedCard
            key={question.id}
            question={question}
            isMyFeed={isMyFeed}
            profile={profile}
          />
        ))}
      </div>
    </div>
  )
}
