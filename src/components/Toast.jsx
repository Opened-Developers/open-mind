import { useToast } from '../contexts/toastContextProvider'
import styles from './Toast.module.css'

export default function Toast() {
  const { toasts } = useToast()

  return (
    <ul className={styles['toast-wrapper']}>
      {toasts.length > 0 &&
        toasts.map(({ id, status, message }) => (
          <li key={id}>
            <div
              className={`shadow-1pt caption-1 ${styles.toast} ${styles[status]}`}
            >
              <span>{message}</span>
            </div>
          </li>
        ))}
    </ul>
  )
}
