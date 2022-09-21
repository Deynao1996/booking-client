import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../../contexts/AuthContext'
import { SearchDataProvider } from '../../contexts/SearchDataContext'
import AuthLayout from '../../layouts/AuthLayout'
import HotelsLayout from '../../layouts/HotelsLayout'
import MainLayout from '../../layouts/MainLayout'
import ErrorPage from '../../pages/errorPage/ErrorPage'
import HotelsPage from '../../pages/hotelsPage/HotelsPage'
import LoginPage from '../../pages/loginPage/LoginPage'
import MainPage from '../../pages/mainPage/MainPage'
import RegisterPage from '../../pages/registerPage/RegisterPage'
import SingleHotelPage from '../../pages/singleHotelPage/SingleHotelPage'
import ResetPasswordPage from '../../pages/resetPasswordPage/ResetPasswordPage'
import ScrollToTop from '../scrollToTop/ScrollToTop'

const App = () => {
  return (
    <AuthProvider>
      <SearchDataProvider>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<MainPage />} />
              <Route path="houses/:hotelId" element={<SingleHotelPage />} />
            </Route>
            <Route path="houses" element={<HotelsLayout />}>
              <Route index element={<HotelsPage />} />
            </Route>
            <Route path="auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />}>
                <Route path=":userId/verify/:token" element={<LoginPage />} />
              </Route>
              <Route path="register" element={<RegisterPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />}>
                <Route path=":userId/:token" element={<ResetPasswordPage />} />
              </Route>
            </Route>
            <Route path="*" element={<AuthLayout />}>
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </ScrollToTop>
      </SearchDataProvider>
    </AuthProvider>
  )
}

export default App
