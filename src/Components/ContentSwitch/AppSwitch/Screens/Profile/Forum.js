import { Grid, IconButton, Typography } from "@mui/material";
import ForumPost from "../../../../Cards/ForumPost";
import { GlobalStoreContext } from '../../../../../Store';
import { useState, useContext, useEffect } from 'react';
import CreateForumPost from '../../../../Cards/CreateForumPost';
import { Colors } from "../../../../../Common/Theme";
import Utils from "../../../../../Utils";
import { useNavigate, useLocation } from 'react-router-dom';

export default function Forum(props) {
    const { user } = props;

    // console.log("User in forum:", user);

    const { store } = useContext(GlobalStoreContext);

    let forum = null;

    if (user)
        forum = (store.app === 'Comics') ? user.comicForum : user.storyForum;


    const [allPosts, setAllPosts] = useState(null);

    const location = useLocation()

    const loadHelper = function () {
        async function helper() {
            console.log("Fetching forum posts of user with id:", user.id);
            const posts = await store.fetchForumPosts(user.id);

            if (posts) {
                console.log("Recieved forum posts: ", posts);

                setAllPosts(posts.forumPosts);

                return;
            }

            console.log("Forum posts did not load yet...");
        }

        helper();
    };

    useEffect(loadHelper, []);
    // Refresh once the user in the store actually refreshes
    useEffect(loadHelper, [store.user, location]);



    if (!Boolean(forum)) {
        return <Typography>{"This user has not activated their " + store.app + " forum."}</Typography>
    }

    if (!allPosts)
        return <Typography>Loading...</Typography>

    // What it looks like:
    // {
    //     ownerId: userId,
    //     title: postTitle,
    //     body: postBody,
    //     user: account.user.displayName,
    //     date: new Date(),
    //     beans: 0,
    //     comments: [],
    //     myVote: 0 || 1 || -1 
    // };

    const addForumPostHook = async function (title, body) {
        const res = await store.createForumPost(Utils.getId(user), title, body);

        if (res) {
            console.log("SUCCESS");

            loadHelper();
        }
        else {
            console.log("FAILURE");
        }
    }

    const ret = allPosts.map((post, index) => {
        return (
            <Grid item key={index} xs={12}>
                <ForumPost
                    key={index}
                    id={post.id}
                    title={post.title}
                    profileId={user.id}
                    currentVote={post.myVote}
                    beans={post.beans}
                    ownerId={post.ownerId}
                    body={post.body}
                    author={post.user}
                    comments={post.comments}>
                </ForumPost>

            </Grid>
        );
    });


    return (
        <Grid container paddingBottom={5} sx={{
            overflowY: "auto",
            height: "100%",
            width: "100%"
        }}>
            {ret}

            {store.isLoggedIn ?
            <Grid item xs={12} sx={{ width: "100%"}}>
                <CreateForumPost hook={addForumPostHook} />
            </Grid>
            : ""}
        </Grid>
    )

}