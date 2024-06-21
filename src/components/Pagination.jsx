import React from 'react'
import styles from './Pagination.module.css'

export function PaginationItem({ children, state }) {
  return (
    <li>
      <span className={`${styles['pagination-item']} ${styles[state]}`}>
        {children}
      </span>
    </li>
  )
}

export function Pagination() {
  return (
    <>
      <button type="button">이전</button>
      <ul>
        <PaginationItem />
      </ul>
      <button type="button">다음</button>
    </>
  )
}
