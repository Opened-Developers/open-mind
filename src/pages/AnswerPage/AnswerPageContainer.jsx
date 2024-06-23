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
  }, [feedId, loadProfile, questions])

  // 무한 api 요청 방지 의존성 배열 내 questions 삭제
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const questionId = String(questions[0]?.subjectId)
    if (feedId !== questionId) {
      onLoadNew(feedId).then()
    }
    if (offset === 0) {
      onLoadMore(feedId).then()
    }
  }, [feedId, offset, onLoadMore, onLoadNew])
  /* eslint-disable react-hooks/exhaustive-deps */
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
