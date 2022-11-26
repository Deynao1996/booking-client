import {
  AirplanemodeActive,
  Cottage,
  DirectionsCar,
  Hotel,
  LocalTaxi
} from '@mui/icons-material'

export const navLinks = [
  {
    label: 'Stays',
    to: '/houses',
    icon: <Hotel />
  },
  {
    label: 'Flights',
    to: '/',
    icon: <AirplanemodeActive />,
    isDisabled: true
  },
  {
    label: 'Car rentals',
    to: '/',
    icon: <DirectionsCar />,
    isDisabled: true
  },
  {
    label: 'Attractions',
    to: '/',
    icon: <Cottage />,
    isDisabled: true
  },
  {
    label: 'Airport taxis',
    to: '/',
    icon: <LocalTaxi />,
    isDisabled: true
  }
]
