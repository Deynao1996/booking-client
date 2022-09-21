import { Outlet } from 'react-router-dom'

import Header from '../components/header/Header'

const HotelsLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default HotelsLayout
