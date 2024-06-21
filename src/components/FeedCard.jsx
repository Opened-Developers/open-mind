import { useState } from 'react'
import FeedCardBadge from './FeedCardBadge'
import FeedCardQuestion from './FeedCardQuestion'
import FeedCardAnswer from './FeedCardAnswer'
import FeedCardAnswerEdit from './FeedCardAnswerEdit'
import FeedCardReaction from './FeedCardReaction'
import styles from './FeedCard.module.css'
import { MenuDropdown, MenuDropdownItem } from './Dropdown'
import deleteFeedQuestion from '../api/deleteFeedQuestion'
import Toast from './Toast'

export default function FeedCard({
  question,
  isMyFeed,
  profile = null,
  onLoad,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [errorInfo, setErrorInfo] = useState(null)

  const handleDeleteClick = async () => {
    try {
      await deleteFeedQuestion(question.id)
    } catch (error) {
      setErrorInfo(error.message)
    }
    await onLoad()
  }

  const handleEditClick = () => {
    if (question.answer) {
      setIsEditing(!isEditing)
    }
  }

  const submitEdit = async () => {
    setIsEditing(false)
    await onLoad()
  }

  return (
    <div className={styles['card-container']}>
      <div className={styles['card-head-container']}>
        <FeedCardBadge isAnswered={question.answer !== null} />
        {isMyFeed && (
          <MenuDropdown>
            <MenuDropdownItem onClick={handleEditClick}>
              수정하기
            </MenuDropdownItem>
            <MenuDropdownItem onClick={handleDeleteClick}>
              삭제하기
            </MenuDropdownItem>
          </MenuDropdown>
        )}
      </div>
      <FeedCardQuestion question={question} />
      {isMyFeed ? (
        <FeedCardAnswerEdit
          question={question}
          profile={profile}
          isEditing={isEditing}
          submitEdit={submitEdit}
          onLoad={onLoad}
        />
      ) : (
        question.answer && (
          <FeedCardAnswer question={question} profile={profile} />
        )
      )}
      <div className={styles['card-division-line']} />
      <FeedCardReaction question={question} />
      {errorInfo && <Toast>{errorInfo}</Toast>}
    </div>
  )
}
