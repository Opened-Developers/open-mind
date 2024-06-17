import { useState, useEffect } from 'react'
import { FillButton } from './Buttons'
import styles from './FeedCardAnswerEdit.module.css'
import postNewAnswer from '../api/postNewAnswer'

export default function FeedCardAnswerEdit({ profile, question }) {
  const [inputText, SetInputText] = useState('')
  const [answer, setAnswer] = useState(
    question.answer ? question.answer.content : ''
  )
  const handleInputChange = (e) => {
    const nextValue = e.target.value
    SetInputText(nextValue)
  }

  const handleButtonClick = async () => {
    if (inputText) {
      const result = await postNewAnswer(question.id, inputText)
      setAnswer(result.content)
    }
  }

  useEffect(() => {}, [answer])

  return (
    <div className={styles.body}>
      <img src={profile.imageSource} alt="프로필 사진" />
      <div className={styles.container}>
        <p>{profile.name}</p>
        {!answer ? (
          <form>
            <textarea
              value={inputText}
              placeholder="답변을 입력해 주세요."
              onChange={handleInputChange}
            />
            <FillButton
              disabled={!inputText}
              type="submit"
              onClick={handleButtonClick}
            >
              답변 완료
            </FillButton>
          </form>
        ) : (
          <p>{answer}</p>
        )}
      </div>
    </div>
  )
}
