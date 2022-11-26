import { Stack } from '@mui/system'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TextField, useMediaQuery } from '@mui/material'
import { useThemeProvider } from '../../contexts/ThemeContext'
import { addWeeks } from '../../utils/dates-utils'
import { MAX_WEEK_DATE_RANGE } from '../../data/data'
import { useSearchProvider } from '../../contexts/SearchContext'
import { addDays } from 'date-fns'

const CustomDatePicker = ({ variant = 'outlined', ...props }) => {
  const { theme } = useThemeProvider()
  const { searchParams, setSearchParams } = useSearchProvider()
  const { arrivalDate, departureDate } = searchParams
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const maxRange = addWeeks(MAX_WEEK_DATE_RANGE)

  const setArrivalDate = (newValue) => {
    setSearchParams((searchParams) => ({
      ...searchParams,
      arrivalDate: newValue
    }))
  }

  const setDepartureDate = (newValue) => {
    setSearchParams((searchParams) => ({
      ...searchParams,
      departureDate: newValue
    }))
  }

  function renderInput(params, placeHolder) {
    return (
      <TextField
        variant={variant}
        sx={{ '& fieldset': { border: 'none' } }}
        placeholder={isMobile ? placeHolder : ''}
        {...params}
      />
    )
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={{ start: 'Check-in', end: 'Check-out' }}
    >
      <Stack spacing={1} {...props}>
        <DatePicker
          label={'Arrival date'}
          value={arrivalDate}
          disablePast
          maxDate={maxRange}
          onChange={(newValue) => {
            setArrivalDate(newValue)
          }}
          renderInput={(params) => renderInput(params, 'Arrival Date')}
        />
        <DatePicker
          disablePast
          maxDate={maxRange}
          minDate={addDays(arrivalDate, 1)}
          label={'Departure date'}
          value={departureDate}
          onChange={(newValue) => {
            setDepartureDate(newValue)
          }}
          renderInput={(params) => renderInput(params, 'Departure Date')}
        />
      </Stack>
    </LocalizationProvider>
  )
}

export default CustomDatePicker
