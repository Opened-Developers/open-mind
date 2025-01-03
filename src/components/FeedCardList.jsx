import styles from './FeedCardList.module.css'
import messagesIcon from '../assets/icons/ic_messages.svg'
import emptyFeedIcon from '../assets/icons/ic_empty_feed.svg'
import FeedCard from './FeedCard'

export default function FeedCardList({
  isMyFeed,
  profile,
  questions,
  questionCount,
  onLoadNew,
  errorInfo = null,
  setErrorInfo,
}) {
  if (questionCount === 0) {
    return (
      <div>
        <main className={styles['messages-container']}>
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
        </main>
      </div>
    )
  }

  if (questionCount > 0) {
    return (
      <div>
        <main className={styles['messages-container']}>
          <div className={styles['messages-container-summary']}>
            <img
              className={styles['messages-container-message-icon']}
              src={messagesIcon}
              alt="질문 메시지 아이콘"
            />
            <p>{questionCount}개의 질문이 있습니다.</p>
          </div>
          <article className={styles['feed-card-container']}>
            {questions.map((question) => (
              <FeedCard
                key={question.id}
                question={question}
                isMyFeed={isMyFeed}
                profile={profile}
                onLoadNew={onLoadNew}
                errorInfo={errorInfo}
                setErrorInfo={setErrorInfo}
              />
            ))}
          </article>
        </main>
      </div>
    )
  }
}
