import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useToast } from '../../contexts/toastContextProvider'
import deleteFeedQuestion from '../../api/deleteFeedQuestion'
import AnswerPage from './AnswerPage'

function AnswerPageContainer({
  loadProfile,
  profile,
  errorMessage,
  setErrorMessage,
  onLoadMore,
  onLoadNew,
  offset,
  next,
  questions,
  questionCount,
  isNewProfile,
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
      } else {
        throw new Error('삭제할 질문이 없습니다')
      }
    } catch (error) {
      toast({ status: 'error', message: `${error}` })
    }
  }

  const endUpdating = () => {
    setPageIsUpdating(false)
  }

  useEffect(() => {
    loadProfile(feedId).then()
  }, [feedId, loadProfile])

  // 무한 api 요청 방지 의존성 배열 내 questions 삭제
  /* eslint-disable react-hooks/exhaustive-deps */
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
        errorMessage={errorMessage}
        onClick={handleOnClick}
        setErrorMessage={setErrorMessage}
        onLoadMore={onLoadMore}
        onLoadNew={onLoadNew}
        offset={offset}
        next={next}
        questions={questions}
        questionCount={questionCount}
        pageIsUpdating={pageIsUpdating}
        endUpdating={endUpdating}
      />
    )
  }
}

export default AnswerPageContainer
