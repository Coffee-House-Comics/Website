import React from 'react'
import { useState, useContext } from 'react'
import {
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BeansButtonPanel from '../../../../Buttons/BeansButtonPanel';
import UpArrowIcon from '../../../../Icons/UpArrowIcon';
import DownArrowIcon from '../../../../Icons/DownArrowIcon';
import BeansIcon from '../../../../Icons/BeansIcon';

export default function MetadataPanel(props) {
  const id = props.id;
  const theme = useTheme();
  
  //TODO get proper values
  let userBeanCount = 25;
  let contentBeanCount = 8;
  let description = "I do not like Greens Eggs & Ham. I do not like them, Sam I Am";

  //TODO change values
  let currentVote = 0;
  let numBeans = 8;

  function handleUpvote() {
    console.log("upvote");
  }

  function handleDownvote() {
    console.log("downvote");
  }

  return ( 
  <div style={{ overflow: "hidden", width: "100%", height: "100%", display: "flex", justifyContent: "center"}}>
    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={2} width="250px" marginBottom="10px">
        <Grid item sx={{ paddingLeft: 1, paddingRight: 1}}>
            <Typography variant="h6" sx={{fontWeight: 'bold', marginTop: '10px'}}> Green Eggs & Ham </Typography>
        </Grid>
        <Grid item>
            <Typography variant="body2" sx={{fontWeight: "bold"}}>By: @dseuss</Typography>
            <Typography variant="body2" sx={{display: "flex", justifyContent: "center"}}>
              <BeansIcon/>
              {userBeanCount}
            </Typography>
        </Grid>
        <Grid item>
            <Typography sx={{marginTop: '10px'}}>{description}</Typography>
        </Grid>
        <Grid item container direction="row" justifyContent="center" alignItems="flexStart" spacing={1}>
            <Grid item>
              <BeansButtonPanel onUpvote={handleUpvote} onDownvote={handleDownvote} numBeans={numBeans} currentVote={currentVote}/>
            </Grid>
        </Grid>
    </Grid>
  </div>
  )
}
