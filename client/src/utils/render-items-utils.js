import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography
} from '@mui/material'
import { StyledLink } from '../components/DesktopNav'
import { getFloatRating, getOpinion } from '../components/Lists/HotelsList'
import { capitalizeString } from './capitalize-string-utils'

export function renderProperties(data) {
  return (
    <Grid container spacing={3}>
      {data?.data.map((property) => {
        const hotelCount = property.count === 1 ? 'hotel' : 'hotels'

        return (
          <Grid item xs={12} sm={2.4} key={property.type}>
            <Card elevation={0}>
              <CardActionArea>
                <StyledLink
                  to={`/houses?type=${property.type}`}
                  state={{ fromItemsList: true }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={property.img}
                    alt={property.type}
                  />
                  <CardContent sx={{ px: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      textTransform={'capitalize'}
                    >
                      {property.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {property.count} {hotelCount}
                    </Typography>
                  </CardContent>
                </StyledLink>
              </CardActionArea>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

export function renderCities(data) {
  return (
    <Grid container spacing={3}>
      {data?.data.map((city) => {
        const capitalizedCity = capitalizeString(city.city)
        return (
          <Grid item xs={12} sm={4} key={city._id}>
            <Card>
              <CardActionArea>
                <StyledLink
                  to={'houses'}
                  state={{ destination: capitalizedCity, fromItemsList: true }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={city.cityImg}
                    alt={capitalizedCity}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      textTransform={'capitalize'}
                    >
                      {capitalizedCity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {city.count} properties
                    </Typography>
                  </CardContent>
                </StyledLink>
              </CardActionArea>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

export function renderHomes(data) {
  return (
    <Grid container spacing={3}>
      {data?.data.hotels.map((home) => {
        const floatRating = getFloatRating(home.rating)
        return (
          <Grid item xs={12} sm={6} md={3} key={home._id}>
            <Card elevation={4}>
              <CardActionArea>
                <StyledLink
                  to={`houses/${home._id}`}
                  state={{ fromItemsList: true }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={home.photos[0]}
                    alt={home.name}
                  />
                  <CardContent sx={{ px: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      noWrap
                      component="div"
                      textTransform={'capitalize'}
                    >
                      {home.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      textTransform={'capitalize'}
                      fontWeight="bold"
                    >
                      {home.city}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      marginY={1}
                    >
                      {`Starting from ${home.cheapestPrice} $`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Rating
                        name="read-only"
                        value={floatRating / 2}
                        precision={0.2}
                        readOnly
                      />
                      <div>{floatRating}</div>
                    </Typography>
                    <Typography variant="body2" align="right">
                      {getOpinion(home.rating)}
                    </Typography>
                  </CardContent>
                </StyledLink>
              </CardActionArea>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}
