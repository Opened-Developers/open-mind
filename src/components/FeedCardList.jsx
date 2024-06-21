import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './FeedCardList.module.css'
import messagesIcon from '../assets/icons/ic_messages.svg'
import emptyFeedIcon from '../assets/icons/ic_empty_feed.svg'
import FeedCard from './FeedCard'
import getFeedQuestions from '../api/getFeedQuestions'
import Toast from './Toast'

export default function FeedCardList({ isMyFeed, profile }) {
  const FeedId = profile.id
  const [offset, setOffset] = useState(0)
  const LIMIT = 10

  const [isLoading, setIsLoading] = useState(false)
  const [errorInfo, setErrorInfo] = useState(null)

  const [questions, setQuestions] = useState([])
  const [questionCount, setQuestionCount] = useState(0)
  const [next, setNext] = useState(null)

  const handleLoadQuestions = useCallback(async () => {
    if (isLoading) {
      return
    }
    let response
    try {
      setIsLoading(true)
      response = await getFeedQuestions({ FeedId, offset, limit: LIMIT })
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
  }, [FeedId, offset, isLoading])

  useEffect(() => {
    if (offset === 0) {
      handleLoadQuestions().then()
    }
  }, [FeedId, offset, handleLoadQuestions])

  const listEnd = useRef(document.querySelector('.list-end'))

  const observer = new IntersectionObserver(
    (entries) => {
      if (listEnd.current) {
        if (isLoading || questionCount === 0) {
          observer.disconnect()
        }
        if (questionCount > 0 && entries[0].isIntersecting) {
          observer.unobserve(listEnd.current)
          handleLoadQuestions().then()
        }
      }
    },
    { threshold: 0.5 }
  )

  if (listEnd.current) {
    observer.observe(listEnd.current)
  }

  if (errorInfo) {
    return <Toast>{errorInfo}</Toast>
  }

  if (isLoading) {
    return (
      <div>
        <div className={styles['messages-container']}>
          <div className={styles['messages-container-summary']}>
            <img
              className={styles['messages-container-message-icon']}
              src={messagesIcon}
              alt="질문 메시지 아이콘"
            />
            <p>질문을 불러오는 중입니다.</p>
          </div>
          <img
            className={styles['messages-container-empty-icon']}
            src={emptyFeedIcon}
            alt="빈 피드 아이콘"
          />
        </div>
      </div>
    )
  }

  if (!isLoading || questionCount === 0) {
    return (
      <div>
        <div className={styles['messages-container']}>
          <div className={styles['messages-container-summary']}>
            <img
              className={styles['messages-container-message-icon']}
              src={messagesIcon}
              alt="질문 메시지 아이콘"
            />
            <p>아직 질문이 없습니다.</p>
          </div>
          <img
            className={styles['messages-container-empty-icon']}
            src={emptyFeedIcon}
            alt="빈 피드 아이콘"
          />
        </div>
      </div>
    )
  }

  if (!isLoading || questionCount > 0) {
    return (
      <div>
        <div className={styles['messages-container']}>
          <img
            className={styles['messages-container-icon']}
            src={messagesIcon}
            alt="질문 메시지 아이콘"
          />
          <p>{questionCount}개의 질문이 있습니다.</p>
        </div>
        <div className={styles['feed-card-container']}>
          {questions.map((question) => (
            <FeedCard
              key={question.id}
              question={question}
              isMyFeed={isMyFeed}
              profile={profile}
              onLoad={handleLoadQuestions}
            />
          ))}
        </div>
        {next !== null && <div className="list-end">로딩 중 ...</div>}
        {errorInfo && <Toast>{errorInfo}</Toast>}
      </div>
    )
  }
}
