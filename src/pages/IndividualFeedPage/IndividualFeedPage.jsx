import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import FeedCardList from '../../components/FeedCardList'
import SocialShareContainer from '../../components/SocialShareContainer'
import { FloatButton } from '../../components/Buttons'
import QuestionModal from '../../components/QuestionModal/QuestionModal'
import getProfileById from '../../api/getProfileById'
import Toast from '../../components/Toast'
import getFeedQuestions from '../../api/getFeedQuestions'
import { getLocalUserId } from '../../modules/utils'

export default function IndividualFeedPage() {
  const { feedId } = useParams()
  const [profile, setProfile] = useState(null)
  const [questions, setQuestions] = useState([])
  const [questionCount, setQuestionCount] = useState(0)
  const [errorInfo, setErrorInfo] = useState(null)

  const localUserId = getLocalUserId()

  const loadProfile = async (id) => {
    let response
    try {
      response = await getProfileById(id)
      setProfile(response)
      setErrorInfo(null)
    } catch (error) {
      setErrorInfo(error.message)
    }
    return null
  }

  const loadQuestions = async (id) => {
    let response
    try {
      response = await getFeedQuestions(id)
      setQuestions(response.results)
      setQuestionCount(response.count)
      setErrorInfo(null)
    } catch (error) {
      setErrorInfo(error.message)
    }
    return null
  }

  useEffect(() => {
    loadProfile(feedId)
  }, [feedId])

  useEffect(() => {
    loadQuestions(feedId)
  }, [feedId])

  if (errorInfo) {
    return <Toast>{errorInfo}</Toast>
  }

  if (profile) {
    return (
      <div>
        <SocialShareContainer />
        <FeedCardList
          questions={questions}
          questionCount={questionCount}
          isMyFeed={false}
          profile={profile}
          errorInfo={errorInfo}
        />
        {localUserId === feedId ? (
          <Link to="answer">
            <FloatButton>답변하기</FloatButton>
          </Link>
        ) : (
          <QuestionModal profile={profile} handleLoadQuestion={loadQuestions} />
        )}
        {errorInfo && <Toast>{errorInfo}</Toast>}
      </div>
    )
  }
  return <Toast>프로필 정보를 불러오는 중입니다.</Toast>
}
