import { useParams } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { useToast } from '../../contexts/toastContextProvider'
import getProfileById from '../../api/getProfileById'
import getFeedQuestions from '../../api/getFeedQuestions'
import deleteFeedQuestion from '../../api/deleteFeedQuestion'
import AnswerPage from './AnswerPage'

function AnswerPageContainer() {
  const [profile, setProfile] = useState({})
  const [pageIsUpdating, setPageIsUpdating] = useState(false)
  const { feedId } = useParams()
  const { toast } = useToast()

  const loadProfile = useCallback(
    async (id) => {
      let result
      try {
        result = await getProfileById(id)
      } catch (error) {
        toast({ status: 'error', message: `${error}` })
      }
      setProfile(result)
    },
    [toast]
  )

  const handleOnClick = async () => {
    try {
      if (!profile.questionCount) {
        throw new Error('삭제할 질문이 없습니다')
      }
      const { results } = await getFeedQuestions({
        feedId,
        limit: profile.questionCount,
        offset: 0,
      })

      const deletePromises = results.map((question) =>
        deleteFeedQuestion(question.id)
      )
      await Promise.all(deletePromises)
      await loadProfile(feedId)
      setPageIsUpdating(true)
      toast({
        status: 'default',
        message: `모든 질문과 답변이 삭제되었습니다`,
      })
    } catch (error) {
      toast({ status: 'error', message: `${error}` })
    }
  }

  const endUpdating = () => {
    setPageIsUpdating(false)
  }

  useEffect(() => {
    loadProfile(feedId)
  }, [feedId, loadProfile])

  return (
    <AnswerPage
      profile={profile}
      onClick={handleOnClick}
      subjectId={feedId}
      pageIsUpdating={pageIsUpdating}
      endUpdating={endUpdating}
    />
  )
}

export default AnswerPageContainer
