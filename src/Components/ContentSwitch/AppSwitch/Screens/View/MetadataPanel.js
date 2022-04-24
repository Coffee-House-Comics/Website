import React from 'react'
import { useContext } from 'react'
import {
  Typography,
  Grid,
  Box,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import BeansButtonPanel from '../../../../Buttons/BeansButtonPanel';
import BeansIcon from '../../../../Icons/BeansIcon';
import { GlobalStoreContext } from '../../../../../Store';
import types from '../../../../../Common/Types'
import API from '../../../../../API'


export default function MetadataPanel(props) {
  const { postId, title, description, contentBeanCount, author, authorId } = props;
  const theme = useTheme();
  const { store } = useContext(GlobalStoreContext);

  //TODO get proper values
  let userBeanCount = 25;

  //TODO change values
  let currentVote = 0;
  let numBeans = 8;

  const handleDeleteButtonClick = function () {
    console.log("Delete button clicked");
    store.createModal({
      title: "Are you sure that you want to delete this post?",
      body: "This action is irreversible.",
      action: "Delete"
    }, function () {
      async function deletePost(id) {
        console.log("Deleting post with id: ", IDBIndex)
        if (store.app === "Comics" && await API.Comic.delete(id).status === 200) {
          alert("Post successfully deleted");
          store.reRoute(types.TabType.APP.children.PROFILE.fullRoute, store.user.id)
        } else if (await API.Story.delete(id).status === 200) {
          alert("Post successfully deleted");
          store.reRoute(types.TabType.APP.children.PROFILE.fullRoute, store.user.id)
        }
      }
      deletePost(postId)
    });
  }

  console.log("Logged in: ", store.isLoggedIn)
  console.log("User ID: ", store.user.id)
  console.log("Author ID: ", authorId)

  const deleteButton = (store.isLoggedIn && store.user && store.user.id == authorId) ?
    <Grid item>
      <Button variant="text" color="red" startIcon={<DeleteIcon />} onClick={handleDeleteButtonClick}>
        Delete
      </Button>
    </Grid> : <div/>;

  function handleUpvote() {
    console.log("upvote");
  }

  function handleDownvote() {
    console.log("downvote");
  }

  return (
    <div style={{ overflow: "hidden", width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
      <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={2} width="250px" marginBottom="10px">
        <Grid item sx={{ paddingLeft: 1, paddingRight: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '10px' }}>{title}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>{"By: @" + author}</Typography>
          <Typography variant="body2" sx={{ display: "flex", justifyContent: "center" }}>
            <BeansIcon />
            {userBeanCount}
          </Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ marginTop: '10px' }}>{description}</Typography>
        </Grid>
        <Grid item>
          <BeansButtonPanel onUpvote={handleUpvote} onDownvote={handleDownvote} numBeans={contentBeanCount} currentVote={currentVote} />
        </Grid>
        <Grid item>
          {deleteButton}
        </Grid>
      </Grid>
    </div>
  )
}
