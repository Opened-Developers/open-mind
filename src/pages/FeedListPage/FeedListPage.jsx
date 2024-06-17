import { React, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './FeedListPage.module.css'
import UserCard from './components/UserCard'
import PagenationBar from './components/PagenationBar'
import DropDown from '../../components/DropDown'
import '../../styles/global.css'
import getFeedList from '../../api/getFeedList'
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

const dropDownItem = ['이름순', '최신순']

const getSortedList = (list, sortOrder) => {
  const sortedList = list.sort((a, b) => {
    if (sortOrder === '최신순') {
      return a.createdAt > b.createdAt ? -1 : 1
    }
    if (sortOrder === '이름순') {
      return a.name.localeCompare(b.name)
    }

    return 0
  })

  return sortedList
}
function FeedListPage() {
  const [page, setPage] = useState(1)
  const [userCardLists, setUserCardLists] = useState([])
  const [sortOrder, setSortOrder] = useState(dropDownItem[1])
  const [deviceType, setDeviceType] = useState(
    getDeviceType(window.innerWidth, true)
  )

  const feedCount = useRef(0)

  const handleResize = () => {
    const width = window.innerWidth
    const currentDeviceType = getDeviceType(width, true)
    setDeviceType(currentDeviceType)
  }

  const handlePageClick = (pageNum) => {
    setPage(pageNum)
  }

  const handleDropDownItemClick = (item) => {
    setSortOrder(item)
  }

  useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 50)
    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [])

  useEffect(() => {
    const getUserCardLists = async () => {
      const limit = countPerPage[deviceType]
      const offset = limit * (page - 1)
      try {
        const { data } = await getFeedList(limit, offset)
        setUserCardLists(getSortedList(data.results, sortOrder))
        feedCount.current = data.count
      } catch (error) {
        console.error(error)
      }
    }

    getUserCardLists()
  }, [deviceType, page, sortOrder])

  return (
    <section className={styles.FeedListPage}>
      <div className={styles.navBar}>
        <img
          className={`${styles.image} ${styles.logo}`}
          src={imgLogo}
          alt="로고 이미지"
        />
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
      <h2 className="heading-1">누구에게 질문할까요?</h2>
      <DropDown items={dropDownItem} onItemChange={handleDropDownItemClick} />
      <div className={styles.userCardListContainer}>
        <div className={`${styles.userCardList} ${styles[deviceType]}`}>
          {userCardLists.map((userCard) => (
            <UserCard
              key={userCard.id}
              id={userCard.id}
              image={userCard.imageSource}
              userName={userCard.name}
              questionCount={userCard.questionCount}
            />
          ))}
        </div>
      </div>
      <PagenationBar
        currentPage={page}
        countPerPage={countPerPage[deviceType]}
        feedCount={feedCount.current}
        onClick={handlePageClick}
      />
    </section>
  )
}

export default FeedListPage
