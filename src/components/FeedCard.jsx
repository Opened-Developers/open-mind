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
import rejectAnswer from '../api/rejectAnswer'
import postNewAnswer from '../api/postNewAnswer'

export default function FeedCard({
  question,
  isMyFeed,
  profile,
  onLoadNew,
  errorInfo = null,
  setErrorInfo,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const feedId = profile.id
  const { toast } = useToast()

  const handleDeleteClick = async () => {
    try {
      await deleteFeedQuestion(question.id)
    } catch (error) {
      setErrorInfo(error)
      toast({ message: errorInfo.message, status: errorInfo.status })
    }
    await onLoadNew(feedId)
    toast({ message: '질문이 삭제되었습니다', status: 'success' })
  }

  const handleEditClick = () => {
    if (question.answer) {
      setIsEditing(!isEditing)
    }
  }

  const submitEdit = async () => {
    setIsEditing(false)
    onLoadNew(feedId)
    toast({ message: '답변이 수정되었습니다', status: 'success' })
  }

  const handleRejectClick = async () => {
    try {
      if (question.answer) {
        if (question.answer.isRejected) {
          toast({ message: '이미 거절된 답변입니다', status: 'error' })
        } else {
          await rejectAnswer(question.answer.id)
          toast({ message: '답변이 거절되었습니다', status: 'success' })
        }
      } else {
        await postNewAnswer(question.id, '거절', true)
        toast({ message: '답변이 거절되었습니다', status: 'success' })
      }
    } catch (error) {
      toast({ message: error.message, status: 'error' })
    }
    await onLoadNew(feedId)
  }

  if (errorInfo) {
    return toast({ message: errorInfo.message, status: errorInfo.status })
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
            <MenuDropdownItem onClick={handleRejectClick}>
              거절하기
            </MenuDropdownItem>
          </MenuDropdown>
        )}
      </div>
      <FeedCardQuestion key={question.id} question={question} />
      {isMyFeed ? (
        <FeedCardAnswerEdit
          question={question}
          profile={profile}
          isEditing={isEditing}
          submitEdit={submitEdit}
          onLoadNew={onLoadNew}
        />
      ) : (
        question.answer && (
          <FeedCardAnswer
            key={question.answer.id}
            question={question}
            profile={profile}
          />
        )
      )}
      <div className={styles['card-division-line']} />
      <FeedCardReaction question={question} />
    </div>
  )
}
