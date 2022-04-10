import React from 'react'
import { useState, useContext } from 'react'
import {
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BeansIcon from '../../../../Icons/BeansIcon';

export default function MetadataPanel(props) {
  const id = props.id;
  const theme = useTheme();
  
  //TODO get proper values
  let userBeanCount = 25;
  let contentBeanCount = 8;
  let description = "I do not like Greens Eggs & Ham. I do not like them, Sam I Am";

  return ( 
  <div style={{ overflow: "hidden", width: "100%", height: "100%"}}>
    <Grid container direction="column" justifyContent="space-around" alignItems="center" spacing={1} width="250px" marginBottom="10px">
        <Grid item>
            <Typography variant="h6" sx={{fontWeight: 'bold', marginTop: '10px'}}> Green Eggs & Ham </Typography>
        </Grid>
        <Grid item>
            <Typography sx={{fontWeight: "bold"}}>By: @dseuss</Typography>
            <Typography>
              <BeansIcon/>
              {userBeanCount}
            </Typography>
        </Grid>
        <Grid item>
            <Typography sx={{marginTop: '10px', paddingLeft: 1, paddingRight: 1}}>{description}</Typography>
        </Grid>
        <Grid item sx={{width: "100%", paddingLeft: 1, paddingRight: 1}}>
            Beanies
        </Grid>
    </Grid>
  </div>
  )
}
