import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './AnswerPage.module.css'
import SocialShareContainer from '../../components/SocialShareContainer'
import FeedCardList from '../../components/FeedCardList'
import { FloatButton } from '../../components/Buttons'
import logo from '../../assets/images/img_logo.png'
import openMindImg from '../../assets/images/img_openmind.png'

import getFeedQuestions from '../../api/getFeedQuestions'

import Toast from '../../components/Toast'

function AnswerPage({ profile, errorMessage = null, onClick }) {
  const { feedId } = useParams()
  const [questions, setQuestions] = useState([])
  const [questionCount, setQuestionCount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [next, setNext] = useState(null)
  const [errorInfo, setErrorInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const LIMIT = 10
  const listEnd = document.querySelector('.list-end')

  const handleLoadQuestions = useCallback(async () => {
    if (isLoading) {
      return
    }
    let response
    try {
      setIsLoading(true)
      response = await getFeedQuestions({ feedId, offset, limit: LIMIT })
      if (offset === 0) {
        setQuestions(response.results)
      } else {
        setQuestions((prevQuestions) => [...prevQuestions, ...response.results])
      }
      setQuestionCount(response.count)
      setOffset((prevOffset) => prevOffset + response.results.length)
      setNext(response.next)
      setErrorInfo(null)
    } catch (error) {
      setErrorInfo(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [feedId, offset, isLoading])

  useEffect(() => {
    if (offset === 0) {
      handleLoadQuestions().then()
    }
  }, [feedId, offset, handleLoadQuestions])

  const observer = new IntersectionObserver(
    (entries) => {
      if (questionCount > 0 && entries[0].isIntersecting) {
        observer.unobserve(listEnd)
        handleLoadQuestions().then()
      } else if (questionCount === 0) {
        observer.disconnect()
      }
    },
    { threshold: 0.5 }
  )

  if (listEnd) {
    observer.observe(listEnd)
  }

  if (errorInfo) {
    return <Toast>{errorInfo}</Toast>
  }

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <img
          className={styles.backgroundImg}
          src={openMindImg}
          alt="실 전화기를 사용하는 두 사람"
        />
        <img className={styles.logo} src={logo} alt="오픈마인드 로고" />
        <img
          src={profile.imageSource}
          alt="프로필 사진"
          className={styles.userImg}
        />
        <p className={styles.nickname}>{profile.name}</p>
        <SocialShareContainer />
        <FloatButton onClick={onClick} size="small">
          삭제
        </FloatButton>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <FeedCardList
            feedId={feedId}
            isMyFeed
            profile={profile}
            questions={questions}
            questionCount={questionCount}
          />
        </section>
        <div
          className="list-end"
          style={next === null ? { display: 'none' } : {}}
        >
          로딩 중 ...
        </div>
        {errorMessage?.message && (
          <div className={styles.error}>{errorMessage.message}</div>
        )}
      </main>
    </div>
  )
}

export default AnswerPage
