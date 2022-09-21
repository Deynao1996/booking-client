import { DateRange } from 'react-date-range'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useSearchDataProvider } from '../../contexts/SearchDataContext'
import { useKeyPress } from '../../hooks/useKeyPress'
import DestinationField from '../destinationField/DestinationField'
import StayingGuestsPanel from '../stayingGuestsPanel/StayingGuestsPanel'
import { BsFillCalendarWeekFill } from 'react-icons/bs'
import { initialOptions, formatDate } from '../../data/data'
import { useIsInViewPort } from '../../hooks/useIsInViewPort'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './_searchPanel.scss'

const SearchPanel = () => {
  const { searchParams, setSearchParams } = useSearchDataProvider()
  const [range, setRange] = useState([
    {
      startDate: searchParams.startDate,
      endDate: searchParams.endDate,
      key: 'selection'
    }
  ])
  const [searchOptions, setSearchOptions] = useState(initialOptions)
  const [isRangeOpen, setIsRangeOpen] = useState(false)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [isSuggestionListOpen, setIsSuggestionListOpen] = useState(false)
  const [destinationPlace, setDestinationPlace] = useState(
    searchParams.destination
  )
  const isEnterKeyPress = useKeyPress('Enter')
  const searchContainerRef = useRef()
  const isPanelInViewPort = useIsInViewPort(searchContainerRef)
  const navigate = useNavigate()

  const formattedStartDate = format(range[0].startDate, formatDate)
  const formattedEndDate = format(range[0].endDate, formatDate)

  const onToggleEditor = (setClose, setToggleOpen) => {
    setClose(false)
    setToggleOpen((isOpen) => !isOpen)
  }

  const onToggleOptions = () => {
    onToggleEditor(setIsRangeOpen, setIsOptionsOpen)
  }

  function getObjFromArray() {
    return searchOptions.reduce((prev, current) => {
      prev[current.label] = current.value
      return prev
    }, {})
  }

  function handleSubmit() {
    const optionsObj = getObjFromArray()
    const destination = destinationPlace.replace(/\s/g, '')

    setSearchParams((searchParams) => {
      return {
        ...searchParams,
        maxPrice: null,
        minPrice: null,
        startDate: range[0].startDate,
        endDate: range[0].endDate,
        destination: destination.toLowerCase(),
        ...optionsObj
      }
    })
    navigate('/houses')
  }

  useEffect(() => {
    if (isPanelInViewPort && isEnterKeyPress && !isSuggestionListOpen) {
      handleSubmit()
    }
  }, [isPanelInViewPort, isEnterKeyPress])

  return (
    <div className="search" ref={searchContainerRef}>
      <DestinationField
        destinationPlace={destinationPlace}
        setDestinationPlace={setDestinationPlace}
        setIsSuggestionListOpen={setIsSuggestionListOpen}
      />
      <div className="search__date">
        <BsFillCalendarWeekFill />
        <span onClick={() => onToggleEditor(setIsOptionsOpen, setIsRangeOpen)}>
          {`${formattedStartDate} to ${formattedEndDate}`}
        </span>
        {isRangeOpen && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={range}
            minDate={new Date()}
          />
        )}
      </div>
      <StayingGuestsPanel
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        initialOptions={initialOptions}
        isOptionsOpen={isOptionsOpen}
        onToggleOptions={onToggleOptions}
      />
      <button
        className="button button_blue button_medium button_br-0"
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  )
}

export default SearchPanel
