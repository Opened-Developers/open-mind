import styles from './Toast.module.css'

function Toast({ children }) {
  return <div className={styles.toast}>{children}</div>
}

export default Toast
