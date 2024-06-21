import { useCallback, useEffect, useState } from 'react'
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

  const [errorInfo, setErrorInfo] = useState(null)

  const [questions, setQuestions] = useState([])
  const [questionCount, setQuestionCount] = useState(0)
  const [next, setNext] = useState(null)

  const handleLoadQuestions = useCallback(async () => {
    let response
    try {
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
    }
  }, [FeedId, offset])

  useEffect(() => {
    if (offset === 0) {
      handleLoadQuestions().then()
    }
  }, [FeedId, offset, handleLoadQuestions])

  const listEnd = document.querySelector('.list-end')

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        if (next !== null) {
          observer.unobserve(listEnd)
          handleLoadQuestions().then()
        }
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

  if (questionCount === 0) {
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

  if (questionCount > 0) {
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
