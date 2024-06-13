import React from 'react'
import styles from './Buttons.module.css'

export function FillButton({
  children,
  isSubmit,
  size = 'medium',
  disabled = false,
  iconLeft = false,
  iconRight = false,
  onClick,
}) {
  return (
    <button
      disabled={disabled}
      className={`${styles.fill} ${size === 'medium' ? 'body-3 medium' : 'caption-1 small'} ${styles.button} ${iconLeft ? styles['icon-left'] : ''} ${iconRight ? styles['icon-right'] : ''}`}
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function OutlineButton({
  children,
  size = 'medium',
  disabled = false,
  iconLeft = false,
  iconRight = false,
}) {
  return (
    <span
      className={` ${size === 'medium' ? 'body-3' : 'caption-1'} ${styles.button} ${styles.outline} ${styles[size]} ${disabled ? styles.disabled : ''} ${iconLeft ? styles['icon-left'] : ''} ${iconRight ? styles['icon-right'] : ''}`}
    >
      {children}
    </span>
  )
}
