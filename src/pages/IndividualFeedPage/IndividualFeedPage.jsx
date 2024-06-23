import { useEffect, useMemo, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import FeedCardList from '../../components/FeedCardList'
import SocialShareContainer from '../../components/SocialShareContainer'
import { FloatButton } from '../../components/Buttons'
import QuestionModal from '../../components/QuestionModal'
import Toast from '../../components/Toast'
import { getLocalUserId } from '../../modules/utils'
import styles from './IndividualFeedPage.module.css'
import openMindImg from '../../assets/images/img_openmind.png'
import logo from '../../assets/images/img_logo.png'

export default function IndividualFeedPage({
  loadProfile,
  profile,
  errorMessage,
  setErrorMessage,
  onLoadMore,
  offset,
  next,
  questions,
  questionCount,
  onLoadNew,
}) {
  const { feedId } = useParams()
  const localUserId = getLocalUserId()
  const listEndRef = useRef(null)

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (next !== null) {
              observer.unobserve(listEndRef.current)
              onLoadMore(feedId)
            }
            observer.disconnect()
          }
        },
        { threshold: 0.5 }
      ),
    [next, onLoadMore, feedId]
  )

  useEffect(() => {
    if (listEndRef.current) {
      observer.observe(listEndRef.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [observer])

  useEffect(() => {
    loadProfile(feedId).then()
  }, [feedId, loadProfile, questions])

  useEffect(() => {
    if (offset === 0) {
      onLoadMore(feedId).then()
    }
    if (feedId !== questions[0]?.feedId) {
      onLoadNew(feedId)
    }
  }, [feedId, offset, onLoadMore, onLoadNew, questions])

  if (profile) {
    return (
      <div className={styles.background}>
        <header className={styles.header}>
          <img
            className={styles.backgroundImg}
            src={openMindImg}
            alt="실 전화기를 사용하는 두 사람"
          />
          <img className={styles.logo} src={logo} alt="오픈마인드 로고" />
          <img
            src={profile.imageSource}
            alt="프로필 사진"
            className={styles['user-img']}
          />
          <p className={styles['user-name']}>{profile.name}</p>
          <SocialShareContainer />
        </header>
        <main className={styles.main}>
          <section className={styles['feed-card-list']}>
            <FeedCardList
              isMyFeed={false}
              profile={profile}
              onLoadNew={onLoadNew}
              questions={questions}
              questionCount={questionCount}
            />
            {next !== null && (
              <div className="list-end" ref={listEndRef}>
                로딩 중 ...
              </div>
            )}
          </section>
        </main>
        <div className={styles['button-floating']}>
          {localUserId === feedId ? ( // 로그인한 사용자와 프로필 주인이 같은 경우 답변하기 버튼을 보여줍니다.
            <Link to="answer">
              <FloatButton isLink>답변하기</FloatButton>
            </Link>
          ) : (
            <QuestionModal
              profile={profile}
              onLoadNew={onLoadNew}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
        </div>
        {errorMessage && <Toast>{errorMessage}</Toast>}
      </div>
    )
  }
  return <Toast>프로필 정보를 불러오는 중입니다.</Toast>
}
