import React from 'react';
import { Grid, Image, Typography, IconButton, Button, ThemeProvider } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import AuthorButton from '../Buttons/AuthorButton';
import BeansButtonPanel from '../Buttons/BeansButtonPanel';

export const PostCardHeight = 335;
export default function PostCard(props) {
    const post = props.post;

    //TODO
    let isBookmarked = false;

    //TODO
    let currentVote = 1;

    //TOOD
    let numBeans = 0;

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

    //TOOD
    const handleUpvoteClick = function () {
        console.log("Upvote click")
    }

    //TODO
    const handleDownvoteClick = function () {
        console.log("Downvote click")
    }

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
            {/* Author */}
            <AuthorButton onClick={handleAuthorClick} author={post.author} />
        </Grid>

    const bookmarkButton =
        <IconButton onClick={handleBookmarkClick} aria-label="bookmark" size="small">
            {(isBookmarked)
                ? <BookmarkIcon fontSize="small" />
                : <BookmarkBorderIcon fontSize="small" />
            }
        </IconButton>

    const buttonPanel =
        <Grid container direction="column" justifyContent="space-between" alignItems="flex-end" height="100%">
            <Grid item>
                {bookmarkButton}
            </Grid>

            <Grid>
                <BeansButtonPanel onUpvote={handleUpvoteClick} onDownvote={handleDownvoteClick} currentVote={currentVote} numBeans={numBeans} />
            </Grid>
        </Grid>

    return (
        <div style={{ border: "3px solid black", borderRadius: "5px", overflow: "hidden", boxShadow: "1px 3px 10px grey", width: "max-content", height: PostCardHeight }}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" width="200px">
                {/* Cover image */}
                <Grid item>
                    {/* TODO Change this to cover image */}
                    <img src="/Images/coffee.jpg" height="250px" width="200px" />
                </Grid>
                <Grid container direction="row" justifyContent="space-between">
                    {/* Metadata panel */}
                    <Grid item xs="auto">
                        <div style={{ paddingLeft: 8, height: "100%", width: "100%"}}>
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