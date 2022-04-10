import { TextField, Box, Typography, Grid } from '@mui/material';
import React from 'react';
import SubmitButton from '../Buttons/SubmitButton';


export default function CommentCard() {

  const addComment = function () {
    console.log("Add Comment");
  }

  return (
    <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" width="100%">
      <Grid item xs="auto">
        <Typography variant="h5" sx={{ mt: 1 }}>Add Comments:</Typography>
      </Grid>
      <Grid item xs>
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Grid item xs>
            <TextField multiline={true} sx={{
              bgcolor: "ivory.main",
              borderRadius: 1,
              opacity: .75,
              width: "100%",
              mr: 1
            }} />
          </Grid>
          <Grid item xs="auto">
            <SubmitButton text="Submit" onClick={addComment} sx={{}}></SubmitButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
