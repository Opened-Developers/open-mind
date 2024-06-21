import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getProfileById from '../../api/getProfileById'
import getFeedQuestions from '../../api/getFeedQuestions'
import deleteFeedQuestion from '../../api/deleteFeedQuestion'
import AnswerPage from './AnswerPage'

function AnswerPageContainer() {
  const [profile, setProfile] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [questionCount, setQuestionCount] = useState(0)
  const [questions, setQuestions] = useState([])
  const [errorInfo, setErrorInfo] = useState(null)
  const { feedId } = useParams()

  const loadProfile = async (id) => {
    let result
    try {
      result = await getProfileById(id)
    } catch (error) {
      setErrorMessage(error.message)
    }
    setProfile(result)
  }

  const handleLoadQuestions = async (id) => {
    let response
    try {
      response = await getFeedQuestions({ feedId: id })
      setQuestions(response.results)
      setQuestionCount(response.count)
      setErrorInfo(null)
    } catch (error) {
      setErrorInfo(error.message)
    }
  }

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
    loadProfile(feedId)
    handleLoadQuestions(feedId)
  }, [feedId])

  return (
    <AnswerPage
      feedId={feedId}
      profile={profile}
      errorMessage={errorMessage}
      onClick={handleOnClick}
      onLoad={handleLoadQuestions}
      questionCount={questionCount}
      questions={questions}
      errorInfo={errorInfo}
    />
  )
}

export default AnswerPageContainer
