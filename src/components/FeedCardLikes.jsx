import likeIcon from '../assets/icons/ic_like.svg'
import dislikeIcon from '../assets/icons/ic_dislike.svg'
import styles from './FeedCardLikes.module.css'

export default function FeedCardLikes({ question }) {
  return (
    <div className={styles['likes-container']}>
      <div className={styles.likes}>
        <img src={likeIcon} alt="좋아요" />
        <p>좋아요 {question.like}</p>
      </div>
      <div className={styles.likes}>
        <img src={dislikeIcon} alt="싫어요" />
        <p>싫어요 {question.dislike}</p>
      </div>
    </div>
  )
}
