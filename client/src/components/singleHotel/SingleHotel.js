import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuthProvider } from '../../contexts/AuthContext'
import Lightbox from 'react-image-lightbox'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchHotel } from '../../utils/service-utils'
import { useSearchDataProvider } from '../../contexts/SearchDataContext'
import { getDayDifference } from '../../utils/dates-utils'
import ReserveContainer from '../../components/reserveContainer/ReserveContainer'
import Skeleton from '../../components/skeleton/Skeleton'
import { ImLocation } from 'react-icons/im'

import 'react-image-lightbox/style.css'
import './_singleHotel.scss'

const SingleHotel = () => {
  const { hotelId } = useParams()
  const { searchParams } = useSearchDataProvider()
  const [boxState, setBoxState] = useState({ photoIndex: 0, isOpen: false })
  const [isReserveOpen, setIsReserveOpen] = useState(false)
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)
  const { data, isLoading } = useQuery(['hotel', hotelId], fetchHotel)
  const days = getDayDifference(searchParams.endDate, searchParams.startDate)

  return (
    <div className="hotel">
      {isReserveOpen && (
        <ReserveContainer
          setIsReserveOpen={setIsReserveOpen}
          roomIds={data?.data.rooms}
          days={days}
          setIsCheckoutLoading={setIsCheckoutLoading}
          hotelName={data?.data.name}
          hotelImage={data?.data.photos[0]}
        />
      )}
      {boxState.isOpen && (
        <Lightbox
          mainSrc={data?.data.photos[boxState.photoIndex]}
          nextSrc={
            data?.data.photos[
              (boxState.photoIndex + 1) % data?.data.photos.length
            ]
          }
          prevSrc={
            data?.data.photos[
              (boxState.photoIndex + data?.data.photos.length - 1) %
                data?.data.photos.length
            ]
          }
          onCloseRequest={() =>
            setBoxState((boxState) => ({ ...boxState, isOpen: false }))
          }
          onMovePrevRequest={() =>
            setBoxState((boxState) => ({
              ...boxState,
              photoIndex:
                (boxState.photoIndex + data?.data.photos.length - 1) %
                data?.data.photos.length
            }))
          }
          onMoveNextRequest={() =>
            setBoxState((boxState) => ({
              ...boxState,
              photoIndex: (boxState.photoIndex + 1) % data?.data.photos.length
            }))
          }
        />
      )}
      <div className="container">
        {isLoading || isCheckoutLoading ? (
          <Skeleton type={'single-hotel'} />
        ) : (
          <Hotel
            setBoxState={setBoxState}
            setIsReserveOpen={setIsReserveOpen}
            days={days}
            room={searchParams.room}
            {...data.data}
          />
        )}
      </div>
    </div>
  )
}

const Hotel = ({ setIsReserveOpen, setBoxState, days, room, ...props }) => {
  const { currentUser } = useAuthProvider()
  const navigate = useNavigate()
  const location = useLocation()
  const capitalizedCity =
    props.city.charAt(0).toUpperCase() + props.city.slice(1)

  const handleClick = () => {
    if (!currentUser) {
      return navigate('/auth/login', { state: { fromPage: location.pathname } })
    }
    setIsReserveOpen(true)
  }

  function renderImagesGallery(images) {
    return images.map((image, i) => {
      return (
        <div
          className="hotel__item"
          key={i}
          onClick={() => setBoxState({ isOpen: true, photoIndex: i })}
        >
          <img src={image} alt="gallery" />
        </div>
      )
    })
  }

  const btnContent = currentUser
    ? 'Reserve or Book Now!'
    : 'Sign in and Reserve or Book Now!'

  return (
    <>
      <div className="hotel__top">
        <div className="hotel__info">
          <h6 className="hotel__title">{props.name}</h6>
          <button className="button-usuall" onClick={handleClick}>
            {btnContent}
          </button>
        </div>
        <address className="hotel__address">
          <ImLocation />
          <span>{props.address}</span>
        </address>
        <span className="hotel__location">
          Excellent location - {props.distance}m from center
        </span>
        <span className="hotel__taxi">
          Book a stay over ${props.cheapestPrice} at this property and get a
          free airport taxi
        </span>
        <div className="hotel__gallery">
          {renderImagesGallery(props.photos)}
        </div>
      </div>
      <div className="hotel__bottom">
        <div className="hotel__data">
          <h6 className="hotel__subtitle">{props.title}</h6>
          <span>{props.description}</span>
        </div>
        <div className="hotel__reserve">
          <span>Perfect for a {days}-night stay!</span>
          <div className="hotel__text">
            {`Located in the real heart of ${capitalizedCity}, this property has an excellent
            location score of ${props.rating}!`}
          </div>
          <div className="hotel__price">
            <b>${days * props.cheapestPrice * room}</b> ({days} nights)
          </div>
          <button className="button-usuall" onClick={handleClick}>
            {btnContent}
          </button>
        </div>
      </div>
    </>
  )
}

export default SingleHotel
