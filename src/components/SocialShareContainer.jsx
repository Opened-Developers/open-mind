import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SocialShare from './SocialShare'

const JAVASCRIPT_KEY = '56581d8bf8b211623ac7e64c0f1d5851'
const INTEGRITY_VALUE =
  'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4'
const VERSION = '2.7.2'
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

  const handleKakaoClick = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '오늘의 디저트',
        description: '아메리카노, 빵, 케익',
        imageUrl:
          'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com',
        },
      },
      itemContent: {
        profileText: 'Kakao',
        profileImageUrl:
          'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        titleImageUrl:
          'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        titleImageText: 'Cheese cake',
        titleImageCategory: 'Cake',
        items: [
          {
            item: 'Cake1',
            itemOp: '1000원',
          },
          {
            item: 'Cake2',
            itemOp: '2000원',
          },
          {
            item: 'Cake3',
            itemOp: '3000원',
          },
          {
            item: 'Cake4',
            itemOp: '4000원',
          },
          {
            item: 'Cake5',
            itemOp: '5000원',
          },
        ],
        sum: '총 결제금액',
        sumOp: '15000원',
      },
      social: {
        likeCount: 10,
        commentCount: 20,
        sharedCount: 30,
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
          },
        },
        {
          title: '앱으로 이동',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
          },
        },
      ],
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
      showToast={toastVisible}
    />
  )
}

export default SocialShareContainer
