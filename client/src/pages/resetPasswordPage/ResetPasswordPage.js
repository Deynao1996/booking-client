import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
  saveNewPassword,
  sendPasswordConfirmation,
  verifyPasswordLink
} from '../../utils/service-utils'
import { showError } from '../../utils/show-error-utils'
import { useRef, useEffect } from 'react'
import swal from 'sweetalert'

import './_resetPasswordPage.scss'

const ResetPasswordPage = () => {
  const { userId, token } = useParams()

  async function verifyLink(userId, token) {
    try {
      const res = await verifyPasswordLink({
        userId,
        token
      })
      if (res.data) {
        swal('Success!', res.data, 'success')
      }
    } catch (error) {
      showError()
    }
  }

  useEffect(() => {
    if (userId && token) verifyLink(userId, token)
  }, [userId, token])

  return (
    <div className="reset">
      <View
        type={userId && token ? 'new' : 'reset'}
        userId={userId}
        token={token}
      />
    </div>
  )
}

const View = ({ type, userId, token }) => {
  const { title, btnTitle, onMutate, ...inputConfig } =
    setPasswordPageContent(type)
  const navigate = useNavigate()
  const { mutate, isLoading } = useMutation(onMutate)
  const inputRef = useRef()

  function setPasswordPageContent(type) {
    switch (type) {
      case 'reset':
        return {
          title: 'RESET PASSWORD',
          type: 'email',
          placeholder: 'email',
          id: 'resetEmail',
          btnTitle: 'RESET PASSWORD',
          onMutate: sendPasswordConfirmation
        }
      case 'new':
        return {
          title: 'PASS NEW PASSWORD',
          type: 'password',
          id: 'resetPassword',
          placeholder: 'password',
          btnTitle: 'SAVE NEW PASSWORD',
          onMutate: saveNewPassword
        }

      default:
        return {}
    }
  }

  function onSuccess(data) {
    swal('Success!', data.data, 'success')
    inputRef.current.value = ''
    if (type === 'new') navigate('/auth/login')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const value =
      type === 'reset'
        ? inputRef.current.value.toLowerCase()
        : {
            userId,
            token,
            password: inputRef.current.value
          }
    mutate(value, { onSuccess })
  }

  return (
    <>
      <div className="reset__title">{title}</div>
      <form className="reset__form" onSubmit={handleSubmit}>
        <input type="email" required={true} ref={inputRef} {...inputConfig} />
        <button
          type="submit"
          className="button-usuall button-usuall__auth button-usuall_w-100 button-usuall_br-0"
          disabled={isLoading}
        >
          {btnTitle}
        </button>
      </form>
      {type === 'reset' && (
        <div className="reset__links">
          <Link to="/" className="reset__form-link">
            Home page
          </Link>
          <span onClick={() => navigate(-1)}>Previous page</span>
        </div>
      )}
    </>
  )
}

export default ResetPasswordPage
