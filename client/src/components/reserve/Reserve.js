import { useMutation } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useSearchDataProvider } from '../../contexts/SearchDataContext'
import { useAuthProvider } from '../../contexts/AuthContext'
import swal from 'sweetalert'
import {
  changeUnavailableDates,
  createOrder,
  sendPayment
} from '../../utils/service-utils'
import { useNavigate } from 'react-router-dom'
import { showError } from '../../utils/show-error-utils'
import { getDatesInRange } from '../../utils/dates-utils'
import { modalOptions } from '../../data/modalOptions'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import './_reserve.scss'

const Reserve = ({
  handleCloseModal,
  data,
  days,
  setIsCheckoutLoading,
  ...hotelInfo
}) => {
  const { currentUser } = useAuthProvider()
  const [reserveState, setReserveState] = useState({
    reservePrice: 0,
    reservePeople: 0,
    reserveRooms: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const { searchParams } = useSearchDataProvider()
  const { mutate } = useMutation(changeUnavailableDates)
  const navigate = useNavigate()

  const {
    orderModalInfo: { cashInfo, ...confirmModalSettings }
  } = modalOptions
  const totalPeopleCount = searchParams.adult + searchParams.children
  const isDisabled = reserveState.reservePeople < totalPeopleCount
  const selectedRangeList = useMemo(
    () => getDatesInRange(searchParams.startDate, searchParams.endDate),
    []
  )

  const onHandleChange = (e, maxPeople, currentPrice) => {
    const isChecked = e.target.checked
    const value = e.target.value

    setReserveState((reserveState) =>
      isChecked
        ? {
            reservePrice: reserveState.reservePrice + currentPrice,
            reservePeople: reserveState.reservePeople + maxPeople,
            reserveRooms: [...reserveState.reserveRooms, value]
          }
        : {
            reservePrice: reserveState.reservePrice - currentPrice,
            reservePeople: reserveState.reservePeople - maxPeople,
            reserveRooms: reserveState.reserveRooms.filter(
              (roomId) => roomId !== value
            )
          }
    )
  }

  function isAvailable(unavailableDates) {
    const isExist = unavailableDates.some((date) =>
      selectedRangeList.includes(new Date(date).getTime())
    )
    return isExist
  }

  async function startPayment(order) {
    setIsCheckoutLoading(true)
    const { hotelImage: image } = hotelInfo

    try {
      const res = await sendPayment({ ...order, image })
      if (res.data.url) {
        window.location.href = res.data.url
      }
    } catch (error) {
      showError()
    } finally {
      setIsCheckoutLoading(false)
    }
  }

  function showConfirmModal(order) {
    setIsLoading(false)
    swal(confirmModalSettings).then((willDelete) => {
      if (willDelete) {
        startPayment(order)
      } else {
        swal(cashInfo, { icon: 'success' }).then(() => navigate('/'))
      }
    })
  }

  function onSuccess(order) {
    handleCloseModal()
    showConfirmModal(order)
  }

  function checkPlural(value, word) {
    if (value === 1) {
      return `${value} ${word}`
    } else {
      return `${value} ${word}s`
    }
  }

  function buildOrder() {
    const { hotelName } = hotelInfo
    const { reservePrice: price, reserveRooms } = reserveState
    const totalRooms = checkPlural(reserveRooms.length, 'room')
    const totalNights = checkPlural(days, 'night')
    return {
      reserveRooms,
      hotelName,
      price,
      userId: currentUser._id,
      descr: `${totalRooms} for ${totalPeopleCount} people to stay for ${totalNights}`,
      dates: selectedRangeList
    }
  }

  async function handleClick() {
    setIsLoading(true)
    const order = buildOrder()

    try {
      const res = await createOrder(order)
      if (res?.name === 'AxiosError') return

      reserveState.reserveRooms.forEach((roomId) => {
        mutate(
          { roomId, dates: selectedRangeList },
          {
            onSuccess: () => onSuccess(res.data),
            onError: (e) => {
              showError()
              setIsLoading(false)
            }
          }
        )
      })
    } catch (error) {
      showError()
    } finally {
      setIsLoading(false)
    }
  }

  function renderRooms() {
    if (!data) return
    return data.map(({ _id, title, descr, price, roomNumbers, maxPeople }) => {
      const currentPrice = days * price * searchParams.room

      return (
        <div className="reserve__item" key={_id}>
          <div className="reserve__info">
            <div className="reserve__title">{title}</div>
            <div className="reserve__desc">{descr}</div>
            <div className="reserve__max">
              Max people: <b>{maxPeople}</b>
            </div>
            <div className="reserve__price">{currentPrice} $</div>
          </div>
          {renderSelects(roomNumbers, maxPeople, currentPrice)}
        </div>
      )
    })
  }

  function renderSelects(rooms, maxPeople, currentPrice) {
    return rooms.map(({ number, unavailableDates, _id }) => {
      const isDisabled = isAvailable(unavailableDates)

      return (
        <div className="reserve__select" key={_id}>
          <div className="reserve__room">
            <label>{number}</label>
            <input
              type="checkbox"
              onChange={(e) => onHandleChange(e, maxPeople, currentPrice)}
              value={_id}
              disabled={isDisabled}
              title={
                isDisabled
                  ? 'This room is unavailable on the selected dates '
                  : ''
              }
            />
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <div className="reserve__top">
        <span>Select your rooms:</span>
        <AiOutlineCloseCircle
          className="reserve__close"
          onClick={handleCloseModal}
        />
      </div>
      {renderRooms()}
      <div className="reserve__bottom">
        <button
          className="button-usuall button-usuall_w-100"
          disabled={isDisabled || isLoading}
          title={
            isDisabled
              ? `Chose more rooms to settle ${
                  totalPeopleCount - reserveState.reservePeople
                } left people`
              : ''
          }
          onClick={handleClick}
        >
          Reserve Now!
        </button>
      </div>
    </>
  )
}

export default Reserve
