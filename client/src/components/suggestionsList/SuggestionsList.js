import { useEffect, useState } from 'react'
import { useKeyPress } from '../../hooks/useKeyPress'

import './_suggestionsList.scss'

const SuggestionsList = ({
  suggestions,
  setSuggestions,
  setDestinationPlace,
  setIsSuggestionListOpen
}) => {
  const [selectedOption, setSelectedOption] = useState(0)
  const [isHover, setIsHover] = useState(false)
  const isArrowDownPress = useKeyPress('ArrowDown')
  const isArrowUpPress = useKeyPress('ArrowUp')
  const isEnterKeyPress = useKeyPress('Enter')

  const handleSuggest = (text) => {
    setDestinationPlace(text)
    setSuggestions([])
  }

  const handleCounter = (num) => {
    if (num < 0) {
      if (selectedOption === 0) return setSelectedOption(suggestions.length)
      if (selectedOption === 1) return setSelectedOption(suggestions.length)
    } else {
      if (selectedOption >= suggestions.length) return setSelectedOption(1)
    }
    setSelectedOption((selectedOption) => selectedOption + num)
  }

  function renderSuggestionsList() {
    return suggestions.map((city, i) => {
      const customClassName = i === selectedOption - 1 ? 'custom-hover' : ''
      return (
        <li
          key={i}
          onClick={() => handleSuggest(city)}
          className={isHover ? '' : customClassName}
        >
          {city}
        </li>
      )
    })
  }

  useEffect(() => {
    isArrowDownPress && handleCounter(1)
    isArrowUpPress && handleCounter(-1)
  }, [isArrowDownPress, isArrowUpPress])

  useEffect(() => {
    isEnterKeyPress && handleSuggest(suggestions[selectedOption - 1])
  }, [isEnterKeyPress])

  useEffect(() => {
    setIsSuggestionListOpen(true)
    return () => {
      setIsSuggestionListOpen(false)
    }
  }, [])

  return (
    <ul
      className="suggestions"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {renderSuggestionsList()}
    </ul>
  )
}

export default SuggestionsList
