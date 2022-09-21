import React, { useContext, useState } from 'react'
import { endDateOffset, initialOptions } from '../data/data'

const SearchDataContext = React.createContext()

export const useSearchDataProvider = () => {
  return useContext(SearchDataContext)
}

export const SearchDataProvider = ({ children }) => {
  const offsetDate = new Date()
  offsetDate.setDate(new Date().getDate() + endDateOffset)
  const defaultData = {
    destination: '',
    startDate: new Date(),
    endDate: offsetDate,
    adult: initialOptions[0].value,
    children: initialOptions[1].value,
    room: initialOptions[2].value,
    minPrice: null,
    maxPrice: null
  }

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
    <SearchDataContext.Provider value={value}>
      {children}
    </SearchDataContext.Provider>
  )
}
