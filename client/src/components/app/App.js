import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../../contexts/AuthContext'
import AuthLayout from '../../layouts/AuthLayout'
import HotelsLayout from '../../layouts/HotelsLayout'
import MainLayout from '../../layouts/MainLayout'
import HotelsPage from '../../pages/HotelsPage'
import MainPage from '../../pages/MainPage'
import SingleHotelPage from '../../pages/SingleHotelPage'
import ResetPasswordPage from '../../pages/ResetPasswordPage'
import ScrollToTop from '../ScrollWrappers/ScrollToTop'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { SnackbarProvider } from 'notistack'
import SignInPage from '../../pages/SignInPage'
import SignUpPage from '../../pages/SignUpPage'
import ErrorPage from '../../pages/ErrorPage'
import { SearchProvider } from '../../contexts/SearchContext'

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <SearchProvider>
          <ThemeProvider>
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
                  <Route path="register" element={<SignUpPage />} />
                  <Route path="login" element={<SignInPage />}>
                    <Route
                      path=":userId/verify/:token"
                      element={<SignUpPage />}
                    />
                  </Route>
                  <Route path="reset-password" element={<ResetPasswordPage />}>
                    <Route
                      path=":userId/:token"
                      element={<ResetPasswordPage />}
                    />
                  </Route>
                </Route>
                <Route path="*" element={<AuthLayout />}>
                  <Route path="*" element={<ErrorPage />} />
                </Route>
              </Routes>
            </ScrollToTop>
          </ThemeProvider>
        </SearchProvider>
      </AuthProvider>
    </SnackbarProvider>
  )
}

export default App
