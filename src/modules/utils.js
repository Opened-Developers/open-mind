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
