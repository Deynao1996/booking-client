import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link, useLocation, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import * as Yup from 'yup'
import { useMediaQuery } from 'react-responsive'
import { useEffect } from 'react'
import { useAuthProvider } from '../../contexts/AuthContext'
import { checkAuthToken, loginToAccount } from '../../utils/service-utils'
import { showError } from '../../utils/show-error-utils'

import './_loginPage.scss'

const initialValues = {
  userName: '',
  password: ''
}

const LoginPage = () => {
  const { login } = useAuthProvider()
  const location = useLocation()
  const { userId, token } = useParams()
  const isLaptop = useMediaQuery({
    query: '(max-width: 1200px)'
  })
  const validationSchema = Yup.object({
    userName: Yup.string().required('Required field'),
    password: Yup.string().required('Required field')
  })

  function redirectToPassport(type) {
    window.open(`http://localhost:8800/api/passport/${type}`, '_self')
  }

  async function showVerifyModal() {
    try {
      const res = await checkAuthToken(userId, token)
      if (res.data) {
        swal('Good job!', res.data, 'success')
      }
    } catch (e) {
      showError()
    }
  }

  async function handleSubmit({ userName, password }) {
    try {
      const user = { userName: userName.toLowerCase(), password }
      const res = await loginToAccount(user)
      if (res.data) {
        const { _id, email, userName, hasNewsletter, ...rest } = res.data
        const redirectPath = location.state?.fromPage
          ? location.state.fromPage
          : '/'
        login({ _id, email, userName, hasNewsletter }, redirectPath)
      } else {
        swal('Warning!', res.response.data.errorMessage, 'warning')
      }
    } catch (e) {
      showError()
    }
  }

  useEffect(() => {
    if (userId && token) showVerifyModal(userId, token)
  }, [userId, token])

  return (
    <div className="login">
      <div className="login__title">SIGN IN</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login__form">
            <CustomField
              type="text"
              placeholder="username"
              id="userName"
              name="userName"
            />
            <CustomField
              type="password"
              placeholder="password"
              name="password"
              id="password"
            />
            <div className="login__form-btns">
              <button
                disabled={isSubmitting}
                type="submit"
                className="button-usuall button-usuall__auth button-usuall_br-0"
              >
                LOGIN
              </button>
              <p>
                <b>or</b>
              </p>
              <div
                className="passport"
                onClick={() => redirectToPassport('google')}
              >
                <div className="passport__wrapper">
                  <img
                    className="passport__icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  />
                </div>
                <p>
                  <b>Sign in with google</b>
                </p>
              </div>
              <div
                className="passport github"
                onClick={() => redirectToPassport('github')}
                style={{ margin: isLaptop ? '10px 0 0 0' : '0 0 0 auto' }}
              >
                <div className="passport__wrapper">
                  <img
                    className="passport__icon"
                    src="https://w7.pngwing.com/pngs/12/369/png-transparent-black-and-white-cat-illustration-github-computer-icons-icon-design-github-cat-like-mammal-carnivoran-logo.png"
                  />
                </div>
                <p>
                  <b>Sign in with github</b>
                </p>
              </div>
            </div>
            <div className="login__form-links">
              <Link to="/" className="login__form-link">
                HOME PAGE
              </Link>
              <Link to="../reset-password" className="login__form-link">
                Forgot password
              </Link>
            </div>
            <Link to="../register" className="login__form-link">
              CREATE A NEW ACCOUNT
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export const CustomField = ({ type, placeholder, name, ...props }) => {
  return (
    <>
      <Field
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        {...props}
      />
      <ErrorMessage className="errorMessage" name={name} component="div" />
    </>
  )
}

export default LoginPage
