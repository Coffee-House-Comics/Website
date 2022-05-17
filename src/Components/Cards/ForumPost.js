import { Accordion, AccordionSummary, Typography, AccordionDetails, Box, Grid } from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BeansButtonPanel from '../Buttons/BeansButtonPanel';
import { useState, useContext } from 'react';
import AuthorButton from '../Buttons/AuthorButton';
import CommentCard from './CommentCard';
import AddCommentCard from './AddCommentCard';
import { Theme } from '../../Common/Theme';
import { GlobalStoreContext } from '../../Store';
import API from '../../API';
import types from '../../Common/Types';


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
  const [comments, setComments] = useState(props.comments);

  const { store } = useContext(GlobalStoreContext);

  console.log("Forum post props:", props);
  const heading = props.title
  const body = props.body
  const beanCount = props.beans
  const currentVote = props.currentVote
  const author = props.author
  const ownerId = props.ownerId
  const id = props.id
  const profileId = props.profileId


  const onVoteChange = async function (newVote) {
    console.log("On vote change (forum post):", newVote);
    console.log("Vote request for forum with id, vote, ownerId:", id, newVote, ownerId);

    if (store.app === "Comics") {
      await API.Comic.voteOnForumPost(id, newVote, profileId);
      store.updateLocalUser();
    }else{
      await API.Story.voteOnForumPost(id, newVote, profileId);
      store.updateLocalUser();
    }
  }

  const toggleEnable = function () {
    setEnabled(!enabled);
  }

  const onClickAuthor = function () {
    store.reRoute(types.TabType.APP.children.PROFILE.fullRoute, author._id);
  }

  const submitForumComment = async function (commentText) {
    console.log("Submitting comment:", commentText, "id, text, ownerId:", id, commentText, profileId);

    try {
      const res = store.app == "Comics"? await API.Comic.commentOnForumPost(id, commentText, profileId) 
        : await API.Story.commentOnForumPost(id, commentText, profileId);

      if(res.status === 200) {
        console.log("Comment submitted", commentText);

        let res2 = await store.fetchForumPosts(profileId);
        if(res2.error) {
          store.reRoute(types.TabType.APP.children.PROFILE.fullRoute, profileId);
        }

        const thisPost = res2.forumPosts.filter(forumPost => forumPost.id === id);
        setComments(thisPost[0].comments);
      }

      else {
        console.log("Failed to submit forum comment. Error:", res.error);
        store.createModal({
          title: "Error submitting comment",
          body: "Comment could not be submitted. Please try again.",
          action: ""
        });
      }
    }

    catch (err) {

    }
  }

  const commentsCards = comments.map((comment, index) =>
    //<ForumPost key={index} heading={post.heading} currentVote={post.currentVote} beanCount={post.beanCount} body={post.body} author={post.author} comments={post.comment}>
    //</ForumPost>
    <CommentCard key={index} user={comment.user} id={comment.id} profileImage={comment.userProfileImage} ownerId={comment.ownerId} beans={comment.beans} myVote={comment.myVote} text={comment.text} commentType={"forum"} postId={id} postOwnerId={profileId}></CommentCard>
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

            <AddCommentCard hook={submitForumComment}></AddCommentCard>

          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
