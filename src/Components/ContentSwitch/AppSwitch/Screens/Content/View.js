import { useParams } from 'react-router-dom';
import { useState } from 'react'
import { Grid, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MetadataPanel from './MetadataPanel'
import CommentsPanel from './CommentsPanel'
import ContentPanel from './ContentPanel'

function View() {
    // Get the id that we want to view
    const { id } = useParams();
    const theme = useTheme();

    const CONTENT_TABS = {
        CONTENT: 0,
        COMMENTS: 1
    }
    const [contentTab, setContentTab] = useState(CONTENT_TABS.CONTENT);

    function changeTab(tab) {
        console.log("Changing to..:", tab);
        setContentTab(tab);
    }

    let activePanel = <MetadataPanel/>;
    if(contentTab === CONTENT_TABS.COMMENTS)
        activePanel = <CommentsPanel/>;

    const lineCss = "3px solid " + theme.palette.coffee.main;

    let  mode = "Comic"; // TODO comic or story depending on store

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
        paddingTop: "10%",
        paddingBottom: "10%"
      }}>
        <Box sx={{
          height: "80px",
        }}>
            <Grid container spacing={0} alignItems="stretch"
                sx={{
                }}>
    
                <Grid item xs={2}
                    onClick={() => changeTab(CONTENT_TABS.VIEW)}
                    sx={{
                        ...backgroundCSS(CONTENT_TABS.VIEW),
                    }}>
                    {mutateText(mode)}
                </Grid>
                <Grid item xs={2}
                    onClick={() => changeTab(CONTENT_TABS.COMMENTS)}
                    sx={{
                        ...backgroundCSS(CONTENT_TABS.COMMENTS),
                    }}>
                    {mutateText("Comments")}
                </Grid>
            </Grid>
            <Box sx={{
                position: "relative",
                height: "calc(100% - 80px)",
                }}>
                {activePanel}
            </Box>
        </Box>
    </Box>);

}

export default View;