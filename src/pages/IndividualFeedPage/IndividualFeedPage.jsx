import { Link, useParams } from 'react-router-dom'
import FeedCardList from '../../components/FeedCardList'
import SocialShareContainer from '../../components/SocialShareContainer'

// /post/6710

export default function IndividualFeedPage() {
  const { feedId } = useParams()

  return (
    <div>
      <SocialShareContainer />
      <FeedCardList feedId={feedId} isMyFeed={false} />
      {/* 로컬 스토리지 조건문 */}
      <Link to="answer">답변하러 가기</Link>
      <div className="style.modal_btn">질문 작성하기</div>
    </div>
  )
}
