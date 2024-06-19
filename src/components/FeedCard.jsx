import { useState } from 'react'
import FeedCardBadge from './FeedCardBadge'
import FeedCardQuestion from './FeedCardQuestion'
import FeedCardAnswer from './FeedCardAnswer'
import FeedCardAnswerEdit from './FeedCardAnswerEdit'
import FeedCardReaction from './FeedCardReaction'
import styles from './FeedCard.module.css'
import { MenuDropdown, MenuDropdownItem } from './Dropdown'

export default function FeedCard({
  question,
  isMyFeed,
  profile = null,
  onDeleteClick,
}) {
  const [isEditing, setIsEditing] = useState(false)

  const handleDeleteClick = () => {
    onDeleteClick(question.id)
  }

  const handleEditClick = () => {
    if (question.answer) {
      setIsEditing(!isEditing)
    }
  }

  const changeIsEditing = () => {
    setIsEditing(false)
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
          changeIsEditing={changeIsEditing}
        />
      ) : (
        question.answer && <FeedCardAnswer question={question} />
      )}
      <FeedCardReaction question={question} />
    </div>
  )
}
