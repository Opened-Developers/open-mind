export const debounce = (fn, delay) => {
  let timeoutId

  return (...args) => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export const getLocalUserId = () => {
  const userId = localStorage.getItem('userId')
  return userId
}

export const createLocalUserId = (userId) => {
  const newLocalUserId = userId
  localStorage.setItem('userId', newLocalUserId)
}

export const getDeviceType = (width, detail = false) => {
  if (width >= 1200) return 'desktop'

  if (detail) {
    if (width >= 950) return 'tabletBig'
  }

  if (width >= 768) return 'tablet'

  return 'mobile'
}

/**
 * 현재 시간과 랜덤 숫자를 이용해 고유한 id를 만드는 함수
 * @returns {number} id값
 */
export const getUniqueId = () => {
  const timestamp = new Date().getTime()
  const random = Math.floor(Math.random() * 1000)
  const uniqueId = `${timestamp}${random}`
  return uniqueId
}

export function getRelativeDate(date) {
  const detailDate = (d) => {
    const milliSeconds = new Date() - d

    const seconds = milliSeconds / 1000
    if (seconds < 60) return '방금 전'
    const minutes = seconds / 60
    if (minutes < 60) return `${Math.floor(minutes)}분 전`
    const hours = minutes / 60
    if (hours < 24) return `${Math.floor(hours)}시간 전`
    const days = hours / 24
    if (days < 7) return `${Math.floor(days)}일 전`
    const weeks = days / 7
    if (weeks < 5) return `${Math.floor(weeks)}주 전`
    const months = days / 30
    if (months < 12) return `${Math.floor(months)}개월 전`
    const years = days / 365
    return `${Math.floor(years)}년 전`
  }
  return detailDate(new Date(date))
}
