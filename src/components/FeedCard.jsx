import { useState } from 'react'
import FeedCardBadge from './FeedCardBadge'
import FeedCardQuestion from './FeedCardQuestion'
import FeedCardAnswer from './FeedCardAnswer'
import FeedCardAnswerEdit from './FeedCardAnswerEdit'
import FeedCardReaction from './FeedCardReaction'
import styles from './FeedCard.module.css'
import { MenuDropdown, MenuDropdownItem } from './Dropdown'
import deleteFeedQuestion from '../api/deleteFeedQuestion'
import { useToast } from '../contexts/toastContextProvider'

export default function FeedCard({
  question,
  isMyFeed,
  profile = null,
  onLoad,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleDeleteClick = async () => {
    try {
      await deleteFeedQuestion(question.id)
      await onLoad()
      toast({ status: 'default', message: '질문이 삭제되었습니다' })
    } catch (error) {
      toast({ status: 'error', message: `${error}` })
    }
  }

  const handleEditClick = () => {
    if (question.answer) {
      setIsEditing(!isEditing)
    } else {
      toast({
        status: 'error',
        message: '먼저 답변을 작성해주세요',
      })
    }
  }

  const submitEdit = async () => {
    setIsEditing(false)
    toast({
      status: 'default',
      message: '답변 수정이 완료되었습니다',
    })
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
    </div>
  )
}
