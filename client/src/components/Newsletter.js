import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthProvider } from '../contexts/AuthContext'
import { changeUser } from '../utils/service-utils'
import { useSnackbar } from 'notistack'
import { newsletterMsgs } from '../data/messages-data'
import styled from '@emotion/styled'

const StyledBg = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  marginTop: theme.spacing(4),
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(50deg,hsl(199deg 37% 15%) 0%,hsl(199deg 33% 14%) 30%,hsl(199deg 29% 13%) 37%,hsl(200deg 24% 12%) 40%,hsl(200deg 19% 11%) 42%,hsl(201deg 14% 10%) 46%,hsl(200deg 8% 8%) 57%,hsl(0deg 0% 7%) 100%)'
      : 'linear-gradient(50deg,hsl(0deg 33% 99%) 0%,hsl(354deg 13% 98%) 30%,hsl(340deg 6% 97%) 37%,hsl(279deg 2% 96%) 40%,hsl(220deg 4% 95%) 42%,hsl(207deg 6% 94%) 46%,hsl(202deg 7% 94%) 57%,hsl(200deg 8% 93%) 100%)'
}))

const Newsletter = () => {
  const { currentUser, login } = useAuthProvider()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const emailRef = useRef('')
  const messages = newsletterMsgs

  const btnContent = currentUser ? 'Subscribe' : 'Login and Subscribe'
  const isSubscribed = currentUser?.hasNewsletter

  async function handleSubmit(e) {
    e.preventDefault()
    if (!currentUser) return navigate('/auth/login')
    if (!currentUser.isVerified)
      return enqueueSnackbar(messages.configurations, { variant: 'warning' })

    try {
      const res = await changeUser({
        userId: currentUser._id,
        changedData: { hasNewsletter: true }
      })
      if (res.data) {
        enqueueSnackbar(messages.subscribed, {
          variant: 'success'
        })
        login({ ...currentUser, hasNewsletter: true })
        e.target.reset()
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
    }
  }

  return (
    <StyledBg>
      <Divider />
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          p: 4
        }}
      >
        <Typography variant="h4" component="h4" align="center">
          Save time, save money!
        </Typography>
        <Typography variant="h6" align="center">
          Sign up and we'll send the best deals to you
        </Typography>
        <Grid component="form" onSubmit={handleSubmit} container spacing={1}>
          <Grid item xs={12} sm={7}>
            <TextField
              label="Your Email"
              type="email"
              name="email"
              placeholder={
                isSubscribed ? 'Your already have been subscribed!' : ''
              }
              required={true}
              onChange={(e) => (emailRef.current = e.target.value)}
              sx={{ '& fieldset': { border: 'none' } }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Button
              type="submit"
              disabled={isSubscribed}
              variant="contained"
              size="large"
              fullWidth
            >
              {btnContent}
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Divider />
    </StyledBg>
  )
}

export default Newsletter
