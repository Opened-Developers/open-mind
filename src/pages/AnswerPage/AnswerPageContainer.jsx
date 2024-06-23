import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import deleteFeedQuestion from '../../api/deleteFeedQuestion'
import AnswerPage from './AnswerPage'
import { useToast } from '../../contexts/toastContextProvider'

function AnswerPageContainer({
  loadProfile,
  profile,
  onLoadMore,
  onLoadNew,
  offset,
  next,
  questions,
  questionCount,
  isNewProfile,
  errorInfo,
  setErrorInfo,
}) {
  const [pageIsUpdating, setPageIsUpdating] = useState()
  const { feedId } = useParams()
  const { toast } = useToast()

  const handleOnClick = async () => {
    try {
      if (questions.length) {
        const deletePromises = questions.map((question) =>
          deleteFeedQuestion(question.id)
        )
        await Promise.all(deletePromises)
        await onLoadNew(feedId)
        setPageIsUpdating(true)
        toast({ message: '전체 질문이 삭제되었습니다', status: 'success' })
      } else {
        toast({ message: '삭제할 질문이 없습니다', status: 'error' })
      }
    } catch (error) {
      setErrorInfo(error)
      toast({ message: error.message, status: error.status })
    }
  }

  const endUpdating = () => {
    setPageIsUpdating(false)
  }

  useEffect(() => {
    loadProfile(feedId).then()
  }, [feedId, loadProfile])

  useEffect(() => {
    if (isNewProfile) {
      // 새 프로필에 들어가면 질문도 새로 로딩합니다.
      onLoadNew(feedId).then()
    }
    // 새 프로필이 아닌 경우 질문을 새로 로딩할지 결정합니다.
    const questionSubjectId = questions[0]?.subjectId
    if (questionSubjectId === undefined) {
      // 질문 받은 아이디를 찾을 수 없는 경우 질문이 0개이므로 그만 로딩합니다.
      return
    }
    if (feedId !== String(questionSubjectId)) {
      // 질문 받은 아이디가 주소의 아이디와 다를 경우 질문을 새로 로딩합니다.
      onLoadNew(feedId).then()
    }
  }, [feedId, onLoadMore, onLoadNew, questions, isNewProfile])

  if (profile) {
    return (
      <AnswerPage
        profile={profile}
        onClick={handleOnClick}
        onLoadMore={onLoadMore}
        onLoadNew={onLoadNew}
        offset={offset}
        next={next}
        questions={questions}
        questionCount={questionCount}
        pageIsUpdating={pageIsUpdating}
        endUpdating={endUpdating}
        errorInfo={errorInfo}
        setErrorInfo={setErrorInfo}
      />
    )
  }
}

export default AnswerPageContainer
