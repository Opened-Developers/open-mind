import { useState } from 'react'
import { FillButton } from './Buttons'
import styles from './FeedCardAnswerEdit.module.css'

export default function FeedCardAnswerEdit({ question }) {
  const [answer, SetAnswer] = useState()

  const handleInputChange = (e) => {
    const nextValue = e.target.value
    SetAnswer(nextValue)
  }

  return (
    <div className={styles.container}>
      <p>{question.subjectId}</p>
      <form>
        <textarea
          value={answer}
          placeholder="답변을 입력해 주세요."
          onChange={handleInputChange}
        />
        <FillButton disabled={!answer} type="submit">
          답변 완료
        </FillButton>
      </form>
    </div>
  )
}
