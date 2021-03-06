import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Avatar, Grid, Typography, Box } from '@mui/material'
import React from 'react'

/**
 * Button which displays the author's profile image and name
 * 
 * Expected props:
 *  author: {name: String, profileImage: String (URL)}
 *  onClick: function
 */
export default function AuthorButton(props) {
  const author = props.author
  const onClick = props.onClick

  return (
    <Box onClick={onClick} style={{ cursor: "pointer", minWidth:"70px"}}>
      <Grid container direction="row" justifyContent="left" alignItems="center">
        <Grid item>
          <Avatar alt={author.name} sx={{ width: 12, height: 12 }} src={author.profileImage}>
            {author.name[0]}
          </Avatar>
        </Grid>
        <Grid item sx={{marginInlineStart: 1}}>
          <Typography color="text" variant="button">
            {author.name}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
