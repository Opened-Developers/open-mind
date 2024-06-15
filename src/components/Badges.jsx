import React from 'react'
import styles from './Badges.module.css'

export default function Badges({ children, color = 'brown' }) {
  return (
    <div className={`caption-1 ${styles.badge} ${styles[color]}`}>
      {children}
    </div>
  )
}
