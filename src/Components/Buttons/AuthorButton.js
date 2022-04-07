import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Avatar, Grid, Typography } from '@mui/material'
import React from 'react'

/**
 * Button which displays the author's profile image and name
 * 
 * Expected props:
 *  author: {name: String}
 *  onClick: function
 */
export default function AuthorButton(props) {
  const author = props.author
  const onClick = props.onClick

  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item>
          <Avatar alt={author.name} sx={{ width: 12, height: 12 }}>
            {/* TODO: Change this to src prop and make actual image */}
            {author.name[0]}
          </Avatar>
        </Grid>
        <Grid item sx={{marginInlineStart: 1}}>
          <Typography color="text" variant="button">
            {author.name}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
