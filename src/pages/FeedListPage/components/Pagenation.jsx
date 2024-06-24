import React from 'react'
import styles from './Pagenation.module.css'

const countPagenation = 5

const createPageList = (currentPage, countPerPage, feedCount) => {
  const pagenationStart = 1 + (Math.ceil(currentPage / 5) - 1) * countPagenation
  const pagenationEnd = pagenationStart + countPagenation
  const pagenationList = []

  for (let i = pagenationStart; i < pagenationEnd; i += 1) {
    pagenationList.push(i)
    if (i * countPerPage >= feedCount) break
  }

  return pagenationList
}

function PagenationBar({ currentPage = 1, countPerPage, feedCount, onClick }) {
  const pagenationList = createPageList(currentPage, countPerPage, feedCount)
  const isPrevPage = pagenationList[0] > 1
  const isNextPage = (() => {
    if (pagenationList.length !== countPagenation) {
      return false
    }

    const lastPageNum = pagenationList[countPagenation - 1]
    const accumulateOfLastPage = lastPageNum * countPerPage
    if (accumulateOfLastPage >= feedCount) {
      return false
    }

    return true
  })()

  const handlePageClick = (e) => {
    onClick(e.currentTarget.value)
  }

  return (
    <div className={styles.PagenationBar}>
      {isPrevPage && (
        <button
          className={styles.pageButton}
          type="button"
          value={pagenationList[0] - 1}
          onClick={handlePageClick}
        >
          &lt;
        </button>
      )}
      {pagenationList.map((page) => (
        <button
          className={`${styles.pageButton} ${Number(currentPage) === Number(page) ? styles.active : ''}`}
          type="button"
          key={page}
          value={page}
          onClick={handlePageClick}
        >
          {page}
        </button>
      ))}
      {isNextPage && (
        <button
          className={styles.pageButton}
          type="button"
          value={pagenationList[countPagenation - 1] + 1}
          onClick={handlePageClick}
        >
          &gt;
        </button>
      )}
    </div>
  )
}

export default PagenationBar
