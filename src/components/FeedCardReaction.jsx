import { useState } from 'react'
import postQuestionReaction from '../api/postQuestionReaction'
import Toast from './Toast'
import { Dislike, Like } from './Reaction'

export default function FeedCardReaction({ question }) {
  const [errorInfo, setErrorInfo] = useState(null)
  const [like, setLike] = useState(question.like)
  const [dislike, setDislike] = useState(question.dislike)

  const handleLike = () => {
    postQuestionReaction(question.id, 'like')
      .then((res) => setLike(res.like))
      .catch((error) => {
        setErrorInfo(error.message)
        // 토스트 메시지로 에러 메시지를 표시하는 코드를 작성합니다.
        setTimeout(() => {
          setErrorInfo(null)
        }, 3000)
      })
  }

  const handleDislike = () => {
    postQuestionReaction(question.id, 'dislike')
      .then((res) => setDislike(res.dislike))
      .catch((error) => {
        setErrorInfo(error.message)
        // 토스트 메시지로 에러 메시지를 표시하는 코드를 작성합니다.
        setTimeout(() => {
          setErrorInfo(null)
        }, 3000)
      })
  }

  return (
    <div>
      <Like counter={like} onClick={handleLike} />
      <Dislike counter={dislike} onClick={handleDislike} />
      {errorInfo !== null && <Toast>{errorInfo}</Toast>}
    </div>
  )
}
