import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import getFeedQuestions from '../../api/getFeedQuestions'
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
  const { feedId } = useParams()

  const handleOnClick = async () => {
    try {
      const { results } = await getFeedQuestions(feedId)
      if (results.length) {
        const deletePromises = results.map((question) =>
          deleteFeedQuestion(question.id)
        )
        await Promise.all(deletePromises)
        await loadProfile(feedId)
      } else {
        throw new Error('삭제할 질문이 없습니다')
      }
    } catch (error) {
      setErrorMessage(error)
    }
  }

  useEffect(() => {
    loadProfile(feedId).then()
  }, [feedId, loadProfile])

  useEffect(() => {
    if (offset === 0) {
      onLoadMore(feedId).then()
    }
  }, [feedId, offset, onLoadMore])

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
      />
    )
  }
}

export default AnswerPageContainer
