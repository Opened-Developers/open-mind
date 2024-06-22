import styles from './AnswerPage.module.css'
import SocialShareContainer from '../../components/SocialShareContainer'
import FeedCardList from '../../components/FeedCardList'
import { FloatButton } from '../../components/Buttons'
import logo from '../../assets/images/img_logo.png'
import openMindImg from '../../assets/images/img_openmind.png'

function AnswerPage({
  profile,
  errorMessage = null,
  onClick,
  onLoadMore,
  onLoadNew,
  next,
  questions,
  questionCount,
}) {
  const feedId = profile.id

  const listEnd = document.querySelector('.list-end')

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        if (next !== null) {
          observer.unobserve(listEnd)
          onLoadMore(feedId)
        }
        observer.disconnect()
      }
    },
    { threshold: 0.5 }
  )

  if (listEnd) {
    observer.observe(listEnd)
  }

  if (profile) {
    return (
      <div className={styles.body}>
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
            className={styles.userImg}
          />
          <p className={styles.nickname}>{profile.name}</p>
          <SocialShareContainer />
          <FloatButton onClick={onClick} size="small">
            삭제
          </FloatButton>
        </header>
        <main className={styles.main}>
          <section className={styles.section}>
            <FeedCardList
              isMyFeed
              profile={profile}
              questions={questions}
              questionCount={questionCount}
              onLoadNew={onLoadNew}
            />
            {next !== null && <div className="list-end">로딩 중 ...</div>}
          </section>
          {errorMessage?.message && (
            <div className={styles.error}>{errorMessage.message}</div>
          )}
        </main>
      </div>
    )
  }
}

export default AnswerPage
