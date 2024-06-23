import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SocialShare from './SocialShare'
import { useToast } from '../contexts/toastContextProvider'

const JAVASCRIPT_KEY = '56581d8bf8b211623ac7e64c0f1d5851'
const INTEGRITY_VALUE =
  'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4'
const VERSION = '2.7.2'
const TEMPLATE_ID = 108949

function SocialShareContainer({ questions, profile }) {
  const location = useLocation()
  const currentUrl = `${window.location.origin}${location.pathname}`
  const { toast } = useToast()

  const handleCopyClick = () => {
    navigator.clipboard.writeText(currentUrl)
    toast({ status: 'default', message: 'URL이 복사되었습니다' })
  }

  const handleKakaoClick = () => {
    if (!questions || !questions.length) {
      toast({ status: 'error', message: '공유할 질문이 없습니다' })
      return
    }
    const content = {
      title: questions[0].content,
      favorite: questions[0].like,
      image: profile.imageSource,
      description: questions[0].answer ? questions[0].answer.content : '미답변',
      name: profile.name,
    }
    window.Kakao.Share.sendCustom({
      templateId: TEMPLATE_ID,
      templateArgs: content,
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
