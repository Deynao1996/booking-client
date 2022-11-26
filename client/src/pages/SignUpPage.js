import { Avatar, Box, Grid, Typography } from '@mui/material'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { LockOutlined } from '@mui/icons-material'
import styled from '@emotion/styled'
import CustomTextField from '../components/FormUI/CustomTextField'
import CustomSubmitButton from '../components/FormUI/CustomSubmitButton'
import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import { useEffect, useRef } from 'react'
import Copyright from '../components/Copyright'
import { createAccount, createNotifications } from '../utils/service-utils'
import { signUpPageMsgs } from '../data/messages-data'

export function renderTextFields(options) {
  return options.map(({ name, label, fullWidth, ...props }, i) => {
    const sm = fullWidth ? 12 : 6
    return (
      <Grid item xs={12} sm={sm} key={i}>
        <CustomTextField
          id={name}
          label={label}
          name={name}
          required={true}
          {...props}
        />
      </Grid>
    )
  })
}

const signUpOptions = [
  { name: 'name', label: 'Name', autoFocus: true, autoComplete: 'name' },
  { name: 'lastName', label: 'Last Name', autoComplete: 'name' },
  {
    name: 'userName',
    label: 'User Name',
    autoComplete: 'username',
    fullWidth: true
  },
  { name: 'email', label: 'Email', autoComplete: 'email', fullWidth: true },
  {
    name: 'password',
    label: 'Password',
    autoComplete: 'password',
    fullWidth: true,
    type: 'password',
    autoComplete: 'current-password'
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    autoComplete: 'confirmPassword',
    fullWidth: true,
    type: 'password',
    autoComplete: 'current-password'
  }
]

const initialValues = {
  name: '',
  lastName: '',
  userName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Required field')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field'),
  lastName: Yup.string()
    .required('Required field')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field'),
  userName: Yup.string().required('Required field'),
  email: Yup.string().required('Required field').email('Invalid email format'),
  password: Yup.string().required('Required field'),
  confirmPassword: Yup.string()
    .required('Required field')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export const StyledBodyLink = styled(Link)(({ theme }) => {
  return {
    ...theme.typography.body2,
    color: theme.palette.text.secondary
  }
})

export const StyledForm = styled(Form)(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: '100%'
}))

const SignUpPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const socketRef = useRef()
  const messages = signUpPageMsgs

  async function sendNotification(res) {
    const data = {
      userId: res?.data.data._id,
      type: 'new-user'
    }
    socketRef.current?.emit('send-notification', data)
    await createNotifications(data)
  }

  async function handleSubmit(values, actions) {
    const { name, email, lastName, userName, password } = values
    const user = {
      name,
      lastName,
      userName: userName.toLowerCase(),
      email: email.toLowerCase(),
      password
    }

    try {
      const res = await createAccount(user)
      if (res.name === 'AxiosError') return
      await sendNotification(res)
      enqueueSnackbar(messages.verifyLink, {
        variant: 'info'
      })
      actions.resetForm()
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    } finally {
      actions.setSubmitting(false)
    }
  }

  useEffect(() => {
    if (process.env.REACT_APP_WITH_SOCKETIO === 'true') {
      socketRef.current = io('http://localhost:5000')
      return () => {
        socketRef.current?.disconnect()
        socketRef.current?.off('send-notification')
      }
    }
  }, [])

  return (
    <Box
      sx={{
        my: 2,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <Grid container item columnSpacing={2} xs={12}>
              {renderTextFields(signUpOptions)}
            </Grid>
            <Typography variant="caption" mb={2} component="div">
              By creating an account, I consent to the processing of my personal
              data in accordance with the
              <b> PRIVACY POLICY</b>
            </Typography>
            <CustomSubmitButton
              withLoading={true}
              margin="normal"
              loading={isSubmitting}
              type="submit"
            >
              Sign up
            </CustomSubmitButton>
            <Grid container>
              <Grid item xs>
                <StyledBodyLink to="/">Home page</StyledBodyLink>
              </Grid>
              <Grid item>
                <StyledBodyLink to="/auth/login">Sign in</StyledBodyLink>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 3 }} />
          </StyledForm>
        )}
      </Formik>
    </Box>
  )
}

export default SignUpPage
