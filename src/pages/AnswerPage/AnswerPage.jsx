import FeedCardList from '../../components/FeedCardList'
import SocialShareContainer from '../../components/SocialShareContainer'

export default function AnswerPage() {
  return (
    <div>
      <SocialShareContainer />
      <div>모두 삭제하기</div>
      <FeedCardList isMyFeed />
    </div>
  )
}
