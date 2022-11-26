import React, { useContext, useState } from 'react'
import { addWeeks } from '../utils/dates-utils'

const SearchContext = React.createContext()
const defaultData = {
  destination: '',
  arrivalDate: new Date(Date.now()),
  departureDate: addWeeks(1),
  adult: 1,
  children: 0,
  room: 1,
  minPrice: null,
  maxPrice: null
}

export const useSearchProvider = () => {
  return useContext(SearchContext)
}

export const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState(defaultData)

  function resetSearchParams(obj) {
    if (obj) {
      setSearchParams({ ...defaultData, ...obj })
    } else {
      setSearchParams(defaultData)
    }
  }

  const value = {
    searchParams,
    setSearchParams,
    resetSearchParams
  }

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}
