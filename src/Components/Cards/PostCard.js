import React from 'react';
import { Grid, Typography } from '@mui/material';
import AuthorButton from '../Buttons/AuthorButton';
import { GlobalStoreContext } from '../../Store';
import types from '../../Common/Types'
import Utils from '../../Utils';
import BeansIcon from '../Icons/BeansIcon';

export const PostCardHeight = 355;
export default function PostCard(props) {
    const { store } = React.useContext(GlobalStoreContext);

    const post = props.post;

    // //TODO
    // let isBookmarked = false;

    // //TODO
    // let currentVote = Math.floor(Math.random() * 3) - 1;

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

    const handleAuthorClick = function (e) {
        e.preventDefault();
        store.reRoute(types.TabType.APP.children.PROFILE.fullRoute,post.authorId);
    }

    //TODO
    const handleSeriesClick = function () {
        console.log("Series click")
    }

    const onVoteChange = function (newCurrent) {
        console.log("On vote change (post card):", newCurrent);
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
            <AuthorButton onClick={handleAuthorClick} author={{ name: post.author, profileImage: post.authorImage }} />
            {/* Beans */}
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
                <BeansIcon />
                <Typography variant="caption">
                    {post.beans}
                </Typography>
            </Grid>
        </Grid>

    // const bookmarkButton = <IconButton onClick={handleBookmarkClick} aria-label="bookmark" size="small">
    //     {store.isLoggedIn ? (isBookmarked)
    //         ? <BookmarkIcon fontSize="small" />
    //         : <BookmarkBorderIcon fontSize="small" />
    //         : <BookmarkBorderIcon fontSize="small" sx={{ opacity: 0 }} />
    //     }
    // </IconButton>

    // const buttonPanel =
    //     <Grid container direction="column" justifyContent="space-between" alignItems="center" height="100%">
    //         <Grid item>
    //             {bookmarkButton}
    //         </Grid>

    //         <Grid>
    //             <BeansButtonPanel onVoteChange={onVoteChange} currentVote={currentVote} numBeans={post.beans} />
    //         </Grid>
    //     </Grid>

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
                            <img src={"/Images/construction.png"} height="250px" width="200px" style={{ objectFit: "cover", background: `url(${post.coverPhoto})`, backgroundSize: "cover" }} />
                    }
                </Grid>
                <Grid container direction="row" justifyContent="space-between">
                    {/* Metadata panel */}
                    <Grid item xs="auto">
                        <div style={{ paddingLeft: 8, height: "100%", width:"100%"}}>
                            {metaPanel}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
/**
 *                     <Grid item>
                        <div style={{ paddingRight: 2, height: "100%", width:"70px"}}>
                            {buttonPanel}
                        </div>
                    </Grid>
 */