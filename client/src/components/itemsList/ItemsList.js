import { useQuery } from '@tanstack/react-query'
import { useSearchDataProvider } from '../../contexts/SearchDataContext'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'

import './_cityList.scss'
import './_homeList.scss'
import './_propertyList.scss'

const ItemsList = ({
  renderItems,
  fetchData,
  type,
  skeletonCount,
  ...props
}) => {
  const { resetSearchParams } = useSearchDataProvider()
  const { isLoading, isFetching, data } = useQuery([type, props], fetchData, {
    refetchOnWindowFocus: false
  })
  const classNameList = type + '__items'

  if (data?.name === 'AxiosError') return <ErrorMessage />
  return (
    <ul className={classNameList}>
      {isLoading || isFetching ? (
        <Skeleton type={type} count={skeletonCount} />
      ) : (
        renderItems(data, resetSearchParams)
      )}
    </ul>
  )
}

export default ItemsList
