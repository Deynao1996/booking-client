import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { StyledBodyLink } from './SignUpPage'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        height: '60vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'primary',
        marginTop: 10
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6" align="center">
        {"The page you're looking for doesn't exist."}
      </Typography>
      <StyledBodyLink to="/" style={{ display: 'block', margin: '1rem' }}>
        Back Home
      </StyledBodyLink>
      <Typography
        onClick={() => navigate(-1)}
        color="text.secondary"
        variant="body2"
        sx={{ textDecoration: 'underline', cursor: 'pointer' }}
      >
        Back To Previous Page
      </Typography>
    </Box>
  )
}

export default ErrorPage
