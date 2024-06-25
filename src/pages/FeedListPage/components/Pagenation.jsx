import React from 'react'
import { Link, useParams } from 'react-router-dom'
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

function PagenationBar({ countPerPage, feedCount }) {
  const { page: pageParam } = useParams()
  const pageUrl = pageParam || 'page1'
  const currentPage = pageUrl.substring(4)

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

  return (
    <div className={styles.PagenationBar}>
      {isPrevPage && (
        <Link to={`page${pagenationList[0] - 1}`}>
          <button className={styles.pageButton} type="button">
            &lt;
          </button>
        </Link>
      )}
      {pagenationList.map((page) => (
        <Link key={page} to={`page${page}`}>
          <button
            className={`${styles.pageButton} ${Number(currentPage) === Number(page) ? styles.active : ''}`}
            type="button"
          >
            {page}
          </button>
        </Link>
      ))}
      {isNextPage && (
        <Link to={`page${pagenationList[countPagenation - 1] + 1}`}>
          <button className={styles.pageButton} type="button">
            &gt;
          </button>
        </Link>
      )}
    </div>
  )
}

export default PagenationBar
