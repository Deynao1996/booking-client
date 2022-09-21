import { Link } from 'react-router-dom'
import { getFloatRating, getOpinion } from '../components/hotelsList/HotelsList'

export function renderProperties(data, resetSearchParams) {
  return data.data?.map((property, i) => {
    const hotelCount = property.count === 1 ? 'hotel' : 'hotels'

    return (
      <li className="property__item" key={i}>
        <Link
          to={`/houses?type=${property.type}`}
          onClick={() => resetSearchParams()}
        >
          <div className="property__img">
            <img src={property.img} alt={property.type} />
          </div>
          <div className="property__title">{property.type}</div>
          <span>
            {property.count} {hotelCount}
          </span>
        </Link>
      </li>
    )
  })
}

export function renderCities(data, resetSearchParams) {
  return data.data?.map((city) => {
    return (
      <li className="city__item" key={city._id}>
        <div className="city__img">
          <img src={city.cityImg} alt="city" />
        </div>
        <Link
          to={`houses`}
          state={{ destination: city.city }}
          onClick={() => resetSearchParams({ destination: city.city })}
        >
          <div className="city__title">{city.city}</div>
          <span>{city.count} properties</span>
        </Link>
      </li>
    )
  })
}

export function renderHomes(data) {
  return data.data?.hotels.map((home) => {
    const floatRating = getFloatRating(home.rating)

    return (
      <li className="home__item" key={home._id}>
        <Link to={`houses/${home._id}`}>
          <span className="home__img">
            <img src={home.photos[0]} alt={home.name} />
          </span>
          <span className="home__title">{home.name}</span>
          <span className="home__location">{home.city}</span>
          <span className="home__price">
            Starting from ${home.cheapestPrice}
          </span>
          <span className="home__opinion">
            <div>{floatRating}</div>
            {getOpinion(home.rating)}
          </span>
        </Link>
      </li>
    )
  })
}
