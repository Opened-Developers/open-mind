import FeedCardBadge from './FeedCardBadge'
import FeedCardQuestion from './FeedCardQuestion'
import FeedCardAnswer from './FeedCardAnswer'
import FeedCardAnswerEdit from './FeedCardAnswerEdit'
import FeedCardLikes from './FeedCardLikes'
import styles from './FeedCard.module.css'

export default function FeedCard({ question, isMyFeed }) {
  return (
    <div className={styles['card-container']}>
      <FeedCardBadge isAnswered={question.answer !== null} />
      <FeedCardQuestion question={question} />
      {isMyFeed ? (
        <FeedCardAnswerEdit question={question} />
      ) : (
        question.answer && <FeedCardAnswer question={question} />
      )}
      <FeedCardLikes question={question} />
    </div>
  )
}
