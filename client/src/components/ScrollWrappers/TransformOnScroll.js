import { useScrollTrigger } from '@mui/material'
import React from 'react'

const ScrollHandler = (props) => {
  const trigger = useScrollTrigger({
    threshold: 100
  })

  return React.cloneElement(props.children, {
    style: {
      top: trigger ? '16px' : '70px',
      transition: '0.3s all'
    }
  })
}

const TransformOnScroll = (props) => {
  return <ScrollHandler {...props}>{props.children}</ScrollHandler>
}

export default TransformOnScroll
