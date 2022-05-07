import React from 'react';
import { Grid, Image, Typography, IconButton, Button, ThemeProvider } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import AuthorButton from '../Buttons/AuthorButton';
import BeansButtonPanel from '../Buttons/BeansButtonPanel';

import { GlobalStoreContext } from '../../Store';
import types from '../../Common/Types'
import Utils from '../../Utils';

export const PostCardHeight = 335;
export default function PostCard(props) {
    const { store } = React.useContext(GlobalStoreContext);

    const post = props.post;

    //TODO
    let isBookmarked = false;

    //TODO
    let currentVote = Math.floor(Math.random() * 3) - 1;

    //TOOD
    let numBeans = Math.floor(Math.random() * 1000);

    // const imgSrc = "/Images/coffee" + (Math.floor(Math.random() * 6)) + ".jpg"


    // TODO:
    const handleOpenPost = function () {
        console.log("Post was clicked on and post status:", post.isPublished);

        console.log("Post is", post);

        const id = Utils.getId(post);

        if (post.isPublished) {
            console.log("Showing published with id: ", id);
            store.reRoute(types.TabType.APP.children.VIEW.fullRoute, id);
        }
        else {
            console.log("Showing unpublished with id: ", id);
            store.app === "Comics" ? store.reRoute(types.TabType.CREATION.children.COMIC.fullRoute, id) :
                store.reRoute(types.TabType.CREATION.children.STORY.fullRoute, id);
        }
    }


    //TODO
    const handleBookmarkClick = function () {

    }

    //TODO
    const handleAuthorClick = function () {
        console.log("Author click");
    }

    //TODO
    const handleSeriesClick = function () {
        console.log("Series click")
    }

    const onVoteChange = function (newCurrent) {
        console.log("On vote change (post card):", newCurrent);
    }

    console.log("Making card with post:", post)


    console.log("Post author image:", post.authorImage);

    const metaPanel =
        <Grid container direction="column" justifyContent="space-between" alignItems="flex-start" height="100%">
            {/* Title, Series, and Author */}
            {/* Title */}
            <Typography noWrap={true} variant="h6">
                {post.name}
            </Typography>

            {/* Series */}
            {(post.series)
                ? <div onClick={handleSeriesClick} style={{ cursor: "pointer", marginTop: -9 }} >
                    <Typography noWrap={true} variant="button" color="gray">
                        {post.series}
                    </Typography>
                </div>
                : ""
            }
            {/* TODO: Author */}
            <AuthorButton onClick={handleAuthorClick} author={{ name: post.author, profileImage: post.authorImage }} />
        </Grid>

    const bookmarkButton = <IconButton onClick={handleBookmarkClick} aria-label="bookmark" size="small">
        {store.isLoggedIn ? (isBookmarked)
            ? <BookmarkIcon fontSize="small" />
            : <BookmarkBorderIcon fontSize="small" />
            : <BookmarkBorderIcon fontSize="small" sx={{ opacity: 0 }} />
        }
    </IconButton>

    const buttonPanel =
        <Grid container direction="column" justifyContent="space-between" alignItems="flex-end" height="100%">
            <Grid item>
                {bookmarkButton}
            </Grid>

            <Grid>
                <BeansButtonPanel onVoteChange={onVoteChange} currentVote={currentVote} numBeans={numBeans} />
            </Grid>
        </Grid>

    return (
        <div
            onClick={handleOpenPost}
            style={{
                border: "3px solid black",
                borderRadius: "5px",
                overflow: "hidden",
                boxShadow: "1px 3px 10px grey",
                width: "max-content",
                height: PostCardHeight,
                cursor: "pointer"
            }}
        >
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" width="200px">
                {/* Cover image */}
                <Grid item>
                    {/* TODO: Change this to cover image */}

                    {
                        (post.isPublished) ?
                            <img src={post.coverPhoto} height="250px" width="200px" style={{ objectFit: "cover" }} />
                            :
                            <img src={"/Images/construction.png"} height="250px" width="200px" style={{ objectFit: "cover", background: `url(${post.coverPhoto})` }} />
                    }
                </Grid>
                <Grid container direction="row" justifyContent="space-between">
                    {/* Metadata panel */}
                    <Grid item xs="auto">
                        <div style={{ paddingLeft: 8, height: "100%", width: "100%" }}>
                            {metaPanel}
                        </div>
                    </Grid>
                    <Grid item>
                        <div style={{ paddingRight: 2, height: "100%", width: "100%" }}>
                            {buttonPanel}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}