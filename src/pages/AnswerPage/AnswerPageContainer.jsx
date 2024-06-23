import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
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
  const [errorMessage, setErrorMessage] = useState(null)
  const { feedId } = useParams()

  const handleOnClick = async () => {
    try {
      const { results } = await getFeedQuestions({
        feedId,
        limit: profile.questionCount,
        offset: 0,
      })
      if (results.length) {
        const deletePromises = results.map((question) =>
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
        endUpdating={endUpdating}
      />
    )
  }
}

export default AnswerPageContainer
