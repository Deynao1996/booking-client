import { Outlet } from 'react-router-dom'

import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import Newsletter from '../components/newsletter/Newsletter'

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Newsletter />
      <Footer />
    </>
  )
}

export default MainLayout
