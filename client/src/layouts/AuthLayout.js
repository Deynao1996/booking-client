import styled from '@emotion/styled'
import { CssBaseline, Grid, Paper } from '@mui/material'
import { Outlet } from 'react-router-dom'

const StyledGrid = styled(Grid)(({ theme }) => ({
  backgroundImage:
    'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80)',
  backgroundRepeat: 'no-repeat',
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.grey[50]
      : theme.palette.grey[900],
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  '&:before': theme.palette.mode === 'dark' && {
    content: '""',
    display: 'block',
    position: 'absolute',
    height: '100%',
    width: '100%',
    bottom: '0',
    background: 'linear-gradient(to bottom, transparent 0%, black 100%)'
  }
}))

const AuthLayout = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline enableColorScheme />
      <StyledGrid item xs={false} sm={4} md={7} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default AuthLayout
