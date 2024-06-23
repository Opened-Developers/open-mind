import { useEffect, useMemo, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import FeedCardList from '../../components/FeedCardList'
import SocialShareContainer from '../../components/SocialShareContainer'
import { FloatButton } from '../../components/Buttons'
import QuestionModal from '../../components/QuestionModal'
import { getLocalUserId } from '../../modules/utils'
import styles from './IndividualFeedPage.module.css'
import openMindImg from '../../assets/images/img_background.png'
import logo from '../../assets/images/img_logo.png'
import { useToast } from '../../contexts/toastContextProvider'

export default function IndividualFeedPage({
  loadProfile,
  profile,
  onLoadMore,
  next,
  questions,
  questionCount,
  onLoadNew,
  errorInfo,
  setErrorInfo,
  isNewProfile,
}) {
  const { feedId } = useParams()
  const localUserId = getLocalUserId()
  const listEndRef = useRef(null)
  const { toast } = useToast()

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
  }, [feedId, loadProfile])

  useEffect(() => {
    if (isNewProfile) {
      // 새 프로필에 들어가면 질문도 새로 로딩합니다.
      onLoadNew(feedId).then()
    }
    // 새 프로필이 아닌 경우 질문을 새로 로딩할지 결정합니다.
    const questionSubjectId = questions[0]?.subjectId
    if (questionSubjectId === undefined) {
      // 질문 받은 아이디를 찾을 수 없는 경우 질문이 0개이므로 그만 로딩합니다.
      return
    }
    if (feedId !== String(questionSubjectId)) {
      // 질문 받은 아이디가 주소의 아이디와 다를 경우 질문을 새로 로딩합니다.
      onLoadNew(feedId).then()
    }
  }, [feedId, onLoadMore, onLoadNew, questions, isNewProfile])

  if (errorInfo) {
    return toast({
      message: errorInfo.message,
      status: errorInfo.status,
    })
  }

  if (profile) {
    return (
      <div className={styles.body}>
        <div className={styles['header-overlay']} />
        <div className={styles['main-overlay']} />
        <header className={styles.header}>
          <img
            className={styles.backgroundImg}
            src={openMindImg}
            alt="실 전화기를 사용하는 두 사람"
          />
          <Link to={'/list'}>
            <img className={styles.logo} src={logo} alt="오픈마인드 로고" />
          </Link>
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
              errorInfo={errorInfo}
              setErrorInfo={setErrorInfo}
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
              errorInfo={errorInfo}
              setErrorInfo={setErrorInfo}
              loadProfile={loadProfile}
            />
          )}
        </div>
      </div>
    )
  }
}
