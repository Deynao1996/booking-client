import styled from '@emotion/styled'
import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  RadioGroup,
  Radio,
  Tooltip,
  Typography
} from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthProvider } from '../contexts/AuthContext'
import { useSearchProvider } from '../contexts/SearchContext'
import { getDatesInRange } from '../utils/dates-utils'
import { io } from 'socket.io-client'
import {
  changeUnavailableDates,
  createNotifications,
  createOrder,
  sendPayment
} from '../utils/service-utils'
import { useMutation } from '@tanstack/react-query'
import { useHandleError } from '../hooks/useHandleError'
import { useSnackbar } from 'notistack'
import ConfirmDialog from './ModalUI/ConfirmDialog'
import { reservationMsgs } from '../data/messages-data'
import { checkPlural } from './SingleHotel/HotelInfo'

const initialState = {
  reservePrice: 0,
  reservePeople: 0,
  reserveRooms: ''
}

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.7rem',
    fontWeight: 'bold'
  }
}))

const Reservation = ({
  isReserveOpen,
  handleCloseDialog,
  data,
  days,
  setIsCheckoutLoading,
  ...hotelInfo
}) => {
  const { currentUser } = useAuthProvider()
  const navigate = useNavigate()
  const { searchParams, resetSearchParams } = useSearchProvider()
  const { enqueueSnackbar } = useSnackbar()

  const { mutate, isError, error } = useMutation(changeUnavailableDates)
  const [reserveState, setReserveState] = useState(initialState)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const descriptionElementRef = useRef(null)
  const orderRef = useRef(null)
  const socketRef = useRef()

  const messages = reservationMsgs
  const totalPeopleCount = searchParams.adult + searchParams.children
  const isDisabled = reserveState.reservePeople < totalPeopleCount
  const selectedRangeList = useMemo(
    () => getDatesInRange(searchParams.arrivalDate, searchParams.departureDate),
    []
  )

  useHandleError(isError, error)

  const handleChange = (e, maxPeople, currentPrice) => {
    const value = e.target.value
    setReserveState({
      reservePrice: currentPrice,
      reservePeople: maxPeople,
      reserveRooms: value
    })
  }

  function handleClose() {
    setReserveState(initialState)
    handleCloseDialog()
  }

  function isAvailable(unavailableDates) {
    const isExist = unavailableDates.some((date) =>
      selectedRangeList.includes(new Date(date).getTime())
    )
    return isExist
  }

  function buildOrder() {
    const { hotelName, hotelId, hotelImage } = hotelInfo
    const { reservePrice: price, reserveRooms } = reserveState
    const totalNights = checkPlural(days, 'night')
    const fullName =
      currentUser.lastName === 'Not provide' &&
      currentUser.name === 'Not provide'
        ? currentUser.userName
        : `${currentUser.lastName} ${currentUser.name}`

    return {
      hotelName,
      price,
      hotelId,
      hotelImage,
      reserveRooms: [reserveRooms],
      userName: fullName,
      userId: currentUser._id,
      descr: `1 room for ${totalPeopleCount} people to stay for ${totalNights}`,
      dates: selectedRangeList
    }
  }

  async function startPayment(order) {
    console.log(order)
    setIsCheckoutLoading(true)
    const { hotelImage: image } = hotelInfo

    try {
      const res = await sendPayment({ ...order, image })
      console.log(res)
      if (res.data.url) {
        window.location.href = res.data.url
      }
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' })
    } finally {
      setIsCheckoutLoading(false)
    }
  }

  function showConfirmModal() {
    setIsSubmitLoading(false)
    setIsConfirmDialogOpen(true)
  }

  function handleConfirmSuccess() {
    setIsConfirmDialogOpen(false)
    startPayment(orderRef.current)
  }

  function handleConfirmCancel() {
    setIsConfirmDialogOpen(false)
    resetSearchParams()
    navigate('/')
    enqueueSnackbar(messages.success, { variant: 'success' })
  }

  function onSuccess(order) {
    handleClose()
    orderRef.current = order
    showConfirmModal()
  }

  async function sendNotification(currentUser, res) {
    const data = {
      userId: currentUser._id,
      type: 'new-order',
      metaId: res.data.data._id
    }
    socketRef.current?.emit('send-notification', data)
    await createNotifications(data)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const order = buildOrder()
    setIsSubmitLoading(true)

    try {
      const res = await createOrder(order)
      if (res?.name === 'AxiosError') return
      await sendNotification(currentUser, res)

      mutate(
        { roomId: reserveState.reserveRooms, dates: selectedRangeList },
        {
          onSuccess: () => onSuccess(res.data.data)
        }
      )
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' })
    } finally {
      setIsSubmitLoading(false)
    }
  }

  function renderRooms() {
    if (!data) return
    return data.map(({ _id, title, descr, price, roomNumbers, maxPeople }) => {
      const currentPrice = days * price * searchParams.room

      return (
        <Grid container item alignItems="center" key={_id}>
          <Grid xs={7} item>
            <Typography variant="h6" textTransform="capitalize">
              {title}
            </Typography>
            <p>{descr}</p>
            <Typography variant="caption">
              Max people: <b>{`${maxPeople}`}</b>
            </Typography>
            <p>
              <b>{`${currentPrice} $`}</b>
            </p>
          </Grid>
          <Grid xs={5} item>
            <FormControl>
              <RadioGroup
                row
                value={reserveState.reserveRooms}
                onChange={(e) => handleChange(e, maxPeople, currentPrice)}
              >
                {renderSelects(roomNumbers)}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      )
    })
  }

  function renderSelects(rooms) {
    return rooms.map(({ number, unavailableDates, _id }) => {
      const isDisabled = isAvailable(unavailableDates)

      return (
        <StyledFormControlLabel
          key={_id}
          value={_id}
          disabled={isDisabled}
          control={<Radio size="small" />}
          label={number}
          labelPlacement="top"
          componentsProps={{ sx: { fontSize: '1rem' } }}
          title={
            isDisabled ? 'This room is unavailable on the selected dates ' : ''
          }
        />
      )
    })
  }

  useEffect(() => {
    if (isReserveOpen) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [isReserveOpen])

  useEffect(() => {
    if (process.env.REACT_APP_WITH_SOCKETIO === 'true') {
      socketRef.current = io('http://localhost:5000')
      return () => {
        socketRef.current?.disconnect()
      }
    }
  }, [])

  return (
    <>
      <ConfirmDialog
        onConfirm={handleConfirmSuccess}
        onCancel={handleConfirmCancel}
        isConfirmDialogOpen={isConfirmDialogOpen}
        title={'Would you like to pay cash or by credit card?'}
        renderActions={() => (
          <DialogActions>
            <Button onClick={handleConfirmCancel}>Cash</Button>
            <Button onClick={handleConfirmSuccess}>Credit card</Button>
          </DialogActions>
        )}
        text={
          'We are able to provide you online method for payment or cash before settling!'
        }
      />
      <Box width="100%" height="100%" component="form" onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <p>Select your rooms:</p>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container ref={descriptionElementRef} spacing={1}>
            {renderRooms()}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Tooltip
            arrow
            disableHoverListener
            enterTouchDelay={0}
            title={
              isDisabled
                ? `Too much people to settle. Please choose another variant. ${
                    totalPeopleCount - reserveState.reservePeople
                  } left people`
                : ''
            }
          >
            <Box width={'100%'}>
              <Button
                autoFocus
                variant="contained"
                type="submit"
                fullWidth
                disabled={isDisabled || isSubmitLoading}
              >
                Reserve Now
              </Button>
            </Box>
          </Tooltip>
        </DialogActions>
      </Box>
    </>
  )
}

export default Reservation
