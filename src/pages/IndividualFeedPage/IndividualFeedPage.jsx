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
  const [offset, setOffset] = useState(0)
  const [next, setNext] = useState(null)
  const [errorInfo, setErrorInfo] = useState(null)
  const LIMIT = 10

  const localUserId = getLocalUserId()
  
  const listEnd = document.querySelector('.list-end')

  const handleLoadProfile = async (id) => {
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

  const handleLoadQuestions = useCallback(async (options) => {
    let response
    try {
      response = await getFeedQuestions(options)
      if (options.offset === 0) {
        setQuestions(response.results)
      } else {
        setQuestions((prevQuestions) => [prevQuestions, ...response.results])
      }
      setQuestionCount(response.count)
      setOffset((prevOffset) => prevOffset + LIMIT)
      setNext(response.next)
      setErrorInfo(null)
    } catch (error) {
      setErrorInfo(error.message)
    }

    return null
  }, [])

  useEffect(() => {
    handleLoadProfile(feedId).then()
  }, [feedId])

  useEffect(() => {
    if (offset === 0) {
      handleLoadQuestions({ feedId, limit: LIMIT, offset }).then()
    }
  }, [feedId, offset, handleLoadQuestions])

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && next !== null) {
              handleLoadQuestions({ feedId, limit: LIMIT, offset }).then()
            }
            if (entry.isIntersecting && next === null) {
              observer.disconnect()
            }
          })
        },
        { threshold: 0.2 }
      ),
    [feedId, offset, next, handleLoadQuestions]
  )

  if (listEnd) {
    observer.observe(listEnd) // listEnd가 존재하면 관찰 대상으로 등록
  }

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
        <Link to="answer">
          <FloatButton>답변</FloatButton>
        </Link>
        <QuestionModal
          profile={profile}
          handleLoadQuestion={handleLoadQuestions}
        />
        <div
          className="list-end"
          style={next === null && offset > 0 ? { display: 'none' } : {}}
        >
          로딩 중 ...
        </div>
        {errorInfo && <Toast>{errorInfo}</Toast>}
      </div>
    )
  }
  return <Toast>프로필 정보를 불러오는 중입니다.</Toast>
}
