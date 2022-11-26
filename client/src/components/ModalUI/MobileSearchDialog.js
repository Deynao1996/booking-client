import { Dialog, Slide } from '@mui/material'
import { forwardRef } from 'react'
import AsideSearchPanel from '../AsideSearchPanel'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const MobileSearchDialog = ({ isDialogOpen, toggleDialog }) => {
  function handleSearch() {
    toggleDialog()
    window.scrollTo(0, 0)
  }

  return (
    <Dialog
      open={isDialogOpen}
      keepMounted
      fullScreen
      TransitionComponent={Transition}
    >
      <AsideSearchPanel cb={handleSearch} />
    </Dialog>
  )
}

export default MobileSearchDialog
