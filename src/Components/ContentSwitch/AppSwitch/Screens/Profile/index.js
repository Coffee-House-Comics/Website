import { useParams } from 'react-router-dom';
import { useState, useContext } from 'react'
import Forum from './Forum';
import Saved from './Saved';
import View from '../View';
import Settings from './Settings';
import {
    Typography,
    Grid,
    Box,
    Toolbar,
    Tab,
    Tabs
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

function ProfileRouter() {
    const { id } = useParams();
    const theme = useTheme();

    const PROFILE_TABS = {
        FORUM: 0,
        SAVED: 1,
        SETTINGS: 2,
        VIEW: 3,
    };

    const [profileTab, setProfileTab] = useState(PROFILE_TABS.VIEW);

    function changeTab(tab) {
        console.log("Changing to..:", tab);
        setProfileTab(tab);
    }

    // Get the active Screen
    let activeScreen = <View />;
    if (profileTab === PROFILE_TABS.FORUM)
        activeScreen = <Forum />;
    else if (profileTab === PROFILE_TABS.SAVED)
        activeScreen = <Saved />;
    else if (profileTab === PROFILE_TABS.SETTINGS)
        activeScreen = <Settings />;

    const lineCss = "3px solid " + theme.palette.coffee.main;

    function backgroundCSS(tab) {
        return {
            cursor: "pointer",
            textAlign: "center",
            borderBottom: lineCss,
            borderRadius: "5px 5px 0px 0px",
            padding: "10px 0px 10px 0px",
            bgcolor: (profileTab === tab) ? theme.palette.coffee.main : "transparent",
            color: (profileTab === tab) ? theme.palette.ivory.main : theme.palette.olive_drab_7.main
        }
    }

    function mutateText(text) {
        return (
            <Typography variant="h6" >{text}</Typography>
        );
    }

    return (
        <Box sx={{
            height: "100%"
        }} >
            <Box sx={{
                width: "350px",
                height: "100%",
                bgcolor: theme.palette.cg_blue.main,
                float: "left"
            }}>
                Put Profile Card here
            </Box>
            <Box sx={{
                // bgcolor: theme.palette.fuzzy_wuzzy.main,
                height: "100%",
                width: "calc(100% - 350px)",
                float: "right"
            }}>
                <Grid container spacing={0} sx={{
                    position: "relative",
                    padding: "20px",
                }}>
                    <Grid item xs={1} sx={{
                        borderBottom: lineCss,
                        padding: "10px 0px 10px 0px",
                    }} />
                    <Grid item xs={2}
                        onClick={() => changeTab(PROFILE_TABS.VIEW)}
                        sx={{
                            ...backgroundCSS(PROFILE_TABS.VIEW),

                        }}>
                        {mutateText("View")}
                    </Grid>
                    <Grid item xs={2}
                        onClick={() => changeTab(PROFILE_TABS.FORUM)}
                        sx={{
                            ...backgroundCSS(PROFILE_TABS.FORUM),
                        }}>
                        {mutateText("Forum")}
                    </Grid>
                    <Grid item xs={2}
                        onClick={() => changeTab(PROFILE_TABS.SAVED)}
                        sx={{
                            ...backgroundCSS(PROFILE_TABS.SAVED),
                        }}>
                        {mutateText("Saved")}
                    </Grid>
                    <Grid item xs={2}
                        onClick={() => changeTab(PROFILE_TABS.SETTINGS)}
                        sx={{
                            ...backgroundCSS(PROFILE_TABS.SETTINGS),
                        }}>
                        {mutateText("Settings")}
                    </Grid>
                    <Grid item xs={3} sx={{
                        borderBottom: lineCss,
                        padding: "10px 0px 10px 0px",
                    }} />
                    <Grid item xs={12}>
                        {activeScreen}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

// LFGGGGGGG one might even say

export default ProfileRouter;