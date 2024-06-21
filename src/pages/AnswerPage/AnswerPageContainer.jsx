import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import getProfileById from '../../api/getProfileById'
import getFeedQuestions from '../../api/getFeedQuestions'
import deleteFeedQuestion from '../../api/deleteFeedQuestion'
import AnswerPage from './AnswerPage'

function AnswerPageContainer() {
  const [profile, setProfile] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [pageIsUpdating, setPageIsUpdating] = useState(false)
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
        await loadProfile(feedId)
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
    loadProfile(feedId)
  }, [feedId])

  return (
    <AnswerPage
      profile={profile}
      errorMessage={errorMessage}
      onClick={handleOnClick}
      subjectId={feedId}
      pageIsUpdating={pageIsUpdating}
      endUpdating={endUpdating}
    />
  )
}

export default AnswerPageContainer
