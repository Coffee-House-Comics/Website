import { Accordion, AccordionSummary, Typography, AccordionDetails, Box} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BeansButtonPanel from '../Buttons/BeansButtonPanel';
import { useState } from 'react';
import AuthorButton from '../Buttons/AuthorButton';
import CommentCard from './CommentCard';
import AddCommentCard from './AddCommentCard';


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

    const heading = props.heading
    const body = props.body
    const beanCount = props.beanCount
    const currentVote = props.currentVote
    const author = props.author
    const comments = props.comments


    const onUpvote = function () {
        console.log("Up Vote");
    }

    const onDownvote = function () {
        console.log("Down Vote");
    }

    const toggleEnable = function() {
        setEnabled(!enabled);
    }

    const onClickAuthor = function(){
        console.log("Clicked on" + author.name)
    }

    const commentsCards = comments.map((comment, index) => 
    //<ForumPost key={index} heading={post.heading} currentVote={post.currentVote} beanCount={post.beanCount} body={post.body} author={post.author} comments={post.comment}>
    //</ForumPost>
    <CommentCard key={index} author={comment.author} beanCount={comment.beanCount} currentVote={comment.currentVote} body={comment.body}></CommentCard>
    );

  return (<Accordion expanded={enabled} sx={{
    width: "100%",
    float: "right",
    bgcolor: "coffee.main",
    overflow: "scroll",
    color: "ivory.main",
    m: 1,
    borderRadius: 4
  }}>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon onClick={toggleEnable}/>}
    aria-controls="panel"
    id="panel-header"
  >

    <Typography sx={{ width: '85%', flexShrink: 0}}>
        <h2>{heading}</h2>
        <AuthorButton author={author} onClick={onClickAuthor}></AuthorButton>
    </Typography>
    <BeansButtonPanel onUpvote={onUpvote} onDownvote={onDownvote} numBeans={beanCount} currentVote={currentVote}>

    </BeansButtonPanel>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
      {body}
        <h3>Comments:</h3>
          {commentsCards.length == 0 ? <Typography sx={{
            color:"fuzzy_wuzzy.main"
        }}>There are no comments</Typography> : <div></div>}
        <Box sx={{
          overflow: "scroll"
        }}>
          {commentsCards}
          <AddCommentCard></AddCommentCard>
        </Box>
    </Typography>
  </AccordionDetails>
</Accordion>);
}
