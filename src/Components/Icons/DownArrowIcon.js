import { Icon } from '@mui/material'
import React from 'react'

export default function DownArrowIcon(props) {
  return (
    <Icon {...props}>
      <img alt="down" src="/Images/Icons/down-arrow.svg" width={(props.width) ? props.width : "100%"} height={(props.height) ? props.height : "100%"}/>
    </Icon>
  )
}
