import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './UserCardList.module.css'
import getFeedList from '../../../api/getFeedList'
import UserCard from './UserCard'
import { useToast } from '../../../contexts/toastContextProvider'

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

function UserCardList({ sort, deviceType, countPerPage, handleFeedCount }) {
  const { page: pageParam } = useParams()
  const [userCardLists, setUserCardLists] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    const getUserCardLists = async () => {
      const limit = countPerPage
      const offset = limit * (pageParam.substring(4) - 1)
      try {
        const { data } = await getFeedList(limit, offset)
        setUserCardLists(getSortedList(data.results, sort))
        handleFeedCount(data.count)
      } catch (error) {
        toast({ status: 'default', message: error.message })
      }
    }

    getUserCardLists()
  }, [pageParam, sort, countPerPage, handleFeedCount, toast])

  return (
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
  )
}

export default UserCardList
