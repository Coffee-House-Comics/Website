import { Box, Typography, Grid } from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BeansButtonPanel from '../Buttons/BeansButtonPanel';
import { useState, useContext } from 'react';
import AuthorButton from '../Buttons/AuthorButton';
import { GlobalStoreContext } from '../../Store';
import API from '../../API';


/**
 * Card for forum posts
 * 
 * Expected props:
 *  
 */
export default function CommentCard(props) {

  const { store } = useContext(GlobalStoreContext);

  const id = props.id;
  const text = props.text
  const beans = props.beans
  const currentVote = props.myVote;
  const author = {
    _id: props.ownerId,
    name: props.user 
  }

  const postId = props.postId;

  const onVoteChange = async function (newVote) {
    console.log("On vote change:", newVote);
    console.log("Vote request for comment with id, vote, postid:", id, newVote, postId);

    if (store.app === "Comics") {
      await API.Comic.voteComment(id, newVote, postId);
    }else{
      await API.Story.voteComment(id, newVote, postId);
    }
  }

  const onClickAuthor = function () {
    console.log("Clicked on" + author.name)
  }

  return (<Box sx={{
    width: "95%",
    p: 1,
    mx: "auto",
    bgcolor: "ivory.main",
    color: "black",
    borderRadius: 4,
    mb: 2
  }}>

    <Grid container direction="row" justifyContent="space-between" alignItems="center">
      <Grid item xs sx={{ml:1}}>
        <Grid container direction="column">
          <Grid item>
            <Box>
              <AuthorButton author={author} onClick={onClickAuthor}></AuthorButton>
            </Box>
          </Grid>
          <Grid item>
            <Typography>
              {text}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs="auto">
        <BeansButtonPanel onVoteChange={onVoteChange} numBeans={beans} currentVote={currentVote}/>
      </Grid>
    </Grid>
  </Box>)
}
