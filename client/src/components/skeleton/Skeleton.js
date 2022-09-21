import './_skeleton.scss'

const Skeleton = ({ type, count = 1 }) => {
  const CitySkeleton = () => {
    return (
      <li className="city-skeleton">
        <div className="city-skeleton__title"></div>
        <div className="city-skeleton__subtitle"></div>
      </li>
    )
  }

  const PropertySkeleton = () => {
    return (
      <li className="property-skeleton">
        <div className="property-skeleton__bg"></div>
        <div className="property-skeleton__title"></div>
        <div className="property-skeleton__subtitle"></div>
      </li>
    )
  }

  const HomeSkeleton = () => {
    return (
      <li className="home-skeleton">
        <div className="home-skeleton__bg"></div>
        <div className="home-skeleton__title"></div>
        <div className="home-skeleton__location"></div>
        <div className="home-skeleton__price"></div>
        <div className="home-skeleton__opinion"></div>
      </li>
    )
  }

  const HotelSkeleton = () => {
    return (
      <li className="hotel-skeleton">
        <div className="hotel-skeleton__bg"></div>
        <div className="hotel-skeleton__content"></div>
      </li>
    )
  }

  const SingleHotelSkeleton = () => {
    return (
      <>
        <div className="single-hotel-skeleton__top">
          <div className="single-hotel-skeleton__info"></div>
          <div className="single-hotel-skeleton__address"></div>
          <div className="single-hotel-skeleton__location"></div>
          <div className="single-hotel-skeleton__taxi"></div>
          <div className="single-hotel-skeleton__gallery">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </>
    )
  }

  const ReserveModalSkeleton = () => {
    return (
      <div className="reserve-skeleton">
        <div className="reserve-skeleton__title"></div>
        <div className="reserve-skeleton__item">
          <div className="reserve-skeleton__content">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="reserve-skeleton__select"></div>
          <div className="reserve-skeleton__select"></div>
          <div className="reserve-skeleton__select"></div>
        </div>
        <div className="reserve-skeleton__item">
          <div className="reserve-skeleton__content">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="reserve-skeleton__select"></div>
          <div className="reserve-skeleton__select"></div>
          <div className="reserve-skeleton__select"></div>
        </div>
        <div className="reserve-skeleton__item">
          <div className="reserve-skeleton__content">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="reserve-skeleton__select"></div>
          <div className="reserve-skeleton__select"></div>
          <div className="reserve-skeleton__select"></div>
        </div>
        <div className="reserve-skeleton__button"></div>
      </div>
    )
  }

  switch (type) {
    case 'city':
      return Array.from(Array(count), (_, i) => <CitySkeleton key={i} />)
    case 'property':
      return Array.from(Array(count), (_, i) => <PropertySkeleton key={i} />)
    case 'home':
      return Array.from(Array(count), (_, i) => <HomeSkeleton key={i} />)
    case 'hotel':
      return Array.from(Array(count), (_, i) => <HotelSkeleton key={i} />)
    case 'single-hotel':
      return Array.from(Array(count), (_, i) => <SingleHotelSkeleton key={i} />)
    case 'reserve':
      return Array.from(Array(count), (_, i) => (
        <ReserveModalSkeleton key={i} />
      ))
    default:
      break
  }
}

export default Skeleton
