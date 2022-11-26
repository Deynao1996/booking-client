import styled from '@emotion/styled'
import { Facebook, GitHub, Instagram, Telegram } from '@mui/icons-material'
import {
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  Typography
} from '@mui/material'

export const StyledListTitle = styled(Link)(({ theme }) => ({
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.text.primary
      : theme.palette.common.black,
  textTransform: 'uppercase'
}))

export const StyledListLink = styled(Link)(({ theme }) => ({
  cursor: 'pointer',
  color:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.7)'
      : 'rgba(0, 0, 0, 0.54)',
  textTransform: 'capitalize',
  '&:hover': {
    color: theme.palette.text.primary
  }
}))

const categoriesArr = [
  'category',
  'flights',
  'car rentals',
  'attractions',
  'airport taxi'
]

const informationArr = ['license', 'privacy policy', 'releases', 'FAQ']

const aboutArr = ['about', 'contact', 'team', 'support']

const Footer = () => {
  function renderList(arr) {
    return (
      <List>
        {arr.map((item, i) => {
          return i === 0 ? (
            <ListItem key={i}>
              <StyledListTitle underline="none">{item}</StyledListTitle>
            </ListItem>
          ) : (
            <ListItem key={i}>
              <StyledListLink underline="hover">{item}</StyledListLink>
            </ListItem>
          )
        })}
      </List>
    )
  }

  return (
    <>
      <Grid
        container
        sx={{
          py: 6,
          px: 2,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#192D36' : 'rgba(0, 0, 0, 0.04)'
        }}
      >
        <Grid item xs={12} sm={12} md={3}>
          <List>
            <ListItem>
              <Typography variant="h4">Booking</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                Architect VR, 830-1183 BKK Thailand 10220
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">admin@arc.fake</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          {renderList(categoriesArr)}
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          {renderList(informationArr)}
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          {renderList(aboutArr)}
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <List>
            <ListItem>
              <StyledListTitle underline="none">Subscribe</StyledListTitle>
            </ListItem>
            <ListItem>
              <IconButton aria-label="delete">
                <Facebook />
              </IconButton>
              <IconButton aria-label="delete">
                <Instagram />
              </IconButton>
              <IconButton aria-label="delete">
                <GitHub />
              </IconButton>
              <IconButton aria-label="delete">
                <Telegram />
              </IconButton>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  )
}

export default Footer
