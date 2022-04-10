import { Box, Typography, Grid } from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BeansButtonPanel from '../Buttons/BeansButtonPanel';
import { useState } from 'react';
import AuthorButton from '../Buttons/AuthorButton';


/**
 * Card for forum posts
 * 
 * Expected props:
 *  author: {
 *      _id: IdObject
 *      name: String,
 *  },
 * 
 *  beanCount: Number,
 *  currentVote: Number,
 *  body: String
 */
export default function CommentCard(props) {

    const body = props.body
    const beanCount = props.beanCount
    const currentVote = props.currentVote
    const author = props.author

    const onUpvote = function () {
      console.log("Up Vote");
  }

  const onDownvote = function () {
      console.log("Down Vote");
  }

  const onClickAuthor = function(){
      console.log("Clicked on" + author.name)
  }

  return (<Box sx={{
    width:"80%",
    p: 1,
    mx: "auto",
    bgcolor: "ivory.main",
    color: "black",
    borderRadius: 4,
    mb: 2
  }}>




      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item sx={{ml:1}}>
          <Box>
              <AuthorButton author={author} onClick={onClickAuthor}></AuthorButton>
          </Box>
        </Grid>
        <Grid item sx={{mr:2}}>
          <BeansButtonPanel onUpvote={onUpvote} onDownvote={onDownvote} numBeans={beanCount} currentVote={currentVote}></BeansButtonPanel>
        </Grid>
      </Grid>
      <Typography sx={{ml:3}}>
            {body}
      </Typography>
    </Box>)
}
