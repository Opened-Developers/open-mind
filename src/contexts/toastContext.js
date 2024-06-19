import { createContext } from 'react'

const INITIAL_CONTEXT_VALUE = {
  toasts: [],
  showToast: () => {},
  hideToast: () => {},
}

// context 생성
const ToastContext = createContext(INITIAL_CONTEXT_VALUE)

export default ToastContext
