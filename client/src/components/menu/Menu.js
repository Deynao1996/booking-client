import { useRef } from 'react'
import { useSelector } from '../../hooks/useSelector'
import { Transition } from 'react-transition-group'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import Authorization from '../authorization/Authorization'
import Nav from '../nav/Nav'

import './_menu.scss'

const Menu = ({ setIsMenuOpen, isMenuOpen }) => {
  const handleCloseMenu = () => setIsMenuOpen(false)
  const [q, sectionRef] = useSelector()
  const tlRef = useRef()

  function onEnter() {
    tlRef.current = gsap
      .timeline()
      .from(sectionRef.current, {
        xPercent: '-100',
        opacity: 0
      })
      .from(q('.nav__item'), {
        opacity: 0,
        x: '-20',
        stagger: 0.2
      })
  }

  function onExit() {
    tlRef.current.reverse()
  }

  return (
    <Transition
      timeout={1800}
      mountOnEnter
      unmountOnExit
      nodeRef={sectionRef}
      in={isMenuOpen}
      onEnter={onEnter}
      onExit={onExit}
    >
      <div className="menu" ref={sectionRef}>
        <div className="menu__wrapper">
          <Link to="/" className="menu__label" onClick={handleCloseMenu}>
            Booking
          </Link>
          <Authorization type="mobile" handleCloseMenu={handleCloseMenu} />
        </div>
        <Nav type="mobile" handleCloseMenu={handleCloseMenu} />
      </div>
    </Transition>
  )
}

export default Menu
