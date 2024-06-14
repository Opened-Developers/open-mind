import { useParams } from 'react-router-dom'
import AnswerPage from './AnswerPage'

function AnswerPageContainer() {
  const { feedId } = useParams()

  return <AnswerPage feedId={feedId} />
}

export default AnswerPageContainer
