import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  renderProperties,
  renderCities,
  renderHomes
} from '../utils/render-items-utils'
import ItemsList from '../components/Lists/ItemsList'
import {
  fetchRandomCities,
  fetchHouses,
  fetchProperties
} from '../utils/service-utils'
import DesktopNav, { StyledLink } from '../components/DesktopNav'
import {
  Button,
  Container,
  DialogActions,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useThemeProvider } from '../contexts/ThemeContext'
import { Login } from '@mui/icons-material'
import SearchBar from '../components/SearchBar/SearchBar'
import ConfirmDialog from '../components/ModalUI/ConfirmDialog'
import { mainPageMsgs } from '../data/messages-data'
import CustomParticles from '../components/CustomParticles'

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { theme } = useThemeProvider()
  const navigate = useNavigate()
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const searchParam = searchParams.get('success')
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const messages = mainPageMsgs

  function resetSearchParams() {
    searchParams.delete('success')
    setSearchParams(searchParams)
    setIsConfirmDialogOpen(false)
  }

  useEffect(() => {
    searchParam && setIsConfirmDialogOpen(true)
  }, [searchParam])

  const confirmText =
    searchParam === 'true' ? messages.paymentComplete : messages.paymentFailed
  const returnBtn = searchParam === 'false' && (
    <Button onClick={() => navigate(-1)} variant="contained">
      Return to payment
    </Button>
  )

  return (
    <Container>
      <ConfirmDialog
        isConfirmDialogOpen={isConfirmDialogOpen}
        onCancel={resetSearchParams}
        title={'Payment info:'}
        text={confirmText}
        renderActions={() => (
          <DialogActions>
            <Button onClick={resetSearchParams}>Confirm</Button>
            {returnBtn}
          </DialogActions>
        )}
      />
      {!isMobile && <DesktopNav />}
      {!isMobile && <CustomParticles />}
      <Typography
        component="h1"
        variant="h2"
        sx={(theme) => ({
          my: 4,
          [theme.breakpoints.down('md')]: {
            fontSize: theme.spacing(5.5),
            mt: theme.spacing(2)
          }
        })}
      >
        A lifetime of discounts? It's Genius.
      </Typography>
      <Typography component="h2" variant="h5" sx={{ my: 4 }}>
        Get rewarded for your travels - unlock instant savings of 10% or more
        with a free Booking account
      </Typography>
      <StyledLink to="/auth/login">
        <Button variant="contained" startIcon={<Login />}>
          Sign up
        </Button>
      </StyledLink>
      <SearchBar />
      <ItemsList
        renderItems={renderCities}
        type="city"
        skeletonCount={3}
        fetchData={fetchRandomCities}
        limit={3}
      />
      <Typography variant="h5" component="h2" marginY={4}>
        Browse by property type
      </Typography>
      <ItemsList
        renderItems={renderProperties}
        type="property"
        skeletonCount={5}
        fetchData={fetchProperties}
      />
      <Typography variant="h5" component="h3" marginY={4}>
        Homes guests love
      </Typography>
      <ItemsList
        renderItems={renderHomes}
        type="home"
        skeletonCount={4}
        fetchData={fetchHouses}
        featured={true}
        limit={4}
      />
    </Container>
  )
}

export default MainPage
