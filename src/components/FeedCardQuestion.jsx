import useRelativeDate from '../hooks/useRelativeDate'
import styles from './FeedCardQuestion.module.css'

export default function FeedCardQuestion({ question }) {
  return (
    <div className={styles.container}>
      <p className={styles['relative-date']}>
        질문 ∙ {useRelativeDate(question.createdAt)}
      </p>
      <p className={styles.content}>{question.content}</p>
    </div>
  )
}
