import { IoAirplane } from 'react-icons/io5'
import { FaBed, FaTaxi } from 'react-icons/fa'
import { AiFillCar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import './_nav.scss'

const Nav = ({ type, handleCloseMenu }) => {
  return (
    <ul
      className="nav"
      style={{ flexDirection: type === 'mobile' ? 'column' : 'row' }}
    >
      <li className="nav__item nav__item_active">
        <Link
          to="/houses"
          className="nav__link nav__link_active"
          onClick={handleCloseMenu}
        >
          <FaBed />
          <span>Stays</span>
        </Link>
      </li>
      <li className="nav__item">
        <a
          href="#"
          className="nav__link nav__link_disabled"
          title="Not available yet!"
        >
          <IoAirplane />
          <span>Flights</span>
        </a>
      </li>
      <li className="nav__item">
        <a
          href="#"
          className="nav__link nav__link_disabled"
          title="Not available yet!"
        >
          <AiFillCar />
          <span>Car rentals</span>
        </a>
      </li>
      <li className="nav__item">
        <a
          href="#"
          className="nav__link nav__link_disabled"
          title="Not available yet!"
        >
          <FaBed />
          <span>Attractions</span>
        </a>
      </li>
      <li className="nav__item">
        <a
          href="#"
          className="nav__link nav__link_disabled"
          title="Not available yet!"
        >
          <FaTaxi />
          <span>Airport taxis</span>
        </a>
      </li>
    </ul>
  )
}

export default Nav
