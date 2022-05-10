import { testStories } from "../../../../App";
import PostsSection from "../../../Cards/PostsSection";
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from "../../../../Store";
import API from "../../../../API";
import { useParams } from "react-router-dom";
import PostCard from "../../../Cards/PostCard";
import { Grid, Typography } from "@mui/material";
import AuthorCard from "../../../Cards/AuthorCard";

function Search() {
    console.log("You are NOT a dumbass :)")

    const { store } = useContext(GlobalStoreContext);
    const { id } = useParams(); //This "ID" is actually the search string
    const [searchedPosts, setSearchedPosts] = useState([]);
    const [searchedAuthors, setSearchedAuthors] = useState([]);
    const searchString = id;

    async function getPostFromId(id) {
        let resp;
        try {
            if(store.app === "Comics") {
                resp = (await API.Comic.viewPublished(id));
            }
            else {
                resp = (await API.Story.viewPublished(id));
            }
        
            if(resp.status != 200) {
                //Post wont be added to post array
                console.log("Error fetching post from id:", id);
                console.log(resp.error);
                return;
            }

            const newSearchedPosts = searchedPosts.concat(resp.data.content);
            setSearchedPosts(newSearchedPosts);
        }

        catch(err) {
            console.log(err)
        }
    }

    async function getAuthorFromId(id) {
        let resp;
        try {
            if(store.app === "Comics") {
                resp = (await API.Comic.viewProfile(id));
            }
            else {
                resp = (await API.Story.viewProfile(id));
            }
        
            if(resp.status != 200) {
                //Author wont be added to author array
                console.log("Error fetching author from id:", id);
                console.log(resp.error);
                return;
            }

            const newSearchedAuthors = searchedAuthors.concat(resp.data.content);
            setSearchedAuthors(newSearchedAuthors);
        }

        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        async function doSearch() {
            console.log("Search string:", searchString)
            try {
                let resp;
                if(store.app === "Comics") {
                    resp = (await API.Comic.search(searchString.split(',')));
                }

                else {
                    resp = (await API.Story.search(searchString.split(',')));
                }

                if(resp.status != 200) {
                    store.createModal({
                        title: "Error fetching explore page",
                        body: "Explore data could not be retrieved. Please try again.",
                        action: ""
                    });
                    return;
                }

                // resp.data.posts.forEach(postId => getPostFromId(postId));
                // resp.data.authors.forEach(authorId => getAuthorFromId(authorId));

                setSearchedPosts(resp.data.posts);
                setSearchedAuthors(resp.data.authors);
            }

            catch(err) {
                console.log(err);
            }
        }
        doSearch();
    }, []);

    return (
        <div style={{padding: 40, paddingInline: 25}}>
            <Typography>
                MUI FTW
            </Typography>
            <Grid container direction="row">

                {/* Authors */}
                <Grid item xs={12}>
                    <Grid container direction="row">
                        {searchedAuthors.map((author) => {
                            return (
                            <Grid item>
                                <AuthorCard name={author.name} img={author.profileImage}/>
                            </Grid>
                            )
                        })}
                    </Grid>
                </Grid>

                {/* Posts */}
                <Grid item xs={12}>
                    <Grid container direction="row">
                        {searchedPosts.map((post) => {
                            return (
                                <Grid item>
                                    <PostCard post={post}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Search;