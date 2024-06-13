import React from 'react'
import styles from './QuestionListPage.module.css'
import SocialShareContainer from '../../components/SocialShareContainer'
import logo from '../../assets/images/img_logo.png'
import openMindImg from '../../assets/images/img_openmind.png'
import messageIcon from '../../assets/icons/ic_messages.svg'

export default function QuestionListPage() {
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <img
          className={styles.backgroundImg}
          src={openMindImg}
          alt="종이컵 전화기를 사용하는 두 사람"
        />
        <img className={styles.logo} src={logo} alt="오픈마인드 로고" />
        <div className={styles.userImg}>프로필 사진</div>
        <p className={styles.nickname}>닉네임</p>
        <SocialShareContainer />
      </header>
      <main className={styles.main}>
        <div className={styles['messages-container']}>
          <img src={messageIcon} alt="메시지 아이콘" />
          <p>3개의 질문이 있습니다</p>
        </div>
      </main>
    </div>
  )
}
