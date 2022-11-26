import { Typography } from '@mui/material'
import { StyledBodyLink } from '../pages/SignUpPage'

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <StyledBodyLink color="inherit" to="/">
        Booking
      </StyledBodyLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
