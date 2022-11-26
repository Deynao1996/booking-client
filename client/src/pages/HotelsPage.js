import styled from '@emotion/styled'
import { Close, Search } from '@mui/icons-material'
import { Container, Fab, Grid, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import AsideSearchPanel from '../components/AsideSearchPanel'
import HotelsList from '../components/Lists/HotelsList'
import MobileSearchDialog from '../components/ModalUI/MobileSearchDialog'
import ZoomOnScroll from '../components/ScrollWrappers/ZoomOnScroll'
import { useThemeProvider } from '../contexts/ThemeContext'

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: theme.zIndex.modal + 1
}))

const HotelsPage = () => {
  const { theme } = useThemeProvider()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  function toggleDialog() {
    setIsDialogOpen((isDialogOpen) => !isDialogOpen)
  }

  return (
    <Container>
      <MobileSearchDialog
        toggleDialog={toggleDialog}
        isDialogOpen={isDialogOpen}
      />
      <Grid container component="section" spacing={2} paddingY={2}>
        {!isMobile ? (
          <Grid item xs={3}>
            <AsideSearchPanel />
          </Grid>
        ) : (
          <ZoomOnScroll>
            <StyledFab
              color="info"
              aria-label="search"
              sx={{ position: 'fixed', bottom: 16, right: 16 }}
              onClick={toggleDialog}
            >
              {isDialogOpen ? <Close /> : <Search />}
            </StyledFab>
          </ZoomOnScroll>
        )}
        <Grid item xs={12} md={9}>
          <HotelsList />
        </Grid>
      </Grid>
    </Container>
  )
}

export default HotelsPage
