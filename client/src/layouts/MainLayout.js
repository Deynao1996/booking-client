import { CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header/Header'
import Newsletter from '../components/Newsletter'

const MainLayout = () => {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Header />
      <Outlet />
      <Newsletter />
      <Footer />
    </>
  )
}

export default MainLayout
