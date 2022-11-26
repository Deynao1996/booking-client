import styled from '@emotion/styled'
import { Button, ButtonGroup } from '@mui/material'
import { Link } from 'react-router-dom'
import { navLinks } from '../data/nav-items-data'

export const StyledLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none'
}))

const DesktopNav = () => {
  function renderBtns() {
    return navLinks.map((link) => {
      return (
        <StyledLink to={link.to} key={link.label}>
          <Button
            startIcon={link.icon}
            sx={(theme) => ({
              px: 2,
              [theme.breakpoints.down('md')]: {
                fontSize: theme.spacing(1.5)
              }
            })}
            disabled={link.isDisabled}
            variant={link.isDisabled ? 'text' : 'outlined'}
          >
            {link.label}
          </Button>
        </StyledLink>
      )
    })
  }

  return (
    <ButtonGroup aria-label="outlined button group" sx={{ py: 4 }}>
      {renderBtns()}
    </ButtonGroup>
  )
}

export default DesktopNav
