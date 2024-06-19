import { useState, useEffect } from 'react'
import { FillButton } from './Buttons'
import { Textarea } from './Inputs'
import useRelativeDate from '../hooks/useRelativeDate'
import styles from './FeedCardAnswerEdit.module.css'
import postNewAnswer from '../api/postNewAnswer'
import putAnswer from '../api/patchAnswer'

export default function FeedCardAnswerEdit({
  profile,
  question,
  isEditing,
  changeIsEditing,
}) {
  const [inputText, setInputText] = useState('')
  const [answer, setAnswer] = useState(
    question.answer ? question.answer.content : ''
  )
  const handleInputChange = (e) => {
    const nextValue = e.target.value
    setInputText(nextValue)
  }

  const handleButtonClick = async () => {
    if (isEditing) {
      await putAnswer(question.answer.id, inputText)
      setAnswer(inputText)
      changeIsEditing()
    } else if (inputText) {
      const result = await postNewAnswer(question.id, inputText)
      setAnswer(result.content)
    }
  }

  useEffect(() => {
    if (isEditing) {
      setInputText(question.answer.content)
      setAnswer('')
    }
  }, [isEditing, answer, question])

  return (
    <div className={styles.body}>
      <img src={profile.imageSource} alt="프로필 사진" />
      <div className={styles.container}>
        <div className={styles['text-container']}>
          <span className={styles.name}>{profile.name}</span>
          <span className={styles['relative-date']}>
            {useRelativeDate(Date.now())}
          </span>
        </div>
        {!answer ? (
          <form>
            <Textarea
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
