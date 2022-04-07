import { Icon } from '@mui/material'
import React from 'react'

export default function UpArrowIcon(props) {
    console.log(props)
  return (
    <Icon {...props}>
      <img alt="up" src="Images/Icons/up-arrow.svg"/>
    </Icon>
  )
}
