import { forwardRef, useRef } from 'react'
import {
  Button,
  Divider,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { AccessibilityNew, Chair, EscalatorWarning } from '@mui/icons-material'
import { useSearchProvider } from '../contexts/SearchContext'
import CustomAutocomplete from './SearchBar/CustomAutocomplete'
import CustomDatePicker from './SearchBar/CustomDatePicker'
import { NumericFormat } from 'react-number-format'
import TransformOnScroll from './ScrollWrappers/TransformOnScroll'

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        })
      }}
      thousandSeparator
      allowNegative={false}
    />
  )
})

const AsideSearchPanel = ({ cb }) => {
  const { searchParams, setSearchParams } = useSearchProvider()
  const roomRef = useRef(searchParams.room)
  const childrenRef = useRef(searchParams.children)
  const adultRef = useRef(searchParams.adult)
  const minPriceRef = useRef(searchParams.minPrice)
  const maxPriceRef = useRef(searchParams.maxPrice)

  function handleSubmit(e) {
    e.preventDefault()
    const obj = {
      adult: adultRef.current,
      children: childrenRef.current,
      room: roomRef.current,
      minPrice: minPriceRef.current,
      maxPrice: maxPriceRef.current
    }
    console.log(adultRef.current)
    setSearchParams((searchParams) => ({ ...searchParams, ...obj }))
    cb?.()
  }

  function handleDisableSymbols(event) {
    if (event?.key === '-' || event?.key === '+') {
      event.preventDefault()
    }
  }

  return (
    <TransformOnScroll>
      <Paper
        sx={{ flex: '1 1 266px', p: 1.5, position: 'sticky', top: 70, left: 0 }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Stack direction="column" spacing={1}>
          <Typography variant="h6" color="primary.main">
            Search
          </Typography>
          <CustomAutocomplete variant="standard" />
          <CustomDatePicker
            direction="column"
            justifyContent="space-between"
            variant="standard"
          />
          <Divider>
            <Typography variant="caption" color="primary.main">
              OPTIONS
            </Typography>
          </Divider>
          <Stack direction="column" spacing={1} paddingX={1} paddingBottom={1}>
            <TextField
              label="Min price per night"
              onChange={(e) => (minPriceRef.current = parseInt(e.target.value))}
              fullWidth
              InputProps={{
                inputComponent: NumberFormatCustom,
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                )
              }}
              variant="standard"
            />
            <TextField
              label="Max price per night"
              onChange={(e) => (maxPriceRef.current = parseInt(e.target.value))}
              fullWidth
              InputProps={{
                inputComponent: NumberFormatCustom,
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                )
              }}
              variant="standard"
            />
            <TextField
              label="Adult"
              placeholder="1"
              fullWidth
              type="number"
              defaultValue={adultRef.current}
              onChange={(e) => (adultRef.current = e.target.value)}
              onKeyPress={handleDisableSymbols}
              InputProps={{
                pattern: '[1-9]*',
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessibilityNew />
                  </InputAdornment>
                ),
                min: 0,
                max: 999
              }}
              variant="standard"
            />
            <TextField
              label="Children"
              min="0"
              placeholder="0"
              fullWidth
              type="number"
              defaultValue={childrenRef.current}
              onKeyPress={handleDisableSymbols}
              onChange={(e) => (childrenRef.current = e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EscalatorWarning />
                  </InputAdornment>
                )
              }}
              variant="standard"
            />
            <TextField
              label="Room"
              min="1"
              placeholder="1"
              fullWidth
              type="number"
              defaultValue={roomRef.current}
              onKeyPress={handleDisableSymbols}
              onChange={(e) => (roomRef.current = e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Chair />
                  </InputAdornment>
                )
              }}
              variant="standard"
            />
            <Button type="submit" variant="contained" fullWidth>
              Apply
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </TransformOnScroll>
  )
}

export default AsideSearchPanel
