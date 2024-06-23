import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
  isFirstLoad,
}) {
  const [pageIsUpdating, setPageIsUpdating] = useState()
  const { feedId } = useParams()

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
      setErrorMessage(error)
    }
  }

  const endUpdating = () => {
    setPageIsUpdating(false)
  }

  useEffect(() => {
    loadProfile(feedId).then()
  }, [feedId, loadProfile, questions])

  useEffect(() => {
    if (!isFirstLoad) {
      return
    }

    const questionSubjectId = questions[0]?.subjectId
    if (!questionSubjectId) {
      return
    }

    if (feedId === String(questionSubjectId)) {
      return
    }
    onLoadNew(feedId).then()
  }, [feedId, onLoadMore, onLoadNew, questions, isFirstLoad])

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
