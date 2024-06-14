import styles from './FeedCardBadge.module.css'

export default function FeedCardBadge(isAnswered) {
  if (isAnswered) {
    return <div className={styles.badge}>답변 완료</div>
  }
  return <div className={styles.badge}>미답변</div>
}
