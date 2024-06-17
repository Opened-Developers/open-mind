import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getProfileById from '../../api/getProfileById'
import AnswerPage from './AnswerPage'

function AnswerPageContainer() {
  const [profile, setProfile] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const { feedId } = useParams()

  const profileLoad = async (id) => {
    let result
    try {
      result = await getProfileById(id)
    } catch (error) {
      setErrorMessage(error.message)
    }
    setProfile(result)
  }

  useEffect(() => {
    profileLoad(feedId)
  }, [feedId])
  return (
    <AnswerPage feedId={feedId} profile={profile} errorMessage={errorMessage} />
  )
}

export default AnswerPageContainer
