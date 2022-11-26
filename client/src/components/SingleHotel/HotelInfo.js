import { LocationOn } from '@mui/icons-material'
import { Button, Grid, Paper, Stack, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthProvider } from '../../contexts/AuthContext'
import HotelImageList from './HotelImageList'

export function checkPlural(value, word) {
  if (value === 1) {
    return `${value} ${word}`
  } else {
    return `${value} ${word}s`
  }
}

const HotelInfo = ({
  handleOpenDialog,
  setBoxState,
  days,
  room,
  rooms = [],
  ...props
}) => {
  const { currentUser } = useAuthProvider()
  const navigate = useNavigate()
  const location = useLocation()
  const capitalizedCity =
    props.city.charAt(0).toUpperCase() + props.city.slice(1)

  const handleClick = () => {
    if (!currentUser) {
      return navigate('/auth/login', { state: { fromPage: location.pathname } })
    }
    handleOpenDialog()
  }

  const totalNights = checkPlural(days, 'night')
  const btnContent = currentUser
    ? 'Reserve or Book Now!'
    : 'Sign in and Reserve or Book Now!'

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        mt={2}
        alignItems="center"
      >
        <Typography variant="h5" fontWeight="bold" color="primary">
          {props.name}
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={handleClick}
          disabled={rooms.length === 0}
          title={rooms.length === 0 ? 'There are no available rooms!' : ''}
        >
          {btnContent}
        </Button>
      </Stack>
      <Typography
        variant="caption"
        sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}
        component="div"
      >
        <LocationOn fontSize="small" />
        <span>{props.address}</span>
      </Typography>
      <Typography color="info.main">
        Excellent location - {props.distance}m from center
      </Typography>
      <Typography color="success.main" marginY={1}>
        Book a stay over ${props.cheapestPrice} at this property and get a free
        airport taxi
      </Typography>
      <HotelImageList images={props.photos} setBoxState={setBoxState} />
      <Grid container marginY={2} spacing={1}>
        <Grid item sm={12} md={8} pr={4}>
          <Typography variant="h5" marginY={1} fontWeight="500">
            {props.title}
          </Typography>
          <p>{props.description}</p>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Stack component={Paper} spacing={2} padding={2}>
            <Typography variant="h6">{`Perfect for a ${days}-night stay!`}</Typography>
            <p>
              {`Located in the real heart of ${capitalizedCity}, this property has an excellent
            location score of ${props.rating}!`}
            </p>
            <p>
              <b>${days * props.cheapestPrice * room}</b> ({totalNights})
            </p>
            <Button variant="contained" size="small" onClick={handleClick}>
              {btnContent}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default HotelInfo
