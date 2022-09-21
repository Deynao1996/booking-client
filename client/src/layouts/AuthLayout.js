import { Outlet } from 'react-router-dom'

const AUTH_STYLES = {
  width: '100vw',
  height: '100vh',
  background:
    'linear-gradient( rgba(255,255,255,0.5), rgba(255,255,255,0.5) ), url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80) center center/cover no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const AuthLayout = () => {
  return (
    <div className="auth" style={AUTH_STYLES}>
      <Outlet />
    </div>
  )
}

export default AuthLayout
