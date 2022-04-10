import { Icon } from '@mui/material'
import React from 'react'

export default function BeansIcon(props) {
  return (
    <Icon {...props}>
      <img alt="beans" src="/Images/Icons/beans.svg" width={(props.width) ? props.width : "100%"} height={(props.height) ? props.height : "100%"}/>
    </Icon>
  )
}
