import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { useSearchDataProvider } from '../../contexts/SearchDataContext'
import { useKeyPress } from '../../hooks/useKeyPress'
import { formatDate } from '../../data/data'

import './_asideSearchPanel.scss'

const AsideSearchPanel = () => {
  const { searchParams, setSearchParams } = useSearchDataProvider()
  const isEnterKeyPress = useKeyPress('Enter')
  const [range, setRange] = useState([
    {
      startDate: searchParams.startDate,
      endDate: searchParams.endDate,
      key: 'selection'
    }
  ])
  const [isRangeOpen, setIsRangeOpen] = useState(false)
  const [destination, setDestination] = useState(searchParams.destination)

  const formattedStartDate = format(range[0].startDate, formatDate)
  const formattedEndDate = format(range[0].endDate, formatDate)
  const roomRef = useRef(searchParams.room)
  const childrenRef = useRef(searchParams.children)
  const adultRef = useRef(searchParams.adult)
  const minPriceRef = useRef(searchParams.minPrice)
  const maxPriceRef = useRef(searchParams.maxPrice)

  function handleSubmit(e) {
    if (e) e.preventDefault()
    const obj = {
      destination: destination.toLowerCase(),
      startDate: new Date(range[0].startDate),
      endDate: new Date(range[0].endDate),
      adult: adultRef.current,
      children: childrenRef.current,
      room: roomRef.current,
      minPrice: minPriceRef.current,
      maxPrice: maxPriceRef.current
    }
    setSearchParams(obj)
  }

  useEffect(() => {
    isEnterKeyPress && handleSubmit()
  }, [isEnterKeyPress])

  return (
    <aside className="aside">
      <h5 className="aside__title">Search</h5>
      <form className="aside__form" onSubmit={handleSubmit}>
        <span>Destination</span>
        <input
          type="text"
          name="destination"
          value={destination}
          placeholder="Where are you going?"
          onChange={(e) => setDestination(e.target.value)}
        />
        <span>Check-in Date</span>
        <div
          className="aside__pseudo-input"
          onClick={() => setIsRangeOpen((isRangeOpen) => !isRangeOpen)}
        >{`${formattedStartDate} to ${formattedEndDate}`}</div>
        {isRangeOpen && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={range}
            minDate={new Date()}
          />
        )}
        <span>Options</span>
        <div className="aside__options">
          <div className="aside__option aside__price">
            <span>
              Min price <small>per night</small>
            </span>
            <input
              type="number"
              aria-autocomplete="list"
              min="1"
              max="10000"
              onChange={(e) => (minPriceRef.current = e.target.value)}
            />
          </div>
          <div className="aside__option aside__price">
            <span>
              Max price <small>per night</small>
            </span>
            <input
              type="number"
              min="1"
              max="10000"
              onChange={(e) => (maxPriceRef.current = e.target.value)}
            />
          </div>
          <div className="aside__option">
            <span>Adult</span>
            <input
              type="number"
              min="1"
              placeholder="1"
              defaultValue={adultRef.current}
              onChange={(e) => (adultRef.current = e.target.value)}
            />
          </div>
          <div className="aside__option">
            <span>Children</span>
            <input
              type="number"
              min="0"
              placeholder="0"
              defaultValue={childrenRef.current}
              onChange={(e) => (childrenRef.current = e.target.value)}
            />
          </div>
          <div className="aside__option">
            <span>Room</span>
            <input
              type="number"
              min="1"
              placeholder="1"
              defaultValue={roomRef.current}
              onChange={(e) => (roomRef.current = e.target.value)}
            />
          </div>
        </div>
        <button className="button button_blue button_br-0">Search</button>
      </form>
    </aside>
  )
}

export default AsideSearchPanel
