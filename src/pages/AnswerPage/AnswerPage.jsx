import { useParams } from 'react-router-dom'
import FeedCardList from '../../components/FeedCardList'
import SocialShareContainer from '../../components/SocialShareContainer'

export default function AnswerPage() {
  const { feedId } = useParams()

  return (
    <div>
      <SocialShareContainer />
      <div>모두 삭제하기</div>
      <FeedCardList feedId={feedId} isMyFeed />
    </div>
  )
}
