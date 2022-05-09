import { Accordion, AccordionSummary, Typography, AccordionDetails, Box, Grid } from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BeansButtonPanel from '../Buttons/BeansButtonPanel';
import { useState } from 'react';
import AuthorButton from '../Buttons/AuthorButton';
import CommentCard from './CommentCard';
import AddCommentCard from './AddCommentCard';
import { Theme } from '../../Common/Theme';


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
 *  heading: String,
 *  body: String,
 *  currentVote: Number,
 * 
 *  comments: [
 *   {
 *      author: {
 *          _id: IdObject
 *          name: String,
 *      },
 * 
 *      beanCount: Number,
 *      comment: String
 *   }
 *  ]
 *  
 */
export default function ForumPost(props) {

  const [enabled, setEnabled] = useState(false);

  console.log("Forum post props:", props);
  const heading = props.heading
  const body = props.body
  const beanCount = props.beanCount
  const currentVote = props.currentVote
  const author = props.author
  const comments = props.comments


  const onVoteChange = function (newCurrent) {
    console.log("On vote change (forum post):", newCurrent);
  }

  const toggleEnable = function () {
    setEnabled(!enabled);
  }

  const onClickAuthor = function () {
    console.log("Clicked on" + author.name)
  }

  const commentsCards = comments.map((comment, index) =>
    //<ForumPost key={index} heading={post.heading} currentVote={post.currentVote} beanCount={post.beanCount} body={post.body} author={post.author} comments={post.comment}>
    //</ForumPost>
    <CommentCard key={index} user={comment.user} _id={comment._id} beans={comment.beans} currentVote={comment.myVote} text={comment.text}></CommentCard>
  );

  return (
    <div style={{ marginTop: 20 }}>
      <Accordion expanded={enabled} disableGutters={true} onChange={toggleEnable} sx={{
        width: "100%",
        float: "right",
        bgcolor: "coffee.main",
        color: "ivory.main",
        borderRadius: 4
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel"
          id="panel-header"
        >
          <Grid container direction="row" width="100%" justifyContent="center" alignItems="center">
            <Grid item xs="auto">
              <Grid container direction="column" width="100%">
                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>{heading}</Typography>
                <AuthorButton author={author} onClick={onClickAuthor}></AuthorButton>
              </Grid>
            </Grid>
            <Grid item xs />
            <Grid item xs="auto">
              <div style={{ backgroundColor: Theme.palette.ivory.main, padding: 5, borderRadius: "10px", marginRight: "20px", opacity: "90%", color: Theme.palette.text.main }}>
                <BeansButtonPanel onVoteChange={onVoteChange} numBeans={beanCount} currentVote={currentVote} />
              </div>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography sx={{ mt: 2, mb: 3 }}>{body}</Typography>

            <hr style={{ marginBottom: 30 }} />

            {commentsCards.length > 0 ? <Typography variant="h5" sx={{ mt: 1 }}>Comments:</Typography> : ""}

            <Box sx={{
              overflowY: "auto",
              maxHeight: "350px",
              marginBottom: "30px"
            }}>
              {commentsCards}
            </Box>

            <AddCommentCard></AddCommentCard>

          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
