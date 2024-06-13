import React from 'react'
import styles from './Buttons.module.css'

export default function Button({
  children,
  isSubmit,
  type = 'fill',
  size = 'medium',
  disabled = false,
}) {
  return (
    <button
      disabled={disabled}
      className={`${size === 'medium' ? 'body-3' : 'caption-1'} ${styles.button} ${styles[type]} ${styles[size]}`}
      type={isSubmit ? 'submit' : 'button'}
    >
      {children}
    </button>
  )
}
