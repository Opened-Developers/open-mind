import { useState } from 'react'
import postQuestionReaction from '../api/postQuestionReaction'
import likeIcon from '../assets/icons/ic_like.svg'
import dislikeIcon from '../assets/icons/ic_dislike.svg'

export default function FeedCardReaction({ question }) {
  const [errorInfo, setErrorInfo] = useState(null)
  const [like, setLike] = useState(question.like)
  const [dislike, setDislike] = useState(question.dislike)

  const handleLike = () => {
    postQuestionReaction(question.id, 'like')
      .then((res) => setLike(res.like))
      .catch((error) => {
        setErrorInfo(error.message)
        alert(errorInfo)
      })
  }

  const handleDislike = () => {
    postQuestionReaction(question.id, 'dislike')
      .then((res) => setDislike(res.dislike))
      .catch((error) => {
        setErrorInfo(error.message)
        alert(errorInfo)
      })
  }

  return (
    <div>
      <button type={'button'} onClick={handleLike}>
        <img src={likeIcon} alt="좋아요" />
        좋아요
        {like}
      </button>
      <button type={'button'} onClick={handleDislike}>
        <img src={dislikeIcon} alt="싫어요" />
        싫어요
        {dislike}
      </button>
    </div>
  )
}
