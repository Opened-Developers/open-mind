import styles from './Toast.module.css'

function Toast({ children, status }) {
  return (
    <div className={`shadow-1pt caption-1 ${styles.toast} ${styles[status]}`}>
      {children}
    </div>
  )
}

export default Toast
