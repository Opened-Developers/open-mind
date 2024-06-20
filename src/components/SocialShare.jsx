import iconLink from '../assets/icons/ic_button_link.svg'
import iconKakao from '../assets/icons/ic_kakao.svg'
import iconFacebook from '../assets/icons/ic_facebook.svg'
import styles from './SocialShare.module.css'

function SocialShare({ onCopyLink, onShareKakao, onShareFacebook }) {
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
    </div>
  )
}

export default SocialShare
