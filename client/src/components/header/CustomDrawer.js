import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import SwitchColorTheme from '../SwitchColorTheme'
import { navLinks } from '../../data/nav-items-data'
import styled from '@emotion/styled'

const DRAWER_WIDTH = 240

const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isDisabled'
})(({ isDisabled }) => ({
  pointerEvents: isDisabled ? 'none' : 'auto',
  color: isDisabled ? 'grey' : 'inherit',
  textDecoration: 'none',
  width: '100%'
}))

const CustomDrawer = ({ handleDrawer, container, mobileOpen }) => {
  const navigate = useNavigate()

  function handleDrawerClick(to) {
    navigate(to)
    handleDrawer(false)
  }

  function renderDrawerItems() {
    return navLinks.map((item) => (
      <ListItem key={item.label} disableGutters>
        <StyledLink to={item.to} isDisabled={item.isDisabled}>
          <ListItemButton sx={{ textAlign: 'start' }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </StyledLink>
      </ListItem>
    ))
  }

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        sx={{ m: 2, cursor: 'pointer' }}
        onClick={() => handleDrawerClick('/')}
        align="left"
      >
        Booking
      </Typography>
      <Divider />
      <List>{renderDrawerItems()}</List>
      <Divider />
      <SwitchColorTheme isMobile />
    </Box>
  )

  return (
    <Box component="nav">
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={() => handleDrawer(false)}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH
          }
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default CustomDrawer
