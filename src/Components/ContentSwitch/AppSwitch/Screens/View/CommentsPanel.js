import React from 'react';
import {
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CommentCard from '../../../../Cards/CommentCard';
import AddCommentCard from '../../../../Cards/AddCommentCard';
import API from '../../../../../API';
import { GlobalStoreContext } from '../../../../../Store';
import types from '../../../../../Common/Types';

export default function CommentsPanel({postId, commentsProp}) {

  const theme = useTheme();

  const [comments, setComments] = React.useState(commentsProp);

  const {store} = React.useContext(GlobalStoreContext);

  const submitCommentHook = async function(commentText) {
    try {
      const id = postId;
      const res = store.app == "Comics"? await API.Comic.comment(id, commentText) : await API.Story.comment(id, commentText);

      if(res.status === 200) {
        console.log("Comment submitted", commentText);

        let res2 = store.app==='Comics'? await API.Comic.viewPublished(id) : await API.Story.viewPublished(id);
        if(res2.error) {
          store.reRoute(types.TabType.APP.children.VIEW.fullRoute, id);
        }

        setComments(res2.data.content.comments);
      }

      else {
        console.log("Failed to submit comment. Error:", res.error);
        store.createModal({
          title: "Error submitting comment",
          body: "Comment could not be submitted. Please try again.",
          action: ""
        });
      }
    }

    catch (err) {
      console.log(err);
    }
  }

  const commentComponents = comments.map((comment, index) => {
    return(<Grid item key={index}>
      <CommentCard {...comment} postId={postId}></CommentCard>
      <hr style={{color:"gray", marginInline: 10}}/>
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
      <AddCommentCard hook={submitCommentHook}/>
    </div>
  )
}
