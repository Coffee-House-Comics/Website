import React from 'react';
import {
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CommentCard from '../../../../Cards/CommentCard';
import AddCommentCard from '../../../../Cards/AddCommentCard';

export default function CommentsPanel() {

  const theme = useTheme();

  //TODO get comments
   const comments = [
    {author: {
      _id: 123,
      name: "Shangela"
    }, 
    beanCount: 8000,
    currentVote: 0,
    body: "Slay the house down, Seuss"},
    {author: {
      _id: 456,
      name: "Ben De La Creme"
    }, 
    beanCount: 457,
    currentVote: 0,
    body: "This is not a serve"},
    {author: {
      _id: 789,
      name: "Trixie"
    }, 
    beanCount: 332,
    currentVote: 1,
    body: "Seuss is trade"},
    {author: {
      _id: 123,
      name: "Shangela"
    }, 
    beanCount: 8000,
    currentVote: 0,
    body: "Slay the house down, Seuss"},
    {author: {
      _id: 456,
      name: "Ben De La Creme"
    }, 
    beanCount: 457,
    currentVote: 0,
    body: "This is not a serve"},
    {author: {
      _id: 789,
      name: "Trixie"
    }, 
    beanCount: 332,
    currentVote: 1,
    body: "Seuss is trade"},
    {author: {
      _id: 123,
      name: "Shangela"
    }, 
    beanCount: 8000,
    currentVote: 0,
    body: "Slay the house down, Seuss"},
    {author: {
      _id: 456,
      name: "Ben De La Creme"
    }, 
    beanCount: 457,
    currentVote: 0,
    body: "This is not a serve"},
    {author: {
      _id: 789,
      name: "Trixie"
    }, 
    beanCount: 332,
    currentVote: 1,
    body: "Seuss is trade"}
  ]

  const commentComponents = comments.map((comment, index) => {
    return(<Grid item key={index}>
      <CommentCard {...comment}></CommentCard>
    </Grid>)
  });

  return (
    <div style={{height: "100%", width: "100%"}}>
      <div style={{height: "calc(100% - 135px)", width: "100%", border: "2px solid " + theme.palette.olive_drab_7.main, borderRadius: "5px"}}>
        <div style={{overflowY: "scroll", overflowX: "hidden", height: "100%"}}>
          <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" spacing={0.5}>
            {commentComponents}
          </Grid>
        </div>
      </div>
      <AddCommentCard/>
    </div>
  )
}
