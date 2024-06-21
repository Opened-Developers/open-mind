import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './UserCard.module.css'
import icMessages from '../../../assets/icons/ic_messages.svg'

function UserCard({ id, image, userName, questionCount }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/post/${id}/`)
  }
  return (
    <div role="presentation" className={styles.UserCard} onClick={handleClick}>
      <div className={styles.profile}>
        <img src={image} alt="" />
        <p className="body-2">{userName}</p>
      </div>
      <div className={`${styles.question} caption-1`}>
        <div>
          <img src={icMessages} alt="메세지 아이콘" />
          <p>받은 질문</p>
        </div>
        <p>{`${questionCount}개`}</p>
      </div>
    </div>
  )
}

export default UserCard
