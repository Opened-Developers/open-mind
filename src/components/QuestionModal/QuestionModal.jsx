import { useRef, useState } from 'react'
import { FillButton, FloatButton } from '../Buttons'
import messageIcon from '../../assets/icons/ic_messages.svg'
import closeIcon from '../../assets/icons/ic_close.svg'
import styles from './QuestionModal.module.css'
import { Textarea } from '../Inputs'
import createQuestion from '../../api/createQuestion'
import Toast from '../Toast'

export default function QuestionModal({ profile }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalBackground = useRef(null)
  const [content, setContent] = useState('')
  const [errorInfo, setErrorInfo] = useState(null)

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
    const feedId = profile.id

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
    } else {
      createQuestion(feedId, questionBody)
        .then()
        .catch((error) => {
          setErrorInfo(error.message)
        })
        .finally(() => {
          setContent('')
        })
      e.preventDefault()
    }

    if (errorInfo) {
      return <Toast>{errorInfo}</Toast>
    }

    return <Toast>{'질문이 성공적으로 등록되었습니다.'}</Toast>
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
              <img src={messageIcon} alt="질문 메시지 아이콘" />
              <h2>질문을 작성하세요</h2>
              <button
                type="button"
                onClick={handleModalClose}
                onKeyDown={handleModalClose}
              >
                <img src={closeIcon} alt="창 닫기 아이콘" />
              </button>
            </div>
            <div className="modal-body">
              <div className={styles['modal-profile']}>
                <div>To.</div>
                <img src={profile.imageSource} alt="프로필 사진" />
                <div>{profile.name}</div>
              </div>
              <form onSubmit={handleSubmit} onChange={handleChange}>
                <Textarea
                  name={'questionTextatea'}
                  id={'question'}
                  rows={7}
                  placeholder={'질문을 입력해 주세요'}
                />
                <FillButton isSubmit disabled={!content}>
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
