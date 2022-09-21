import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { request } from '../utils/axios-utils'

const AuthContext = React.createContext()

export const useAuthProvider = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user-name'))
  )
  const navigate = useNavigate()

  const saveCurrentUser = (res) => {
    if (!res.data) return
    saveUserNameToStorage(res.data)
    setCurrentUser(res.data)
  }

  function saveUserNameToStorage(user) {
    localStorage.setItem(
      'user-name',
      JSON.stringify({ userName: user.userName })
    )
  }

  function logout() {
    setCurrentUser(false)
    localStorage.removeItem('user-name')
    request({ url: '/auth/logout' })
  }

  function login(user, redirectPath) {
    saveUserNameToStorage(user)
    setCurrentUser(user)
    redirectPath && navigate(redirectPath)
  }

  useEffect(() => {
    axios
      .get('/auth/login/with-jwt')
      .then(saveCurrentUser)
      .catch((e) => {
        if (e.response?.status === 401) logout()
      })
  }, [])

  const value = {
    currentUser,
    setCurrentUser,
    logout,
    login
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
