import likeIcon from '../assets/icons/ic_like.svg'
import dislikeIcon from '../assets/icons/ic_dislike.svg'

export default function FeedCardLikes({ question }) {
  return (
    <div>
      <p>
        <img src={likeIcon} alt="좋아요" />
        좋아요
        {question.like}
      </p>
      <p>
        <img src={dislikeIcon} alt="싫어요" />
        싫어요
        {question.dislike}
      </p>
    </div>
  )
}
