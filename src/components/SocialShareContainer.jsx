import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import SocialShare from './SocialShare'

function SocialShareContainer() {
  const location = useLocation()
  const [toastVisible, setToastVisible] = useState(false)
  const currentUrl = `${window.location.origin}${location.pathname}`

  const handleCopyClick = () => {
    navigator.clipboard.writeText(currentUrl)

    setToastVisible(true)

    setTimeout(() => {
      setToastVisible(false)
    }, 5000)
  }
  const handleKakaoClick = () => {}
  const handleFacebookClick = () => {}
  return (
    <SocialShare
      onCopyLink={handleCopyClick}
      onShareKakao={handleKakaoClick}
      onShareFacebook={handleFacebookClick}
      showToast={toastVisible}
    />
  )
}

export default SocialShareContainer
