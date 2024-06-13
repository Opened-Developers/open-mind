import { useEffect, useState } from 'react'
import messagesIcon from '../assets/icons/ic_messages.svg'
import getFeedQuestions from '../api/getFeedQuestions'
import FeedCard from './FeedCard'

export default function FeedCardList({ feedId, isMyFeed }) {
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
      <div>
        <img src={messagesIcon} alt="질문 메시지 아이콘" />
        아직 질문이 없습니다.
      </div>
    </div>
  ) : (
    <div>
      <div>
        <img src={messagesIcon} alt="질문 메시지 아이콘" />
        {questionCount}
        개의 질문이 있습니다.
      </div>
      <div>
        {questions.map((question) => (
          <FeedCard key={question.id} question={question} isMyFeed={isMyFeed} />
        ))}
      </div>
    </div>
  )
}
