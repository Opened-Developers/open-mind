export function debounce(fn, delay) {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export function getLocalUserId() {
  const userId = localStorage.getItem('userId')
  return userId
}

export function createLocalUserId(userId) {
  const newLocalUserId = userId
  localStorage.setItem('userId', newLocalUserId)
}
