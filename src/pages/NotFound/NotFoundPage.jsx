import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'
import { OutlineButton } from '../../components/Buttons'

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <div>
        <h1 className="heading-1">404</h1>
        <p>페이지를 찾을 수 없습니다</p>
      </div>

      <Link to="/">
        <OutlineButton iconRight>홈 바로가기</OutlineButton>
      </Link>
    </div>
  )
}
