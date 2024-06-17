import { useEffect, useState } from 'react'
import styles from './FeedCardList.module.css'
import messagesIcon from '../assets/icons/ic_messages.svg'
import getFeedQuestions from '../api/getFeedQuestions'
import FeedCard from './FeedCard'

export default function FeedCardList({ feedId, isMyFeed, profile = null }) {
  const [questions, setQuestions] = useState([])
  const [questionCount, setQuestionCount] = useState(0)
  // const [paging, setPaging] = useState({ next: 0, previous: 0 })
  const [errorInfo, setErrorInfo] = useState(null)

  useEffect(() => {
    getFeedQuestions(feedId)
      .then((res) => {
        setQuestions(res.results)
        setQuestionCount(res.count)
        // setPaging({ next: res.next, previous: res.previous })
      })
      .catch((error) => {
        setErrorInfo(error.message)
      })
  }, [feedId])

  if (errorInfo) {
    return <div>{errorInfo}</div>
  }

  return questions.length === 0 ? (
    <div>
      <div className={styles['messages-container']}>
        <img src={messagesIcon} alt="질문 메시지 아이콘" />
        <p>아직 질문이 없습니다.</p>
      </div>
    </div>
  ) : (
    <div>
      <div className={styles['messages-container']}>
        <img src={messagesIcon} alt="질문 메시지 아이콘" />
        <p>{questionCount}개의 질문이 있습니다.</p>
      </div>
      <div className={styles['feed-card-container']}>
        {questions.map((question) => (
          <FeedCard
            key={question.id}
            question={question}
            isMyFeed={isMyFeed}
            profile={profile}
          />
        ))}
      </div>
      {questions.map((question) => (
        <FeedCard key={question.id} question={question} isMyFeed={isMyFeed} />
      ))}
    </div>
  )
}
