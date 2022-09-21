import { GiPerson } from 'react-icons/gi'

import './_stayingGuestsPanel.scss'

const StayingGuestsPanel = ({
  initialOptions,
  searchOptions,
  setSearchOptions,
  isOptionsOpen,
  onToggleOptions
}) => {
  const calcOptionValues = (e, label) => {
    setSearchOptions((prevOptions) => {
      return prevOptions.map((option) => {
        if (option.label === label) {
          const currentValue =
            e.target.innerText === '+' ? option.value + 1 : option.value - 1
          return { ...option, value: currentValue }
        } else {
          return option
        }
      })
    })
  }

  function renderOptionLabels() {
    return searchOptions.reduce((prev, current, i, arr) => {
      const { value } = current
      const newLabel = current.value < 2 ? current.label : current.label + 's'
      return (prev +=
        i !== arr.length - 1
          ? `${value} ${newLabel} · `
          : `${value} ${newLabel}`)
    }, '')
  }

  function renderOptions() {
    return searchOptions.map(({ label, value }, i) => {
      const isDisabled = initialOptions.some((option) => {
        return option.label === label && value <= option.value
      })

      return (
        <div className={`guests__${label}`} key={i}>
          <span>{label}</span>
          <div className="guests__btns">
            <button
              disabled={isDisabled}
              onClick={(e) => calcOptionValues(e, label)}
            >
              -
            </button>
            <div>{value}</div>
            <button onClick={(e) => calcOptionValues(e, label)}>+</button>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="guests">
      <GiPerson />
      <span onClick={onToggleOptions}>{renderOptionLabels()}</span>
      {isOptionsOpen && (
        <div className="guests__options">{renderOptions()}</div>
      )}
    </div>
  )
}

export default StayingGuestsPanel
