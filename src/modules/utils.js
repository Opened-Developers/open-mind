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
