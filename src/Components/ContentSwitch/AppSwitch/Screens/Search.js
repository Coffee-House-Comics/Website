import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from "../../../../Store";
import API from "../../../../API";
import { useParams } from "react-router-dom";
import PostCard from "../../../Cards/PostCard";
import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import AuthorCard from "../../../Cards/AuthorCard";
import types from "../../../../Common/Types";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Search() {
    const { store } = useContext(GlobalStoreContext);
    const { id } = useParams(); //This "ID" is actually the search string
    const [searchedPosts, setSearchedPosts] = useState([]);
    const [searchedAuthors, setSearchedAuthors] = useState([]);
    const [sortBy, setSortBy] = useState("beans")
    const [pageNum, setPageNum] = useState(0);
    const [numPerPage, setNumPerPage] = useState(10);
    const [numPostResults, setNumPostResults] = useState(0);
    const [numAuthorResults, setNumAuthorResults] = useState(0);
    const [numResults, setNumResults] = useState(0);
    const [searchFor, setSearchFor] = useState("Posts")
    const searchString = id;

    console.log("Loading search. Search string: %s, Sort by: %s", searchString, sortBy);

    const execSearch = function () {
        async function doSearch() {
            try {
                let resp;
                if (store.app === "Comics") {
                    resp = (await API.Comic.search(searchString, sortBy, numPerPage, pageNum));
                } else {
                    resp = (await API.Story.search(searchString, sortBy, numPerPage, pageNum));
                }

                if (resp.status != 200) {
                    store.createModal({
                        title: "Error fetching search page",
                        body: "Search data could not be retrieved. Please try again.",
                        action: ""
                    });
                    return;
                }
                console.log("Searched posts: ", resp.data.posts)
                console.log("Searched authors: ", resp.data.authors)
                console.log("Total number of post results: ", resp.data.numPostResults);
                console.log("Total number of author results: ", resp.data.numAuthorResults);

                setSearchedPosts(resp.data.posts);
                setSearchedAuthors(resp.data.authors);
                setNumPostResults(resp.data.numPostResults)
                setNumAuthorResults(resp.data.numAuthorResults);

                if (searchFor === "Authors") {
                    setNumResults(resp.data.numAuthorResults);
                } else {
                    setNumResults(resp.data.numPostResults);
                }

            }

            catch (err) {
                console.log(err);
            }
        }
        doSearch();
    }

    useEffect(execSearch, [searchString, sortBy, pageNum, numPerPage, searchFor])


    const handleSortChange = function (e) {
        console.log("Sort change:", e)
        setSortBy(e.target.value)
    }

    const handleNumPerPageChange = function (e) {
        let value = parseInt(e.target.value)
        console.log("Num results per page change:", value)
        if (value < 1) {
            value = 1
        }
        setNumPerPage(value)
    }

    const handleLeftPageClick = function (e) {
        console.log("Page left")
        let value = pageNum - 1
        if (value < 0) {
            value = 0
        }
        setPageNum(value)
    }

    const handleRightPageClick = function (e) {
        console.log("Page right")
        let value = pageNum + 1
        setPageNum(value)
    }

    const handleSearchForChange = function (e) {
        setSearchFor(e.target.value)
    }

    const pagination = (
        <Grid container direction="row" spacing={1} justifyContent="center" alignItems="center">
            <Grid item>
                <IconButton disabled={pageNum <= 0} onClick={handleLeftPageClick}>
                    <ChevronLeftIcon />
                </IconButton>
            </Grid>
            <Grid item>
                <Grid item>
                    <Typography variant="h6">
                        {pageNum + 1}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item>
                <IconButton disabled={(pageNum + 1) * numPerPage >= numResults} onClick={handleRightPageClick}>
                    <ChevronRightIcon />
                </IconButton>
            </Grid>
        </Grid>
    )

    const authorsSection = (
        <Grid container direction="row" justifyContent="flex-start" spacing={2}>
            {(numAuthorResults > 0) ?
                searchedAuthors.map((author) => {
                    return (
                        <Grid item onClick={() => { store.reRoute(types.TabType.APP.children.PROFILE.fullRoute, author.id) }}>
                            <AuthorCard name={author.name} img={author.profileImage} />
                        </Grid>
                    )
                }) : "No results :("}
        </Grid>
    )

    const postsSection = (
        <Grid container direction="row" justifyContent="flex-start" spacing={2}>
            {(numPostResults > 0) ?
                searchedPosts.map((post) => {
                    // console.log("Search post from map: ", post)
                    return (
                        <Grid item>
                            <PostCard post={post} />
                        </Grid>
                    )
                }) : "No results :("}
        </Grid>
    )

    return (
        <div style={{ padding: 40, paddingInline: 25 }}>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
                        <Grid item xs={12} sx={{marginBottom: "20px"}}>
                            <Typography variant="h4">
                                Search options:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{marginBottom: "-10px"}}>
                            <Typography variant="h6">
                                Search for:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{marginBottom: "15px"}}>
                            <ToggleButtonGroup
                                color="text"
                                value={searchFor}
                                exclusive
                                onChange={handleSearchForChange}
                            >
                                <ToggleButton value="Posts">Posts ({numPostResults} results)</ToggleButton>
                                <ToggleButton value="Authors">Authors ({numAuthorResults} results)</ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>

                        {/* Num per page */}
                        <Grid item xs="auto">
                            <TextField
                                sx={{ width: "150px" }}
                                onChange={handleNumPerPageChange}
                                value={numPerPage}
                                id="outlined-number"
                                label="Results per Page"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        {/* Sorting */}
                        {(searchFor === "Posts") ?
                            <Grid item xs="auto">
                                <FormControl fullWidth>
                                    <InputLabel id="sort-by-label">Sort Results</InputLabel>
                                    <Select
                                        labelId="sort-by-label"
                                        id="sort-by"
                                        value={sortBy}
                                        label="Sort Results"
                                        onChange={handleSortChange}
                                    >
                                        <MenuItem value={"publishedDate"}>Date Published</MenuItem>
                                        <MenuItem value={"beans"}>Beans</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid> : <div />}
                    </Grid>
                </Grid>

                {/* Title */}
                <Grid item xs={12} sx={{marginTop:"40px"}}>
                    <Typography variant="h4">
                        Results
                    </Typography>
                </Grid>

                {/* Results */}
                <Grid item xs={12}>
                    {(searchFor === "Posts") ? postsSection : authorsSection}
                </Grid>

                {/* Pagination buttons */}
                <Grid item xs={12}>
                    {pagination}
                </Grid>
            </Grid>
        </div>
    );
}

export default Search;