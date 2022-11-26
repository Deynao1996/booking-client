import { useQuery } from '@tanstack/react-query'
import { useHandleError } from '../../hooks/useHandleError'
import Skeleton from '../LoadingUI/Skeleton'

const ItemsList = ({
  renderItems,
  fetchData,
  type,
  skeletonCount,
  ...props
}) => {
  const { isLoading, isFetching, data, isError, error } = useQuery(
    [type, props],
    fetchData,
    {
      refetchOnWindowFocus: false
    }
  )
  useHandleError(isError, error)

  return (
    <>
      {isLoading || isFetching ? (
        <Skeleton type={type} count={skeletonCount} />
      ) : (
        renderItems(data)
      )}
    </>
  )
}

export default ItemsList
