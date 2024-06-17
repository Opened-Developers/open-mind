import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import FeedCardList from '../../components/FeedCardList'
import SocialShareContainer from '../../components/SocialShareContainer'
import { FloatButton } from '../../components/Buttons'
import QuestionModal from '../../components/QuestionModal/QuestionModal'
import getProfileById from '../../api/getProfileById'
import Toast from '../../components/Toast'

export default function IndividualFeedPage() {
  const { feedId } = useParams()
  const [profile, setProfile] = useState(null)
  const [errorInfo, setErrorInfo] = useState(null)

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

  useEffect(() => {
    loadProfile(feedId)
  }, [feedId])

  if (profile) {
    return (
      <div>
        <SocialShareContainer />
        <FeedCardList feedId={feedId} isMyFeed={false} profile={profile} />
        <Link to="answer">
          <FloatButton>답변</FloatButton>
        </Link>
        <QuestionModal profile={profile} />
        {errorInfo && <Toast>{errorInfo}</Toast>}
      </div>
    )
  }
  return <Toast>프로필 정보를 불러오는 중입니다.</Toast>
}
