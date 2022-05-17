import { Box, Typography, Grid } from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BeansButtonPanel from '../Buttons/BeansButtonPanel';
import { useState, useContext } from 'react';
import AuthorButton from '../Buttons/AuthorButton';
import { GlobalStoreContext } from '../../Store';
import API from '../../API';
import types from '../../Common/Types';


/**
 * Card for forum posts
 * 
 * Expected props:
 *  
 */
export default function CommentCard(props) {

  const { store } = useContext(GlobalStoreContext);

  console.log("Comment card props", props);

  const id = props.id;
  const text = props.text
  const beans = props.beans
  const currentVote = props.myVote;
  const author = {
    _id: props.ownerId,
    name: props.user,
    profileImage: props.profileImage 
  }

  const postId = props.postId;
  const commentType = props.commentType;
  const postOwnerId = props.postOwnerId;

  const onVoteChange = commentType === "post"? 
    async function (newVote) {
      console.log("On vote change:", newVote);
      console.log("Vote request for comment with id, vote, postid:", id, newVote, postId);

      if (store.app === "Comics") {
        await API.Comic.voteComment(id, newVote, postId);
      }else{
        await API.Story.voteComment(id, newVote, postId);
      }
      store.updateLocalUser();
    } :
    async function (newVote) {
      console.log("On vote change:", newVote);
      console.log("Vote request for comment with id, vote, postid, forumOwnerId:", id, newVote, postId, postOwnerId);

      if (store.app === "Comics") {
        await API.Comic.voteCommentOnForumPost(id, newVote, postId, postOwnerId);
      }else{
        await API.Story.voteCommentOnForumPost(id, newVote, postId, postOwnerId);
      }
      store.updateLocalUser();
    }

  const onClickAuthor = function () {
    store.reRoute(types.TabType.APP.children.PROFILE.fullRoute, author._id);
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
