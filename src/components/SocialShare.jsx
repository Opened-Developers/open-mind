import iconLink from '../assets/icons/ic_link.svg'
import iconKakao from '../assets/icons/ic_kakao.svg'
import iconFacebook from '../assets/icons/ic_facebook.svg'
import styles from './SocialShare.module.css'
import Toast from './Toast'

function SocialShare({ onCopyLink, onShareKakao, onShareFacebook, showToast }) {
  return (
    <div className={styles['icon-container']}>
      <button type="button" onClick={onCopyLink}>
        <img src={iconLink} alt="링크 아이콘" />
      </button>
      <button type="button" onClick={onShareKakao}>
        <img src={iconKakao} alt="카카오톡 아이콘" />
      </button>
      <button type="button" onClick={onShareFacebook}>
        <img src={iconFacebook} alt="페이스북 아이콘" />
      </button>
      {showToast && <Toast>URL이 복사되었습니다</Toast>}
    </div>
  )
}

export default SocialShare
