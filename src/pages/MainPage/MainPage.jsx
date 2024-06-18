import { React, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './MainPage.module.css'
import getFeedListAll from '../../api/getFeedListAll'
import postNewFeed from '../../api/postNewFeed'
import icArrowRightBrown from '../../assets/icons/ic_arrow_right_brown.svg'
import imgLogo from '../../assets/images/img_logo.png'
import imgBackground from '../../assets/images/img_background.png'
import { FillButton, OutlineButton } from '../../components/Buttons'
import { InputText } from '../../components/Inputs'
import {
  debounce,
  getLocalUserId,
  createLocalUserId,
} from '../../modules/utils'

const localUserId = getLocalUserId()

function MainPage() {
  const [userName, setUserName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
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
    try {
      const { data } = await getFeedListAll()

      const isDuplicated = data.results.some(
        (result) => result.name === userName
      )

      if (isDuplicated) {
        setErrorMessage('중복된 이름입니다. 다른 이름을 입력해 주세요.')
        return true
      }
    } catch (error) {
      setErrorMessage(error.message)
      return true
    }

    return false
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (await checkDuplicatedName()) {
      return false
    }

    const { data } = await postNewFeed(userName)
    const newUserId = data.id

    createLocalUserId(newUserId)

    navigate(`/post/${newUserId}/answer`)

    return false
  }

  return (
    <section className={styles.MainPage}>
      <Link to="/list" className={styles.buttonQuestion}>
        <OutlineButton iconRight={icArrowRightBrown}>
          질문하러 가기
        </OutlineButton>
      </Link>
      <img
        className={`${styles.image} ${styles.logo}`}
        src={imgLogo}
        alt="로고 이미지"
      />
      <form className={styles.createFeed} onSubmit={handleSubmit}>
        <InputText
          type="text"
          placeholder="이름을 입력하세요"
          showIcon="true"
          onChange={debounce(handleNameChange, 50)}
        />
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <FillButton type="button" onClick={handleSubmit} disabled={!userName}>
          질문 받기
        </FillButton>
      </form>
      <img
        className={`${styles.image} ${styles.background}`}
        src={imgBackground}
        alt="배경 이미지"
      />
    </section>
  )
}

export default MainPage
