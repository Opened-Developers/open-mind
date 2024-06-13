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
