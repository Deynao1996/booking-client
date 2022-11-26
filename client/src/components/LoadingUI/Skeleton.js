import {
  Box,
  Card,
  CardContent,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  Skeleton
} from '@mui/material'

const CustomSkeleton = ({ type, count = 1 }) => {
  const CitySkeleton = () => {
    return (
      <Grid container spacing={3}>
        {[...Array(count)].map((_, i) => {
          return (
            <Grid item xs={12} sm={4} key={i}>
              <Card>
                <Skeleton variant="rectangular" height={200} width={'100%'} />
                <CardContent>
                  <Skeleton variant="text" sx={{ height: 30, width: '40%' }} />
                  <Skeleton variant="text" height={15} width={'35%'} />
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    )
  }

  const PropertySkeleton = () => {
    return (
      <Grid container spacing={3}>
        {[...Array(count)].map((_, i) => {
          return (
            <Grid item xs={12} sm={2.4} key={i}>
              <Card>
                <Skeleton variant="rectangular" height={140} width={'100%'} />
                <CardContent sx={{ px: 1 }}>
                  <Skeleton variant="text" sx={{ height: 30, width: '50%' }} />
                  <Skeleton variant="text" height={15} width={'35%'} />
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    )
  }

  const HomeSkeleton = () => {
    return (
      <Grid container spacing={3}>
        {[...Array(count)].map((_, i) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card elevation={4}>
                <Skeleton variant="rectangular" height={300} width={'100%'} />
                <CardContent sx={{ px: 1 }}>
                  <Skeleton
                    variant="text"
                    sx={{ height: '100%', width: '50%' }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ height: 15, width: '40%', my: 1 }}
                  />
                  <Skeleton variant="text" sx={{ height: 15, width: '100%' }} />
                  <Skeleton
                    variant="text"
                    sx={{ height: 15, width: '100%', my: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ height: 15, width: '50%', ml: 'auto' }}
                  />
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    )
  }

  const HotelSkeleton = () => {
    return (
      <List disablePadding>
        {[...Array(count)].map((_, i) => {
          return (
            <ListItem disablePadding sx={{ mb: 1.5 }} key={i}>
              <Card sx={{ width: '100%', padding: 1 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={3}>
                    <Skeleton
                      variant="rectangular"
                      height={200}
                      width={'100%'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Skeleton
                      variant="rectangular"
                      height={200}
                      width={'100%'}
                    />
                  </Grid>
                </Grid>
              </Card>
            </ListItem>
          )
        })}
      </List>
    )
  }

  const SingleHotelSkeleton = () => {
    return (
      <>
        <Skeleton variant="text" sx={{ height: 40, width: '100%', mt: 2 }} />
        <Skeleton variant="text" sx={{ height: 15, width: '20%', my: 1 }} />
        <Skeleton variant="text" sx={{ height: 25, width: '30%', my: 1 }} />
        <Skeleton variant="text" sx={{ height: 25, width: '40%', my: 1 }} />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rectangular" height={500} width={'100%'} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rectangular" height={500} width={'100%'} />
          </Grid>
        </Grid>
      </>
    )
  }

  const ReserveModalSkeleton = () => {
    return (
      <Box sx={{ width: { xs: '100%', md: '600px' } }}>
        <DialogTitle width={'100%'}>
          <Skeleton variant="text" sx={{ height: 20, width: '100%' }} />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid container item alignItems="center">
              <Grid xs={7} item paddingRight={3}>
                <Skeleton variant="text" sx={{ height: 20, width: '60%' }} />
                <Skeleton variant="rectangular" height={100} width={'100%'} />
                <Skeleton variant="text" sx={{ height: 10, width: '30%' }} />
                <Skeleton variant="text" sx={{ height: 15, width: '20%' }} />
              </Grid>
              <Grid xs={5} item>
                <Skeleton variant="text" sx={{ height: 15, width: '100%' }} />
                <Skeleton variant="rectangular" height={40} width={'100%'} />
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid container item alignItems="center">
              <Grid xs={7} item paddingRight={3}>
                <Skeleton variant="text" sx={{ height: 20, width: '60%' }} />
                <Skeleton variant="rectangular" height={100} width={'100%'} />
                <Skeleton variant="text" sx={{ height: 10, width: '30%' }} />
                <Skeleton variant="text" sx={{ height: 15, width: '20%' }} />
              </Grid>
              <Grid xs={5} item>
                <Skeleton variant="text" sx={{ height: 15, width: '100%' }} />
                <Skeleton variant="rectangular" height={40} width={'100%'} />
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid container item alignItems="center">
              <Grid xs={7} item paddingRight={3}>
                <Skeleton variant="text" sx={{ height: 20, width: '60%' }} />
                <Skeleton variant="rectangular" height={100} width={'100%'} />
                <Skeleton variant="text" sx={{ height: 10, width: '30%' }} />
                <Skeleton variant="text" sx={{ height: 15, width: '20%' }} />
              </Grid>
              <Grid xs={5} item>
                <Skeleton variant="text" sx={{ height: 15, width: '100%' }} />
                <Skeleton variant="rectangular" height={40} width={'100%'} />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    )
  }

  switch (type) {
    case 'city':
      return <CitySkeleton />
    case 'property':
      return <PropertySkeleton />
    case 'home':
      return <HomeSkeleton />
    case 'hotel':
      return <HotelSkeleton />
    case 'single-hotel':
      return <SingleHotelSkeleton />
    case 'reserve':
      return <ReserveModalSkeleton />
    default:
      break
  }
}

export default CustomSkeleton
