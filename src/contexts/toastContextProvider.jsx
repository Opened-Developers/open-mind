import { useState, useContext, useMemo, useCallback, useEffect } from 'react'
import ToastContext from './toastContext'
import { getUniqueId } from '../modules/utils'

export function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    console.log(toasts)
  }, [toasts])

  const removeToast = useCallback((id) => {
    // 토스트 삭제
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback(({ message, status, id }) => {
    // 토스트 추가
    setToasts((prev) => [...prev, { message, status, id }])
  }, [])

  // 실제로 외부에서 사용할 토스트 함수
  const toast = useCallback(
    ({ message, status, id = getUniqueId() }) => {
      console.log('toast', message, status)
      addToast({ message, status, id })
      setTimeout(() => {
        removeToast(id)
      }, 4000)
    },
    [addToast, removeToast]
  )

  const value = useMemo(
    () => ({
      toasts,
      toast,
    }),
    [toasts, toast]
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

// 컨텍스트 프로바이더 외부에서 사용하면 발생
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
