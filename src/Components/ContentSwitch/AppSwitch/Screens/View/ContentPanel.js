import React from 'react'
import { useTheme } from '@mui/material/styles';
import {
  Typography,
  Grid,
  Box,
  IconButton
} from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';

export default function ContentPanel() {

  const theme = useTheme();
  const id = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const maxPages = 10; //TODO Get last page of comic

  //TODO Display comic based on page number

  function previousPage() {
    if(pageNumber > 1)
      setPageNumber(pageNumber - 1);
  }

  function nextPage() {
    if(pageNumber < maxPages)
      setPageNumber(pageNumber + 1);
  }

  return (
    <div style={{height: "95%", marginTop: "50px", marginLeft: "10px", marginRight: "10px"}}>
      <div style={{backgroundColor: "white", height: "calc(100% - 100px)", border: "3px solid " + theme.palette.olive_drab_7.main, borderRadius: "5px",}}>

      </div>
      <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{height: "100px"}}>
        <Grid item>
          <IconButton onClick={previousPage}>
            <ArrowBackIosIcon fontSize='large'/>
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h3">{pageNumber}</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={nextPage}>
            <ArrowForwardIosIcon fontSize='large'/>
          </IconButton>
        </Grid>
      </Grid>
    </div>
  )
}
