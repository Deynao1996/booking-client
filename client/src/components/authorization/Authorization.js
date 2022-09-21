import { Link } from 'react-router-dom'
import { useAuthProvider } from '../../contexts/AuthContext'
import { FaUserAlt } from 'react-icons/fa'

import './_authorization.scss'

const Authorization = ({ type }) => {
  const { currentUser, logout } = useAuthProvider()

  const customMargin =
    type === 'mobile' ? { marginLeft: 'unset' } : { marginLeft: 'auto' }

  {
    return !currentUser ? (
      <div className="authorization" style={{ ...customMargin }}>
        <Link to="auth/register" className="button">
          Register
        </Link>
        <Link to="auth/login" className="button">
          Login
        </Link>
      </div>
    ) : (
      <div className="authorization__logged" style={{ ...customMargin }}>
        <div className="authorization__user">
          <div className="authorization__circle">
            {currentUser.photo ? (
              <img src={currentUser.photo} alt="user" />
            ) : (
              <FaUserAlt />
            )}
          </div>
          <span>{currentUser.userName}</span>
        </div>
        <button className="button" onClick={logout}>
          Logout
        </button>
      </div>
    )
  }
}

export default Authorization
