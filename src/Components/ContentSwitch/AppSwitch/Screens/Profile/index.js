import { useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../../../../../Store';
import Forum from './Forum';
import Saved from './Saved';
import ProfileContent from './ProfileContent';
import Settings from './Settings';
import ProfileCard from '../../../../Cards/ProfileCard';
import {
    Typography,
    Grid,
    Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

function ProfileRouter() {
    const { store } = useContext(GlobalStoreContext);
    const { id } = useParams();
    const theme = useTheme();

    const [user, setUser] = useState(null);
    const [trigger, setTrigger] = useState(false);

    let isMyProfile = false;

    // Fetch this user
    useEffect(function () {
        console.log("Fetching the user with id:", id);

        async function loadHelper(id) {
            const fetchedUser = await store.fetchProfile(id);
            console.log("Fetched User:", fetchedUser);
            setUser(fetchedUser);
        }

        loadHelper(id);
    }, [store.user]);

    console.log("Curent user being viewed: user");

    const PROFILE_TABS = {
        FORUM: 0,
        SAVED: 1,
        SETTINGS: 2,
        VIEW: 3,
    };

    const [profileTab, setProfileTab] = useState(PROFILE_TABS.VIEW);

    if (user === null)
        return mutateText("Loading Profile...");

    if(store.user) {
        console.log("IDS:", user.id, store.user.id);
        isMyProfile = user.id === store.user.id;
    }
        
    console.log("isMyProfile:", isMyProfile);

    function changeTab(tab) {
        console.log("Changing to..:", tab);
        
        // Not allow restricted tab actions
        if (!isMyProfile && tab === PROFILE_TABS.SETTINGS) {
            return;
        }

        if (!isMyProfile && tab === PROFILE_TABS.SAVED) {
            return;
        }
        
        setProfileTab(tab);
    }

    // Now we should check if this is our forum so we can see more options (or less if its not ours...)

    // Get the active Screen
    let activeScreen = <ProfileContent user={user} />;
    if (profileTab === PROFILE_TABS.FORUM)
        activeScreen = <Forum user={user} />;
    else if (profileTab === PROFILE_TABS.SAVED)
        activeScreen = <Saved user={user} />;
    else if (profileTab === PROFILE_TABS.SETTINGS)
        activeScreen = <Settings user={user} trigger={trigger} setTrigger={setTrigger} />;

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
                width: "375px",
                height: "100%",
                float: "left",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ProfileCard user={user}/>
            </Box>
            <Box sx={{
                // bgcolor: theme.palette.fuzzy_wuzzy.main,
                height: "100%",
                width: "calc(100% - 375px - 20px)", // Take off 20 for padding
                float: "right",
                paddingLeft: "20px"
            }}>
                <Box sx={{
                    height: "80px",
                }}>
                    <Grid container spacing={0}
                        alignItems="stretch"
                        sx={{
                            position: "relative",
                        }}>

                        <Grid item xs={2}
                            onClick={() => changeTab(PROFILE_TABS.VIEW)}
                            sx={{
                                ...backgroundCSS(PROFILE_TABS.VIEW),
                            }}>
                            {mutateText(store.app)}
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
                            {(isMyProfile)? mutateText("Saved"): ""}
                        </Grid>
                        <Grid item xs={2}
                            onClick={() => changeTab(PROFILE_TABS.SETTINGS)}
                            sx={{
                                ...backgroundCSS(PROFILE_TABS.SETTINGS),
                            }}>
                            {(isMyProfile)? mutateText("Settings") : ""}
                        </Grid>
                        <Grid item xs={3} sx={{
                            borderBottom: lineCss,
                            padding: "10px 0px 10px 0px",
                        }} />
                    </Grid>
                </Box>
                <Box sx={{
                    position: "relative",
                    height: "calc(100% - 80px)",
                }}>
                    {activeScreen}
                </Box>
            </Box>
        </Box>
    );
}

// LFGGGGGGG one might even say

export default ProfileRouter;