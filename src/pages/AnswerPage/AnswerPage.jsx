import styles from './AnswerPage.module.css'
import SocialShareContainer from '../../components/SocialShareContainer'
import FeedCardList from '../../components/FeedCardList'
import { FloatButton } from '../../components/Buttons'
import logo from '../../assets/images/img_logo.png'
import openMindImg from '../../assets/images/img_openmind.png'

function AnswerPage({ feedId, profile, errorMessage = null, onClick }) {
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
          <FeedCardList feedId={feedId} isMyFeed profile={profile} />
        </section>
        {errorMessage?.message && (
          <div className={styles.error}>{errorMessage.message}</div>
        )}
      </main>
    </div>
  )
}

export default AnswerPage
