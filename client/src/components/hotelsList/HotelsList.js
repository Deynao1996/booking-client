import { useInfiniteQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useSearchDataProvider } from '../../contexts/SearchDataContext'
import { useIsInViewPort } from '../../hooks/useIsInViewPort'
import { fetchHouses } from '../../utils/service-utils'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'

import './_hotelsList.scss'

export function getOpinion(param) {
  if (param < 2) {
    return 'Poor'
  } else if (param > 8) {
    return 'Excellent'
  } else {
    return 'Universal'
  }
}

export function getFloatRating(rating) {
  return Number.isInteger(rating) ? rating + '.0' : rating
}

const HotelsList = () => {
  const location = useLocation()
  const { searchParams } = useSearchDataProvider()
  const triggerRef = useRef()
  const inView = useIsInViewPort(triggerRef)

  const city = searchParams?.destination
  const type = location.search.split('=')[1]
  const min = searchParams?.minPrice
  const max = searchParams?.maxPrice
  const room = searchParams?.room
  const adult = searchParams?.adult
  const children = searchParams?.children
  const limit = 10

  const {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(
    ['houses', { type, city, min, max, limit, room }, adult, children],
    ({ pageParam = 1, queryKey }) => fetchHouses({ queryKey, pageParam }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (pages.length < lastPage.data.totalPages) {
          return pages.length + 1
        } else {
          return undefined
        }
      }
    }
  )

  function renderHotels() {
    return data?.pages.map((group, i) => {
      return (
        <Fragment key={i}>
          {group.data.hotels.map((hotel) => (
            <View key={hotel._id} {...hotel} />
          ))}
        </Fragment>
      )
    })
  }

  useEffect(() => {
    if (hasNextPage && inView) fetchNextPage()
  }, [inView])

  if (data?.name === 'AxiosError') return <ErrorMessage />
  const hotelsContent =
    data?.pages[0].data.hotels.length === 0 ? (
      <li className="hotels__empty">No available options now!</li>
    ) : (
      renderHotels()
    )

  return (
    <>
      <ul className="hotels">
        {(isLoading || isFetching) && <Skeleton type={'hotel'} count={4} />}
        {hotelsContent}
        {isFetchingNextPage && <Skeleton type={'hotel'} count={2} />}
      </ul>
      <div className="hotels__trigger" ref={triggerRef}></div>
    </>
  )
}

const View = (props) => {
  const floatRating = getFloatRating(props.rating)

  return (
    <li className="hotels__item" ref={props.k === 8 ? ref : null}>
      <div className="hotels__img">
        <img src={props.photos[0]} alt="hotel" />
      </div>
      <div className="hotels__info">
        <span className="hotels__title">{props.name}</span>
        <span className="hotels__distance">{props.distance}m from center</span>
        <span className="hotels__taxi">Free airport taxi</span>
        <span className="hotels__square">{props.subDescription}</span>
        {props.featured && (
          <span className="hotels__features">{props.features}</span>
        )}
        <span className="hotels__cancellation">Free cancellation</span>
        <span className="hotels__subtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="hotels__view">
        <div className="hotels__top">
          <span>{getOpinion(props.rating)}</span>
          <div>{floatRating}</div>
        </div>
        <div className="hotels__bottom">
          <div className="hotels__price">${props.cheapestPrice}</div>
          <span>Includes taxes and fees</span>
          <Link className="button-usuall button-usuall_w-100" to={props._id}>
            See availability
          </Link>
        </div>
      </div>
    </li>
  )
}

export default HotelsList
