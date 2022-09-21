import { useState } from 'react'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Nav from '../nav/Nav'
import Menu from '../menu/Menu'
import Authorization from '../authorization/Authorization'

import './_header.scss'

const HEADER__STICKY__STYLES = {
  position: 'sticky',
  top: 0,
  left: 0
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const queryWidth = 778
  const isLaptop = useMediaQuery({
    query: `(max-width: ${queryWidth}px)`
  })

  return (
    <header
      className="header"
      style={isLaptop ? { ...HEADER__STICKY__STYLES } : {}}
    >
      <div className="container">
        <div className="header__banner">
          <Link to="/" className="header__label">
            Booking
          </Link>
          <MediaQuery minWidth={queryWidth}>
            <Authorization type="desktop" />
          </MediaQuery>
          <MediaQuery maxWidth={queryWidth}>
            <button
              className="button header__menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AiOutlineMenu />
            </button>
            <Menu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
          </MediaQuery>
        </div>
        <MediaQuery minWidth={queryWidth}>
          <Nav type="desktop" />
        </MediaQuery>
      </div>
    </header>
  )
}

export default Header
