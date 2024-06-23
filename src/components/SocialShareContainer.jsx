import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SocialShare from './SocialShare'
import { useToast } from '../contexts/toastContextProvider'
import logo from '../assets/images/img_logo.png'

const JAVASCRIPT_KEY = '56581d8bf8b211623ac7e64c0f1d5851'
const INTEGRITY_VALUE =
  'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4'
const VERSION = '2.7.2'

function SocialShareContainer({ questions }) {
  const location = useLocation()
  const currentUrl = `${window.location.origin}${location.pathname}`
  const { toast } = useToast()

  const handleCopyClick = () => {
    navigator.clipboard.writeText(currentUrl)
    toast({ status: 'default', message: 'URL이 복사되었습니다' })
  }

  const handleKakaoClick = () => {
    const questionContents = questions.map((question) => {
      const content = {}
      content.title = question.content
      content.description = question.answer ? question.answer.content : '미답변'
      content.imageUrl = logo
      content.link = {}
      content.link.mobileWebUrl = currentUrl
      content.link.webUrl = currentUrl
      return content
    })

    window.Kakao.Share.sendDefault({
      objectType: 'list',
      headerTitle: 'OpenMind',
      headerLink: {
        mobileWebUrl: 'https://open-mind-dev.netlify.app',
        webUrl: 'https://open-mind-dev.netlify.app',
      },
      contents: questionContents,
    })
  }

  const handleFacebookClick = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`
    window.open(
      facebookShareUrl,
      'facebook-share-dialog',
      'width=800,height=600'
    )
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://t1.kakaocdn.net/kakao_js_sdk/${VERSION}/kakao.min.js`
    script.integrity = INTEGRITY_VALUE
    script.crossOrigin = 'anonymous'
    script.async = true

    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init(JAVASCRIPT_KEY)
      }
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  })

  return (
    <SocialShare
      onCopyLink={handleCopyClick}
      onShareKakao={handleKakaoClick}
      onShareFacebook={handleFacebookClick}
    />
  )
}

export default SocialShareContainer
