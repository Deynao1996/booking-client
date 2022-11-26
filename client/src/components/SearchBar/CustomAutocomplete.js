import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchAllCities } from '../../utils/service-utils'
import { capitalizeString } from '../../utils/capitalize-string-utils'
import { useHandleError } from '../../hooks/useHandleError'
import { useSearchProvider } from '../../contexts/SearchContext'

const CustomAutocomplete = ({ variant = 'outlined' }) => {
  const { searchParams, setSearchParams } = useSearchProvider()
  const [open, setOpen] = useState(false)
  const {
    data,
    error,
    isError,
    isLoading: isLoad
  } = useQuery(['cities'], fetchAllCities, {
    enabled: !!open,
    select: (data) => data.data.map((v) => ({ title: capitalizeString(v) }))
  })
  useHandleError(isError, error)
  const isLoading = isLoad && open

  const handleInputChange = (_event, newInputValue) =>
    setSearchParams((searchParams) => ({
      ...searchParams,
      destination: newInputValue
    }))

  function isOptionEqualToValue(option, value) {
    return option.title === value.title
  }

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      freeSolo
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={(option) => option.title}
      options={data || []}
      disableClearable
      loading={isLoading}
      inputValue={searchParams.destination}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={variant}
          label="Destination"
          sx={{ '& fieldset': { border: 'none' } }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  )
}

export default CustomAutocomplete
