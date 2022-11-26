import { useState } from 'react'
import { Hail } from '@mui/icons-material'
import { Button, ButtonGroup, Menu } from '@mui/material'
import { useSearchProvider } from '../../contexts/SearchContext'

const variants = [
  { label: 'adult', value: 1, icon: <Hail /> },
  { label: 'children', value: 0 },
  { label: 'room', value: 1 }
]

const GuestsPanel = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [guestOptions, setGuestOptions] = useState(variants)

  const handleCount = (n, label) => {
    setGuestOptions((guestOptions) => {
      return guestOptions.map((option) => {
        return option.label === label
          ? { ...option, value: option.value + n }
          : option
      })
    })
  }

  function renderButtonGroup() {
    return (
      <ButtonGroup variant="text" fullWidth size="small">
        {guestOptions.map((v) => (
          <Button
            startIcon={v.icon}
            key={v.label}
            onClick={handleClick}
            data-label={v.label}
          >
            {`${v.value} ${v.label}`}
          </Button>
        ))}
      </ButtonGroup>
    )
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {renderButtonGroup()}
      <CustomMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        handleCount={handleCount}
        guestOptions={guestOptions}
      />
    </>
  )
}

const CustomMenu = ({
  anchorEl,
  open,
  handleClose,
  handleCount,
  guestOptions
}) => {
  const { setSearchParams } = useSearchProvider()
  const title = anchorEl?.getAttribute('data-label')
  const value = findValueFromArr(guestOptions)
  const minValue = findValueFromArr(variants)
  const MAX_VALUE = 10

  const handlePlus = () => {
    handleCount(1, title)
    setSearchParams((searchOptions) => ({
      ...searchOptions,
      [title]: searchOptions[title] + 1
    }))
  }

  const handleMinus = () => {
    handleCount(-1, title)
    setSearchParams((searchOptions) => ({
      ...searchOptions,
      [title]: searchOptions[title] - 1
    }))
  }

  function findValueFromArr(arr) {
    return arr.find((item) => item.label === title)?.value
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <ButtonGroup size="small">
        <Button disabled={value <= minValue} onClick={handleMinus}>
          -
        </Button>
        <Button>{value}</Button>
        <Button onClick={handlePlus} disabled={value > MAX_VALUE}>
          +
        </Button>
      </ButtonGroup>
    </Menu>
  )
}

export default GuestsPanel
