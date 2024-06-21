import { useEffect, useState } from 'react'
import { FillButton } from './Buttons'
import { Textarea } from './Inputs'
import { getRelativeDate } from '../modules/utils'
import styles from './FeedCardAnswerEdit.module.css'
import postNewAnswer from '../api/postNewAnswer'
import editAnswer from '../api/editAnswer'
import { useToast } from '../contexts/toastContextProvider'

export default function FeedCardAnswerEdit({
  profile,
  question,
  isEditing,
  submitEdit,
  onLoad,
}) {
  const [inputText, setInputText] = useState('')
  const [answer, setAnswer] = useState(
    question.answer ? question.answer.content : ''
  )
  const { toast } = useToast()

  const handleInputChange = (e) => {
    const nextValue = e.target.value
    setInputText(nextValue)
  }

  const handleButtonClick = async () => {
    try {
      if (isEditing) {
        await editAnswer(question.answer.id, inputText)
        await submitEdit()
      } else if (inputText) {
        await postNewAnswer(question.id, inputText)
        await onLoad()
        toast({
          status: 'default',
          message: '답변 작성이 완료되었습니다',
        })
      }
      setAnswer(inputText)
    } catch (error) {
      toast({
        status: 'error',
        message: `${error}`,
      })
    }
  }

  useEffect(() => {
    if (isEditing) {
      setInputText(question.answer.content)
      setAnswer('')
    } else if (question.answer) {
      setAnswer(question.answer.content)
    }
  }, [isEditing, answer, question])

  return (
    <div className={styles.body}>
      <img src={profile.imageSource} alt="프로필 사진" />
      <div className={styles.container}>
        <div className={styles['text-container']}>
          <span className={styles.name}>{profile.name}</span>
          <span className={styles['relative-date']}>
            {getRelativeDate(Date.now())}
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
