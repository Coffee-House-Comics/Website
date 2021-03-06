import React from 'react'
import { useContext } from 'react'
import {
    Typography,
    Grid,
    Box,
    Button, 
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import BeansButtonPanel from '../../../../Buttons/BeansButtonPanel';
import BeansIcon from '../../../../Icons/BeansIcon';
import { GlobalStoreContext } from '../../../../../Store';
import types from '../../../../../Common/Types'
import API from '../../../../../API'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


export default function MetadataPanel(props) {
    const { postId, title, description, contentBeanCount, author, authorComicBeans, authorStoryBeans, authorId, myVote, isBookmarked, handleBookmarkClick} = props;
    const theme = useTheme();
    const { store } = useContext(GlobalStoreContext);

    let userBeanCount = (store.app==="Comics") ? authorComicBeans : authorStoryBeans;

  const handleDeleteButtonClick = function () {
    console.log("Delete button clicked");
    store.createModal({
      title: "Are you sure that you want to delete this post?",
      body: "This action is irreversible.",
      action: "Delete"
    }, function () {
      async function deletePost(id) {
        console.log("Deleting post with id: ", IDBIndex)
        if (store.app === "Comics") {
          let res = await API.Comic.delete(id)
          if(res.status === 200){
            alert("Post successfully deleted");
            store.reRoute(types.TabType.APP.children.PROFILE.fullRoute, store.user.id)
          } else {
            alert("Failed to delete comic")
            console.log(res)
          }
        } else {
          let res = await API.Story.delete(id)
          if(res.status === 200){
            alert("Post successfully deleted");
            store.reRoute(types.TabType.APP.children.PROFILE.fullRoute, store.user.id)
          } else {
            alert("Failed to delete story")
            console.log(res)
          }
        }
      }
      deletePost(postId)
    });
  }

  const handleAuthorClick = function(){
    store.reRoute(types.TabType.APP.children.PROFILE.fullRoute, authorId);
  }

  const deleteButton = (store.isLoggedIn && store.user && store.user.id == authorId) ?
    <Grid item>
      <Button variant="text" color="red" startIcon={<DeleteIcon />} onClick={handleDeleteButtonClick}>
        Delete
      </Button>
    </Grid> : <div/>;

    const onVoteChange = function (newCurrent) {
        console.log("Con vote Change (metadata panel):", newCurrent);
        if (store.app === "Comics") {
          API.Comic.vote(postId, newCurrent);
        }else{
          API.Story.vote(postId, newCurrent);
        }
    }

    console.log("We bookmarked?", store.isLoggedIn, isBookmarked);

    const bookmarkButton = <IconButton onClick={handleBookmarkClick} aria-label="bookmark" size="small">
    {store.isLoggedIn ? (isBookmarked)
        ? <BookmarkIcon fontSize="small" />
        : <BookmarkBorderIcon fontSize="small" />
        : <BookmarkBorderIcon fontSize="small" sx={{ opacity: 0 }} />
    }
    </IconButton>

    return (
        <div style={{ overflow: "hidden", width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={2} width="250px" marginBottom="10px">
                <Grid item sx={{ paddingLeft: 1, paddingRight: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '10px' }}>{title} {bookmarkButton}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2" sx={{ fontWeight: "bold", cursor: "pointer" }} onClick = {handleAuthorClick}>{"By: @" + author}</Typography>
                    <Typography variant="body2" sx={{ display: "flex", justifyContent: "center" }}>
                        <BeansIcon />
                        {userBeanCount}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography sx={{ marginTop: '10px' }}>{description}</Typography>
                </Grid>
                <Grid item>
                    <BeansButtonPanel onVoteChange={onVoteChange} numBeans={contentBeanCount} currentVote={myVote} />
                </Grid>
                <Grid item>
                    {deleteButton}
                </Grid>
            </Grid>
        </div>
    )
}
