import { Icon } from '@mui/material'
import React from 'react'

export default function EraserIcon(props) {
  return (
    <Icon {...props}>
      <img alt="erase" src="/Images/Icons/eraser.svg" width={(props.width) ? props.width : "100%"} height={(props.height) ? props.height : "100%"}/>
    </Icon>
  )
}
