import styles from './Inputs.module.css'

export function InputText({
  name,
  id,
  placeholder = '',
  onChange,
  showIcon = false,
}) {
  return (
    <div
      className={`${styles['input-wrapper']} ${showIcon ? styles['show-icon'] : ''}`}
    >
      <input
        type="text"
        name={name}
        id={id}
        className={`body-3 ${styles.input} `}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

export function Textarea({ name, id, placeholder, rows = 5 }) {
  return (
    <div className={`${styles['textarea-wrapper']}`}>
      <textarea
        name={name}
        id={id}
        rows={rows}
        className={`body-3 ${styles.textarea}`}
        placeholder={placeholder}
      />
    </div>
  )
}
