import styled from '@emotion/styled'
import { LocalTaxi } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useSearchProvider } from '../../contexts/SearchContext'
import { useIsInViewPort } from '../../hooks/useIsInViewPort'
import { fetchHouses } from '../../utils/service-utils'
import { StyledLink } from '../DesktopNav'
import Skeleton from '../LoadingUI/Skeleton'
import { useHandleError } from '../../hooks/useHandleError'
import { useThemeProvider } from '../../contexts/ThemeContext'

const StyledBox = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  width: '100%'
}))

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1),
  transition: 'all .2s cubic-bezier(0.455, 0.030, 0.515, 0.955)',
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}))

export function getOpinion(param) {
  if (param < 2) {
    return 'Poor'
  } else if (param > 8) {
    return 'Excellent'
  } else {
    return 'Universal'
  }
}

export function getFloatRating(rating) {
  return Number.isInteger(rating) ? rating + '.0' : rating
}

const HotelsList = () => {
  const location = useLocation()
  const { searchParams, resetSearchParams } = useSearchProvider()
  const { theme } = useThemeProvider()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const triggerRef = useRef()
  const inView = useIsInViewPort(triggerRef)

  const city = searchParams?.destination
  const type = location.search.split('=')[1]
  const min = searchParams?.minPrice
  const max = searchParams?.maxPrice
  const room = searchParams?.room
  const adult = searchParams?.adult
  const children = searchParams?.children
  const limit = 10

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error
  } = useInfiniteQuery(
    ['houses', { type, city, min, max, limit, room }, adult, children],
    ({ pageParam = 1, queryKey }) => fetchHouses({ queryKey, pageParam }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (pages.length < lastPage.data.totalPages) {
          return pages.length + 1
        } else {
          return undefined
        }
      }
    }
  )
  useHandleError(isError, error)

  function setSearchParamsFromItemsList() {
    if (location?.state?.fromItemsList && location.state.destination) {
      resetSearchParams({ destination: location.state.destination })
    } else if (location?.state?.fromItemsList && !location.state?.destination) {
      resetSearchParams()
    }
  }

  function renderHotelsList() {
    return (
      <List disablePadding>
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.hotels.map((hotel) => (
                <View key={hotel._id} isMobile={isMobile} {...hotel} />
              ))}
            </Fragment>
          )
        })}
      </List>
    )
  }

  useEffect(() => {
    if (hasNextPage && inView) fetchNextPage()
  }, [inView])

  useEffect(() => setSearchParamsFromItemsList(), [location])

  const hotelsContent =
    data?.pages[0].data.hotels.length === 0 ? (
      <Divider>
        <Chip label="No available hotels" />
      </Divider>
    ) : (
      renderHotelsList()
    )

  return (
    <>
      {isLoading && <Skeleton type={'hotel'} count={4} />}
      {hotelsContent}
      {isFetchingNextPage && <Skeleton type={'hotel'} count={2} />}
      <Box
        ref={triggerRef}
        sx={{
          position: 'absolute',
          pointeEvents: 'none',
          visibility: 'hidden',
          bottom: '10%',
          width: '5px',
          height: '5px'
        }}
      ></Box>
    </>
  )
}

const View = (props) => {
  const floatRating = getFloatRating(props.rating)

  return (
    <ListItem disablePadding sx={{ mb: 1.5 }}>
      <StyledCard>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <CardMedia
              component="img"
              sx={{ height: 200 }}
              image={props.photos[0]}
              alt="hotel"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledBox>
              <Typography variant="h6" color="primary.main">
                {props.name}
              </Typography>
              <Typography variant="caption">
                {props.distance}m from center
              </Typography>
              <Chip
                color="success"
                size="small"
                icon={<LocalTaxi />}
                label="Free airport taxi"
                sx={{ width: '35%' }}
              />
              <Typography variant="caption">{props.subDescription}</Typography>
              {props.featured && (
                <Typography variant="caption" fontWeight="bold">
                  {props.features}
                </Typography>
              )}
              <Typography variant="caption" color="success.main">
                Free cancellation
              </Typography>
              <Typography variant="caption" color="success.main">
                You can cancel later, so lock in this great price today!
              </Typography>
            </StyledBox>
          </Grid>
          <Grid item xs={12} sm={3}>
            <StyledBox>
              {!props.isMobile && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'flex-end', sm: 'space-between' },
                    alignItems: 'center',
                    gap: { xs: 2, sm: 0 }
                  }}
                >
                  <Typography>{getOpinion(props.rating)}</Typography>
                  <Button variant="outlined" sx={{ cursor: 'default' }}>
                    {floatRating}
                  </Button>
                </Box>
              )}
              <div>
                {!props.isMobile && (
                  <>
                    <Typography align="right" variant="h6">
                      ${props.cheapestPrice}
                    </Typography>
                    <Typography variant="caption" component="p" align="right">
                      Includes taxes and fees
                    </Typography>
                  </>
                )}
                <StyledLink to={props._id}>
                  <Button variant="contained" fullWidth size="small">
                    See availability
                  </Button>
                </StyledLink>
              </div>
            </StyledBox>
          </Grid>
        </Grid>
      </StyledCard>
    </ListItem>
  )
}

export default HotelsList
