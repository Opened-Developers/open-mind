import { useRef, useState } from 'react'
import { FillButton, FloatButton } from '../Buttons'
import messageIcon from '../../assets/icons/ic_messages.svg'
import closeIcon from '../../assets/icons/ic_close.svg'
import styles from './QuestionModal.module.css'
import { Textarea } from '../Inputs'
import createQuestion from '../../api/createQuestion'
import Toast from '../Toast'

export default function QuestionModal({
  profile,
  onLoadNew,
  errorMessage,
  setErrorMessage,
}) {
  const modalBackground = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [content, setContent] = useState('')
  const feedId = profile.id

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleModalBackground = (e) => {
    if (e.target === modalBackground.current) {
      setIsModalOpen(false)
    }
  }

  const handleChange = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = (e) => {
    const questionBody = {
      subjectId: feedId,
      content,
      like: 0,
      dislike: 0,
      team: '7-7',
      answer: {
        content: ' ',
        isRejected: false,
      },
    }

    if (content === '') {
      throw new Error('질문을 입력해주세요.')
    } else
      try {
        createQuestion(feedId, questionBody).then()
        onLoadNew(feedId)
        setContent('')
        return <Toast>{'질문이 성공적으로 등록되었습니다.'}</Toast>
      } catch (error) {
        setErrorMessage(error.message)
      } finally {
        e.preventDefault()
      }
    return null
  }

  if (errorMessage) {
    return <Toast>{errorMessage}</Toast>
  }

  return (
    <>
      {/* Add the float button */}
      <FloatButton onClick={handleModalOpen}>질문 작성</FloatButton>
      {/* Add the modal background */}
      {isModalOpen && (
        <div
          className={styles.modal}
          ref={modalBackground}
          role="button"
          tabIndex={0}
          onClick={handleModalBackground}
          onKeyDown={handleModalBackground}
        >
          <div className={styles['modal-content']} role={'dialog'}>
            <div className={styles['modal-header']}>
              <div className={styles['modal-header-title']}>
                <img
                  className={styles['modal-header-message-icon']}
                  src={messageIcon}
                  alt="질문 메시지 아이콘"
                />
                <h2>질문을 작성하세요</h2>
              </div>
              <button
                className={styles['modal-header-close-button']}
                type="button"
                onClick={handleModalClose}
                onKeyDown={handleModalClose}
              >
                <img src={closeIcon} alt="창 닫기 아이콘" />
              </button>
            </div>
            <div className={styles['modal-body']}>
              <div className={styles['modal-profile']}>
                <div>To.</div>
                <img
                  className={styles['user-img']}
                  src={profile.imageSource}
                  alt="프로필 사진"
                />
                <div>{profile.name}</div>
              </div>
              <form className={styles['question-form']} onSubmit={handleSubmit}>
                <Textarea
                  className={styles['question-form-textarea']}
                  name={'questionTextarea'}
                  id={'question'}
                  rows={7}
                  placeholder={'질문을 입력해 주세요'}
                  value={content}
                  onChange={handleChange}
                />
                <FillButton
                  className={styles['question-form-button']}
                  isSubmit
                  disabled={!content}
                >
                  질문 보내기
                </FillButton>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
