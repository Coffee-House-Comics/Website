import { Icon } from '@mui/material'
import React from 'react'

export default function CHCIcon(props) {
  return (
    <Icon {...props}>
      <img alt="Coffee House Comics" src="/Images/chc-round.png" width={(props.width) ? props.width : "100%"} height={(props.height) ? props.height : "100%"}/>
    </Icon>
  )
}
