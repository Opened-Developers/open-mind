import { Outlet } from 'react-router-dom'
import Toast from '../Toast'

export default function MainLayout() {
  return (
    <>
      <Outlet />
      <Toast />
    </>
  )
}
