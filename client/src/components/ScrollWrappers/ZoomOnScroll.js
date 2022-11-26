import { useScrollTrigger, Zoom } from '@mui/material'
import React from 'react'

const ZoomOnScroll = (props) => {
  const { children, window } = props

  const trigger = useScrollTrigger({
    target: window ? window() : undefined
  })

  return (
    <Zoom appear={false} in={!trigger}>
      {children}
    </Zoom>
  )
}

export default ZoomOnScroll
