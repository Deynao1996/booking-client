import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
  saveNewPassword,
  sendPasswordConfirmation,
  verifyPasswordLink
} from '../utils/service-utils'
import { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material'
import { Key } from '@mui/icons-material'
import styled from '@emotion/styled'
import { StyledBodyLink } from './SignUpPage'
import { useSnackbar } from 'notistack'

const StyledForm = styled('form')(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: '100%'
}))

const ResetPasswordPage = () => {
  const { userId, token } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  async function verifyLink(userId, token) {
    try {
      const res = await verifyPasswordLink({
        userId,
        token
      })
      if (res.data) {
        enqueueSnackbar(res.data, { variant: 'success' })
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  useEffect(() => {
    if (userId && token) verifyLink(userId, token)
  }, [userId, token])

  return (
    <Box
      sx={{
        my: 12,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <Key />
      </Avatar>
      <View
        type={userId && token ? 'new' : 'reset'}
        userId={userId}
        token={token}
      />
    </Box>
  )
}

const View = ({ type, userId, token }) => {
  const { title, btnTitle, onMutate, placeholder, ...inputConfig } =
    setPasswordPageContent(type)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { mutate, isLoading } = useMutation(onMutate)
  const [inputValue, setInputValue] = useState('')

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  function setPasswordPageContent(type) {
    switch (type) {
      case 'reset':
        return {
          title: 'RESET PASSWORD',
          type: 'email',
          placeholder: 'Email',
          id: 'resetEmail',
          btnTitle: 'RESET PASSWORD',
          onMutate: sendPasswordConfirmation
        }
      case 'new':
        return {
          title: 'PASS NEW PASSWORD',
          type: 'password',
          id: 'resetPassword',
          placeholder: 'Password',
          btnTitle: 'SAVE NEW PASSWORD',
          onMutate: saveNewPassword
        }

      default:
        return {}
    }
  }

  function onSuccess(data) {
    enqueueSnackbar(data.data, { variant: 'success' })
    setInputValue('')
    if (type === 'new') navigate('/auth/login')
  }

  function onError(e) {
    console.log(e)
    enqueueSnackbar(e.message, { variant: 'error' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const value =
      type === 'reset'
        ? inputValue.toLowerCase()
        : {
            userId,
            token,
            password: inputValue
          }
    mutate(value, { onSuccess, onError })
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <Grid container item spacing={2} xs={12}>
          <Grid item xs={12}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel htmlFor="reset-password">{placeholder}</InputLabel>
              <OutlinedInput
                value={inputValue}
                onChange={handleChange}
                label={placeholder}
                {...inputConfig}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
            >
              {btnTitle}
            </Button>
          </Grid>
        </Grid>
      </StyledForm>
      {type === 'reset' && (
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <StyledBodyLink to="/" style={{ display: 'block' }}>
              Back Home
            </StyledBodyLink>
          </Grid>
          <Grid item xs={6} textAlign="end">
            <Typography
              onClick={() => navigate(-1)}
              color="text.secondary"
              variant="body2"
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              Back To Previous Page
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default ResetPasswordPage
