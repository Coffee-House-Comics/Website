import { testStories } from "../../../../App";
import PostsSection from "../../../Cards/PostsSection";
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from "../../../../Store";
import API from "../../../../API";
import { useParams } from "react-router-dom";
import PostCard from "../../../Cards/PostCard";
import { Grid, Typography } from "@mui/material";
import AuthorCard from "../../../Cards/AuthorCard";
import types from "../../../../Common/Types";

function Search() {
    const { store } = useContext(GlobalStoreContext);
    const { id } = useParams(); //This "ID" is actually the search string
    const [searchedPosts, setSearchedPosts] = useState([]);
    const [searchedAuthors, setSearchedAuthors] = useState([]);
    const searchString = id;

    console.log("Loading again. Search string:", searchString);

    const execSearch = function () {
        async function doSearch() {
            try {
                let resp;
                if (store.app === "Comics") {
                    resp = (await API.Comic.search(searchString));
                }

                else {
                    resp = (await API.Story.search(searchString));
                }

                if (resp.status != 200) {
                    store.createModal({
                        title: "Error fetching explore page",
                        body: "Explore data could not be retrieved. Please try again.",
                        action: ""
                    });
                    return;
                }

                setSearchedPosts(resp.data.posts);
                setSearchedAuthors(resp.data.authors);
            }

            catch (err) {
                console.log(err);
            }
        }
        doSearch();
    }
    execSearch();

    return (
        <div style={{ padding: 40, paddingInline: 25 }}>
            <Grid container direction="row" spacing={10}>

                {/* Authors */}
                <Grid item xs={12}>
                    <Typography variant="h4" marginBottom="5px">
                        Authors
                    </Typography>
                    <Grid container direction="row" justifyContent="flex-start" spacing={2}>
                        {searchedAuthors.map((author) => {
                            return (
                                <Grid item onClick={()=>{store.reRoute(types.TabType.APP.children.PROFILE.fullRoute, author.id)}}>
                                    <AuthorCard name={author.name} img={author.profileImage}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>

                {/* Posts */}
                <Grid item xs={12}>
                    <Typography variant="h4" marginBottom="5px">
                        Posts
                    </Typography>
                    <Grid container direction="row" justifyContent="flex-start" spacing={2}>
                        {searchedPosts.map((post) => {
                            console.log("Search post from map: ", post)
                            return (
                                <Grid item>
                                    <PostCard post={post} />
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