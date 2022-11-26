import { CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Header from '../components/Header/Header'

const HotelsLayout = () => {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Header />
      <Outlet />
    </>
  )
}

export default HotelsLayout
