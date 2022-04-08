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

    // Get the active Screen
    let activeScreen = <View />;
    if (profileTab === PROFILE_TABS.FORUM)
        activeScreen = <Forum />;
    else if (profileTab === PROFILE_TABS.SAVED)
        activeScreen = <Saved />;
    else if (profileTab === PROFILE_TABS.SETTINGS)
        activeScreen = <Settings />;


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
                bgcolor: theme.palette.fuzzy_wuzzy.main,
                height: "100%"
            }}>
                {"View Profile with id: " + id}
                <button onClick={() => setProfileTab(PROFILE_TABS.VIEW)}>VIEW</button>
                <button onClick={() => setProfileTab(PROFILE_TABS.SETTINGS)}>SETTINGS</button>
                <button onClick={() => setProfileTab(PROFILE_TABS.SAVED)}>SAVED</button>
                <button onClick={() => setProfileTab(PROFILE_TABS.FORUM)}>FORUM</button>
                {activeScreen}
            </Box>

        </Box>
    );
}

// LFGGGGGGG one might even say

export default ProfileRouter;