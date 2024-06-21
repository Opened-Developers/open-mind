import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './FeedCardList.module.css'
import messagesIcon from '../assets/icons/ic_messages.svg'
import emptyFeedIcon from '../assets/icons/ic_empty_feed.svg'
import FeedCard from './FeedCard'
import getFeedQuestions from '../api/getFeedQuestions'
import { useToast } from '../contexts/toastContextProvider'

export default function FeedCardList({
  isMyFeed,
  profile,
  subjectId,
  pageIsUpdating,
  endUpdating,
}) {
  const feedId = profile.id ? profile.id : subjectId // 최초 페이지 로드 시 profile get 전에 값 undefined 할당 방지
  const [offset, setOffset] = useState(0)
  const LIMIT = 10

  const isLoading = useRef(false)

  const [questions, setQuestions] = useState([])
  const [questionCount, setQuestionCount] = useState(0)
  const [next, setNext] = useState(null)

  const { toast } = useToast()

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleLoadQuestions = useCallback(async () => {
    if (isLoading.current) {
      // 로딩 중이면 중복 요청 방지
      return
    }
    let response
    try {
      isLoading.current = true
      response = await getFeedQuestions({
        feedId,
        offset,
        limit: LIMIT,
      })
      if (offset === 0) {
        setQuestions(response.results)
      } else {
        setQuestions((prevQuestions) => [...prevQuestions, ...response.results])
      }
      setQuestionCount(response.count)
      setOffset((prevOffset) => prevOffset + response.results.length)
      setNext(response.next)
    } catch (error) {
      toast({
        status: 'error',
        message: `${error}`,
      })
    } finally {
      isLoading.current = false
    }
  }, [feedId, offset])

  const handleUpdateQuestions = useCallback(async () => {
    if (isLoading.current) {
      return
    }
    try {
      isLoading.current = true
      const result = await getFeedQuestions({
        feedId,
        offset: 0,
        limit: offset,
      })
      setQuestions(result.results)
      setQuestionCount(result.count)
    } catch (error) {
      toast({
        status: 'error',
        message: `${error}`,
      })
    } finally {
      isLoading.current = false
    }
    endUpdating()
  }, [endUpdating, feedId, offset])
  /* eslint-disable react-hooks/exhaustive-deps */

  useEffect(() => {
    if (offset === 0) {
      handleLoadQuestions().then()
    }
    if (pageIsUpdating) {
      handleUpdateQuestions()
    }
  }, [
    feedId,
    offset,
    handleLoadQuestions,
    pageIsUpdating,
    handleUpdateQuestions,
  ])

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

  if (isLoading.current) {
    return (
      <div>
        <div className={styles['messages-container']}>
          <div className={styles['messages-container-summary']}>
            <img
              className={styles['messages-container-message-icon']}
              src={messagesIcon}
              alt="질문 메시지 아이콘"
            />
            <p>질문을 불러오고 있습니다.</p>
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
          <div className={styles['messages-container-summary']}>
            <img
              className={styles['messages-container-icon']}
              src={messagesIcon}
              alt="질문 메시지 아이콘"
            />
            <p>{questionCount}개의 질문이 있습니다.</p>
          </div>
        </div>
        <div className={styles['feed-card-container']}>
          {questions.map((question) => (
            <FeedCard
              key={question.id}
              question={question}
              isMyFeed={isMyFeed}
              profile={profile}
              onLoad={handleUpdateQuestions}
            />
          ))}
        </div>
        {next !== null && <div className="list-end">로딩 중 ...</div>}
      </div>
    )
  }
}
