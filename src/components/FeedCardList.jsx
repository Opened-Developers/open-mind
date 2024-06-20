import deleteFeedQuestion from '../api/deleteFeedQuestion'
import styles from './FeedCardList.module.css'
import messagesIcon from '../assets/icons/ic_messages.svg'
import emptyFeedIcon from '../assets/icons/ic_empty_feed.svg'
import FeedCard from './FeedCard'

export default function FeedCardList({
  questions,
  questionCount,
  isMyFeed,
  profile = null,
  setErrorInfo,
  onLoad: handleLoadQuestions,
}) {
  const handleDeleteClick = async (id) => {
    try {
      await deleteFeedQuestion(id)
    } catch (error) {
      setErrorInfo(error.message)
    }
    await handleLoadQuestions()
  }

  if (questions.length === 0) {
    return (
      <div>
        <div className={styles['messages-container']}>
          <div className={styles['messages-container-summary']}>
            <img
              className={styles['messages-container-message-icon']}
              src={messagesIcon}
              alt="질문 메시지 아이콘"
            />
            <p>아직 질문이 없습니다.</p>
          </div>
          <img
            className={styles['messages-container-empty-icon']}
            src={emptyFeedIcon}
            alt="빈 피드 아이콘"
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className={styles['messages-container']}>
        <img
          className={styles['messages-container-icon']}
          src={messagesIcon}
          alt="질문 메시지 아이콘"
        />
        <p>{questionCount}개의 질문이 있습니다.</p>
      </div>
      <div className={styles['feed-card-container']}>
        {questions.map((question) => (
          <FeedCard
            key={question.id}
            question={question}
            isMyFeed={isMyFeed}
            profile={profile}
            onDeleteClick={handleDeleteClick}
            onLoad={handleLoadQuestions}
          />
        ))}
      </div>
    </div>
  )
}
