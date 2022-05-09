import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react'
import { Grid, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MetadataPanel from './MetadataPanel'
import CommentsPanel from './CommentsPanel'
import ContentPanel from './ContentPanel'
import API from '../../../../../API'
import { GlobalStoreContext } from '../../../../../Store';

export default function View() {
    // Get the id that we want to view
    const { id } = useParams();
    const theme = useTheme();
    const { store } = useContext(GlobalStoreContext);
    const [post, setPost] = useState(null)

    //Set the post on first render
    useEffect(() => {
        async function getPost(id) {
            let resp = store.app==='Comics'? await API.Comic.viewPublished(id) : await API.Story.viewPublished(id)

            console.log("RESP:", resp)

            if (resp.error) {
                store.reRoute("/")
            }

            setPost(resp.data.content)
        }
        getPost(id);
    }, [])

    console.log("post:", post);

    const CONTENT_TABS = {
        VIEW: 0,
        COMMENTS: 1
    }
    const [contentTab, setContentTab] = useState(CONTENT_TABS.VIEW);

    function changeTab(tab) {
        console.log("Changing to..:", tab);
        setContentTab(tab);
    }

    if (post === null) {
        return <Typography>Loading...</Typography>
    }

    console.log("******POST:", post)
    let activePanel = <MetadataPanel
        postId={post._id}
        title={post.name}
        description={post.description}
        contentBeanCount={post.beans}
        author={post.author}
        authorId={post.authorID}
        myVote={post.myVote}
    />;
    if (contentTab === CONTENT_TABS.COMMENTS)
        activePanel = <CommentsPanel />;

    const lineCss = "3px solid " + theme.palette.coffee.main;

    let mode = "Comic"; // TODO comic or story depending on store

    function backgroundCSS(tab) {
        return {
            cursor: "pointer",
            textAlign: "center",
            borderBottom: lineCss,
            borderRadius: "5px 5px 0px 0px",
            padding: "10px 0px 10px 0px",
            bgcolor: (contentTab === tab) ? theme.palette.coffee.main : "transparent",
            color: (contentTab === tab) ? theme.palette.ivory.main : theme.palette.olive_drab_7.main
        }
    }

    function mutateText(text) {
        return (
            <Typography variant="h6" >{text}</Typography>
        );
    }


    return (<Box sx={{
        height: "100%",
    }}>
        <Box sx={{
            width: "25%",
            height: "100%",
            float: "left"
        }}>
            <Box sx={{
                height: "80px",
            }}>
                <Grid container justifyContent="space-evenly" alignItems="stretch"
                    sx={{
                    }}>

                    <Grid item xs={6}
                        onClick={() => changeTab(CONTENT_TABS.VIEW)}
                        sx={{
                            ...backgroundCSS(CONTENT_TABS.VIEW),
                        }}>
                        {mutateText(mode)}
                    </Grid>
                    <Grid item xs={6}
                        onClick={() => changeTab(CONTENT_TABS.COMMENTS)}
                        sx={{
                            ...backgroundCSS(CONTENT_TABS.COMMENTS),
                        }}>
                        {mutateText("Comments")}
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{
                position: "relative",
                height: "calc(100% - 80px)"
            }}>
                {activePanel}
            </Box>
        </Box>
        <Box sx={{
            height: "100%",
            float: "right",
            width: "75%"
        }}>
            <ContentPanel pages={post.pages} flowJSON={store.app === "Comics"? "": post.ReactFlowJSON }/>
        </Box>
    </Box>);

}