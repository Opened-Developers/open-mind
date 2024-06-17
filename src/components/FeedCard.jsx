import FeedCardBadge from './FeedCardBadge'
import FeedCardQuestion from './FeedCardQuestion'
import FeedCardAnswer from './FeedCardAnswer'
import FeedCardAnswerEdit from './FeedCardAnswerEdit'
import FeedCardReaction from './FeedCardReaction'
import styles from './FeedCard.module.css'

export default function FeedCard({ question, isMyFeed, profile = null }) {
  return (
    <div className={styles['card-container']}>
      <FeedCardBadge isAnswered={question.answer !== null} />
      <FeedCardQuestion question={question} />
      {isMyFeed ? (
        <FeedCardAnswerEdit question={question} profile={profile} />
      ) : (
        question.answer && <FeedCardAnswer question={question} />
      )}
      <FeedCardReaction question={question} />
    </div>
  )
}
