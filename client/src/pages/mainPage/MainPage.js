import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import swal from 'sweetalert'
import { gsap } from 'gsap'
import {
  renderProperties,
  renderCities,
  renderHomes
} from '../../utils/render-items-utils'
import ItemsList from '../../components/itemsList/ItemsList'
import SearchPanel from '../../components/searchPanel/SearchPanel'
import {
  fetchRandomCities,
  fetchHouses,
  fetchProperties
} from '../../utils/service-utils'
import { modalOptions } from '../../data/modalOptions'

import './_mainPage.scss'

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const searchParam = searchParams.get('success')
  const sectionRef = useRef()
  const {
    paymentModalInfo: { confirmPayment, rejectPayment }
  } = modalOptions

  function resetSearchParams() {
    searchParams.delete('success')
    setSearchParams(searchParams)
  }

  function configPaymentStatusModal(search) {
    switch (search) {
      case 'true':
        return showModal(confirmPayment, search)
      case 'false':
        return showModal(rejectPayment, search)
      default:
        return resetSearchParams()
    }
  }

  function showModal(params, searchStatus) {
    swal(...params)
      .then((willComplete) => {
        if (willComplete && searchStatus === 'false') navigate(-1)
      })
      .finally(resetSearchParams)
  }

  function animateIt() {
    let gradient = {
        value:
          'linear-gradient(180deg, rgba(0, 113, 194,1) 0%, rgba(158, 163, 203,1) 100%)'
      },
      target = sectionRef.current
    return gsap.to(gradient, {
      value:
        'linear-gradient(180deg, rgba(0, 113, 194,1) 0%, rgba(247, 247, 247,1) 100%)',
      duration: 10,
      repeat: 3,
      yoyo: true,
      onUpdate: () => (target.style.backgroundImage = gradient.value)
    })
  }

  useEffect(() => {
    searchParam && configPaymentStatusModal(searchParam)
  }, [searchParam])

  useEffect(() => {
    const animation = animateIt()
    return () => animation.kill()
  }, [])

  return (
    <>
      <section className="promo" ref={sectionRef}>
        <div className="container">
          <h1 className="title promo__title">
            A lifetime of discounts? It's Genius.
          </h1>
          <div className="promo__descr">
            Get rewarded for your travels - unlock instant savings of 10% or
            more with a free Booking account
          </div>
          <Link to="auth/register" className="button button_blue button_medium">
            Sign up
            {/* <button className="btn btn_blue">Sign up</button> */}
          </Link>
          <SearchPanel />
        </div>
      </section>
      <div className="container">
        <ItemsList
          renderItems={renderCities}
          type="city"
          skeletonCount={3}
          fetchData={fetchRandomCities}
          limit={3}
        />
        <h2 className="subtitle">Browse by property type</h2>
        <ItemsList
          renderItems={renderProperties}
          type="property"
          skeletonCount={5}
          fetchData={fetchProperties}
        />
        <h3 className="subtitle">Homes guests love</h3>
        <ItemsList
          renderItems={renderHomes}
          type="home"
          skeletonCount={4}
          fetchData={fetchHouses}
          featured={true}
          limit={4}
        />
      </div>
    </>
  )
}

export default MainPage
