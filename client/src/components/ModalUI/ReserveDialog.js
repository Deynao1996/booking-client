import { Dialog, Slide, useMediaQuery } from '@mui/material'
import { useQueries } from '@tanstack/react-query'
import { forwardRef } from 'react'
import { useThemeProvider } from '../../contexts/ThemeContext'
import { fetchRoom } from '../../utils/service-utils'
import CustomSkeleton from '../LoadingUI/Skeleton'
import Reservation from '../Reservation'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const ReserveDialog = ({
  roomIds,
  isReserveOpen,
  handleCloseDialog,
  ...props
}) => {
  const results = useQueries({
    queries: roomIds.map((id) => ({
      queryKey: ['room', id],
      queryFn: () => fetchRoom(id),
      refetchOnWindowFocus: false,
      enabled: !!isReserveOpen
    }))
  })
  const isLoading = results.some((result) => result.isLoading)
  const data = !isLoading ? results?.map((item) => item.data?.data) : null
  const { theme } = useThemeProvider()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      open={isReserveOpen}
      keepMounted
      scroll="paper"
      onClose={handleCloseDialog}
      fullScreen={isMobile}
      TransitionComponent={Transition}
    >
      {isLoading ? (
        <CustomSkeleton type="reserve" />
      ) : (
        <Reservation
          isReserveOpen={isReserveOpen}
          handleCloseDialog={handleCloseDialog}
          data={data}
          {...props}
        />
      )}
    </Dialog>
  )
}

export default ReserveDialog
