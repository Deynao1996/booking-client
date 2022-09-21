import { Link, useNavigate } from 'react-router-dom'

import './_errorPage.scss'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className="error">
      <h1>ERROR 404</h1>
      <h2>Page is non found</h2>
      <span onClick={() => navigate(-1)}>Go to previous page</span>
      <Link to="/" className="login__form-link">
        Go home
      </Link>
    </div>
  )
}

export default ErrorPage
