import { useEffect, useState } from 'react'
import { FaBed } from 'react-icons/fa'
import { fetchAllCities } from '../../utils/service-utils'
import SuggestionsList from '../suggestionsList/SuggestionsList'

import './_destinationField.scss'

const DestinationField = ({
  destinationPlace,
  setDestinationPlace,
  setIsSuggestionListOpen
}) => {
  const [citiesVariants, setCitiesVariants] = useState([])
  const [suggestions, setSuggestions] = useState([])

  const maxAvailableVariants = 9

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([])
    }, 400)
  }

  const handleChange = (text) => {
    let matches = []
    if (text.length > 0) {
      matches = citiesVariants.filter((variant, i) => {
        if (i > maxAvailableVariants) return
        const regex = new RegExp(`${text}`, 'gi')
        return variant.match(regex)
      })
    }
    setSuggestions(matches)
    setDestinationPlace(text)
  }

  useEffect(() => {
    fetchAllCities().then((res) => setCitiesVariants(res.data))
  }, [])

  return (
    <div className="destination">
      <label htmlFor="destination">
        <FaBed />
      </label>
      <input
        type="text"
        name="destination"
        id="destination"
        autoComplete="off"
        placeholder="Where are you going?"
        onChange={(e) => handleChange(e.target.value)}
        value={destinationPlace}
        onBlur={handleBlur}
      />
      {suggestions.length > 0 && (
        <SuggestionsList
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          setDestinationPlace={setDestinationPlace}
          setIsSuggestionListOpen={setIsSuggestionListOpen}
        />
      )}
    </div>
  )
}

export default DestinationField
