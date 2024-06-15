import FeedCardBadge from './FeedCardBadge'
import FeedCardQuestion from './FeedCardQuestion'
import FeedCardAnswer from './FeedCardAnswer'
import FeedCardAnswerEdit from './FeedCardAnswerEdit'
import FeedCardReaction from './FeedCardReaction'

export default function FeedCard({ question, isMyFeed }) {
  return (
    <div>
      <FeedCardBadge isAnswered={question.answer !== null} />
      <FeedCardQuestion question={question} />
      {isMyFeed ? (
        <FeedCardAnswerEdit question={question} />
      ) : (
        question.answer && <FeedCardAnswer question={question} />
      )}
      <FeedCardReaction question={question} />
    </div>
  )
}
