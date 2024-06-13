import { React, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './MainPage.module.css'
import getFeedList from '../../api/getFeedList'
import postNewFeed from '../../api/postNewFeed'
import icPerson from '../../assets/icons/ic_person.svg'
import imgLogo from '../../assets/images/img_logo.png'
import imgBackground from '../../assets/images/img_background.png'
import {
  debounce,
  getLocalUserId,
  createLocalUserId,
} from '../../modules/utils'

const localUserId = getLocalUserId()

function MainPage() {
  const [userName, setUserName] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (localUserId) {
      navigate(`/post/${localUserId}/answer`)
    }
  }, [navigate])

  const handleNameChange = (e) => {
    setUserName(e.target.value)
  }

  const checkDuplicatedName = async () => {
    const { data, errorMessage } = await getFeedList()

    if (!data) {
      setError(errorMessage)
      return true
    }

    const isDuplicated = data.results.some((result) => result.name === userName)

    if (isDuplicated) {
      setError('중복된 이름입니다.')
      return true
    }

    return false
  }

  const handleAnswerClick = async () => {
    if (await checkDuplicatedName()) {
      return false
    }

    const { data } = await postNewFeed(userName)
    const newUserId = data.id

    createLocalUserId(newUserId)

    navigate(`/post/${newUserId}/answer`)

    return false
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleAnswerClick()
    }
  }

  return (
    <section className={styles.MainPage}>
      <Link to="/list" className={styles.buttonQuestion}>
        질문하러 가기
      </Link>
      <img
        className={`${styles.image} ${styles.logo}`}
        src={imgLogo}
        alt="로고 이미지"
      />
      <div className={styles.createFeed}>
        <div className={styles.nameBox}>
          <img className={styles.person} src={icPerson} alt="" />
          <input
            className={styles.name}
            type="text"
            placeholder="이름을 입력하세요"
            onChange={debounce(handleNameChange, 50)}
            onKeyDown={handleKeyDown}
          />
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button
          className={styles.buttonAnswer}
          type="button"
          onClick={handleAnswerClick}
          disabled={!userName}
        >
          질문 받기
        </button>
      </div>
      <img
        className={`${styles.image} ${styles.background}`}
        src={imgBackground}
        alt="배경 이미지"
      />
    </section>
  )
}

export default MainPage
