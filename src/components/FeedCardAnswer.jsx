import { getRelativeDate } from '../modules/utils'
import styles from './FeedCardAnswer.module.css'

export default function FeedCardAnswer({ question, profile }) {
  return (
    <div className={styles['answer-layout']}>
      <img
        className={styles['user-img']}
        src={profile.imageSource}
        alt={'프로필 이미지'}
      />
      <div>
        <div className={styles['answer-info']}>
          <p className={styles['user-name']}>{profile.name}</p>
          <p className={styles['answer-date']}>
            {getRelativeDate(question.answer.createdAt)}
          </p>
        </div>
        {question.answer.isRejected ? (
          <p className={styles['answer-rejecting']}>답변 거절</p>
        ) : (
          <p className={styles['answer-content']}>{question.answer.content}</p>
        )}
      </div>
    </div>
  )
}
