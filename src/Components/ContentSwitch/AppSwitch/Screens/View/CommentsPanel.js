import React from 'react';
import {
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function CommentsPanel() {
  return (
    <div style={{ overflow: "scroll", width: "100%", height: "100%", display: "flex", justifyContent: "center"}}>
       <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={0.5} width="100%">
        <Grid item>
          Whats the tea, hunty?
        </Grid>
        <Grid item>
          Yass Girly Pop!!
        </Grid>
        <Grid item>
          Slay the house down boots
        </Grid>
        <Grid item>
          Girl, you better work!s
        </Grid>
       </Grid>
    </div>
  )
}
