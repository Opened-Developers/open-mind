import styles from './AnswerPage.module.css'
import SocialShareContainer from '../../components/SocialShareContainer'
import FeedCardList from '../../components/FeedCardList'
import { FillButton } from '../../components/Buttons'
import logo from '../../assets/images/img_logo.png'
import openMindImg from '../../assets/images/img_openmind.png'

function AnswerPage({ feedId }) {
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <img
          className={styles.backgroundImg}
          src={openMindImg}
          alt="실 전화기를 사용하는 두 사람"
        />
        <img className={styles.logo} src={logo} alt="오픈마인드 로고" />
        <div className={styles.userImg}>프로필 사진</div>
        <p className={styles.nickname}>닉네임</p>
        <SocialShareContainer />
        <FillButton size="small">삭제하기</FillButton>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <FeedCardList feedId={feedId} isMyFeed />
        </section>
      </main>
    </div>
  )
}

export default AnswerPage
