import { useState } from 'react'
import AsideSearchPanel from '../../components/asideSearchPanel/AsideSearchPanel'
import HotelsList from '../../components/hotelsList/HotelsList'

import './_hotelsPage.scss'

const HotelsPage = () => {
  const [searchParams, setSearchParams] = useState(null)

  return (
    <section className="hotels-content">
      <div className="container">
        <div className="hotels-content__wrapper">
          <AsideSearchPanel setSearchParams={setSearchParams} />
          <HotelsList searchParams={searchParams} />
        </div>
      </div>
    </section>
  )
}

export default HotelsPage
