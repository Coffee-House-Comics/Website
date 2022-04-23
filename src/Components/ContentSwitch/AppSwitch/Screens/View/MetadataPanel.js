import React from 'react'
import { useState, useContext } from 'react'
import {
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BeansButtonPanel from '../../../../Buttons/BeansButtonPanel';
import BeansIcon from '../../../../Icons/BeansIcon';
import { GlobalStoreContext } from '../../../../../Store';

export default function MetadataPanel(props) {
  const {id, title, description, contentBeanCount, author, authorId} = props;
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
            }else if (await API.Story.delete(id).status === 200){
                alert("Post successfully deleted");
                store.reRoute(types.TabType.APP.children.PROFILE.fullRoute, store.user.id)
            }
        }
        deletePost(post._id)
    });
}

  const deleteButton = store.isLoggedIn && store.user.id === authorId?
  <Grid item>
    <Button variant="text" color="red" startIcon={<DeleteIcon />} onClick={handleDeleteButtonClick}>
      Delete
    </Button>
  </Grid>:"";

  function handleUpvote() {
    console.log("upvote");
  }

  function handleDownvote() {
    console.log("downvote");
  }

  return ( 
  <div style={{ overflow: "hidden", width: "100%", height: "100%", display: "flex", justifyContent: "center"}}>
    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={2} width="250px" marginBottom="10px">
        <Grid item sx={{ paddingLeft: 1, paddingRight: 1}}>
            <Typography variant="h6" sx={{fontWeight: 'bold', marginTop: '10px'}}>{title}</Typography>
        </Grid>
        <Grid item>
            <Typography variant="body2" sx={{fontWeight: "bold"}}>{"By: @" + author}</Typography>
            <Typography variant="body2" sx={{display: "flex", justifyContent: "center"}}>
              <BeansIcon/>
              {userBeanCount}
            </Typography>
        </Grid>
        <Grid item>
            <Typography sx={{marginTop: '10px'}}>{description}</Typography>
        </Grid>
        <Grid item container direction="row" justifyContent="center" alignItems="flexStart" spacing={1}>
            <Grid item>
              <BeansButtonPanel onUpvote={handleUpvote} onDownvote={handleDownvote} numBeans={contentBeanCount} currentVote={currentVote}/>
            </Grid>
        </Grid>
       {deleteButton}
    </Grid>
  </div>
  )
}
