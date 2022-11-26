import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  useMediaQuery
} from '@mui/material'
import { forwardRef } from 'react'
import { useThemeProvider } from '../../contexts/ThemeContext'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ConfirmDialog = ({
  isConfirmDialogOpen,
  onCancel,
  text,
  title,
  renderActions
}) => {
  const { theme } = useThemeProvider()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      open={isConfirmDialogOpen}
      TransitionComponent={Transition}
      keepMounted
      fullScreen={isMobile}
      onClose={onCancel}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {text}
        </DialogContentText>
      </DialogContent>
      {renderActions()}
    </Dialog>
  )
}

export default ConfirmDialog
