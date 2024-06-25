import { React, useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './FeedListPage.module.css'
import UserCardList from './components/UserCardList'
import Pagenation from './components/Pagenation'
import { SortDropdown, SortDropdownItem } from '../../components/Dropdown'
import '../../styles/global.css'
import icArrowRightBrown from '../../assets/icons/ic_arrow_right_brown.svg'
import imgLogo from '../../assets/images/img_logo.png'
import { OutlineButton } from '../../components/Buttons'
import { debounce, getDeviceType, getLocalUserId } from '../../modules/utils'

const localUserId = getLocalUserId()
const navButtonLink = localUserId ? `/post/${localUserId}/answer` : '/'
const navButtonText = localUserId ? '내 피드 바로가기' : '새 피드 생성하기'

const countPerPage = {
  desktop: 8,
  tabletBig: 8,
  tablet: 6,
  mobile: 6,
}

const isSizeChanged = (currentDeviceType, nextDeviceType) => {
  if (countPerPage[currentDeviceType] === countPerPage[nextDeviceType]) {
    return false
  }

  return true
}

const navigatePage = (page, nextDeviceType) => {
  const nextCountPerPage = countPerPage[nextDeviceType]
  const counterOrder = nextCountPerPage === 6 ? [8, 6] : [6, 8]
  const correctPage =
    parseInt((1 + (page - 1) * counterOrder[0]) / counterOrder[1], 10) + 1
  return correctPage
}

const dropdownItems = ['최신순', '이름순']

function FeedListPage() {
  const { page: pageParam } = useParams()
  const pageUrl = pageParam || 'page1'
  const navigate = useNavigate()

  const pagePattern = /^page\d+$/
  const isCorrectUrl = pagePattern.test(pageParam)

  if (!isCorrectUrl) {
    navigate(`/list/page1`)
  }

  const page = pageUrl.substring(4)

  const [sortOrder, setSortOrder] = useState(dropdownItems[0])
  const [deviceType, setDeviceType] = useState(
    getDeviceType(window.innerWidth, true)
  )
  const [feedCount, setFeedCount] = useState(0)

  const handleResize = useCallback(() => {
    const currentDeviceType = deviceType
    const width = window.innerWidth
    const nextDeviceType = getDeviceType(width, true)
    setDeviceType(nextDeviceType)

    if (isSizeChanged(currentDeviceType, nextDeviceType)) {
      const nextPage = navigatePage(page, nextDeviceType)
      navigate(`/list/page${nextPage}`)
    }
  }, [deviceType, page, navigate])

  const handleDropdownItemClick = (item) => {
    setSortOrder(item)
  }

  const handleFeedCount = (count) => {
    setFeedCount(count)
  }

  useEffect(() => {
    handleFeedCount(feedCount)
  }, [feedCount])

  useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 100)
    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [handleResize])

  return (
    <section className={styles.FeedListPage}>
      <div className={styles.navBar}>
        <Link to={'/'}>
          <img
            className={`${styles.image} ${styles.logo}`}
            src={imgLogo}
            alt="로고 이미지"
          />
        </Link>
        <div>
          <Link to={navButtonLink}>
            <OutlineButton
              size={deviceType === 'mobile' ? 'small' : 'medium'}
              iconRight={icArrowRightBrown}
            >
              {navButtonText}
            </OutlineButton>
          </Link>
        </div>
      </div>
      <div className={styles.titleWrapper}>
        <h2 className={styles.heading}>누구에게 질문할까요?</h2>
        <SortDropdown onChange={handleDropdownItemClick}>
          {dropdownItems.map((dropdownItem) => (
            <SortDropdownItem key={dropdownItem}>
              {dropdownItem}
            </SortDropdownItem>
          ))}
        </SortDropdown>
      </div>
      <UserCardList
        sort={sortOrder}
        deviceType={deviceType}
        countPerPage={countPerPage[deviceType]}
        handleFeedCount={handleFeedCount}
      />
      <Pagenation
        countPerPage={countPerPage[deviceType]}
        feedCount={feedCount}
      />
    </section>
  )
}

export default FeedListPage
