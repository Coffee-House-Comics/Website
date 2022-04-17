import { useParams } from 'react-router-dom';
import { useState, useContext } from 'react'
import { GlobalStoreContext } from '../../../../../../Store';
import {
    Typography,
    Grid,
    Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ForumSettings from './ForumSettings';
import ProfileSettings from './ProfileSettings';
import AccountSettings from './AccountSettings';


export default function Settings(props) {
    const { user } = props;
   
    const { store } = useContext(GlobalStoreContext);
    const { id } = useParams();
    const theme = useTheme();

    const SETTINGS_TAB = {
        PROFILE: "Profile",
        ACCOUNT: "Account",
        FORUM: "Forum"
    };

    const [settingsTab, setSettingsTab] = useState(SETTINGS_TAB.PROFILE);

    function changeTab(tab) {
        console.log("Changing to..:", tab);
        setSettingsTab(tab);
    }

    let activeSettingsPage = <ProfileSettings />;
    if (settingsTab === SETTINGS_TAB.ACCOUNT)
        activeSettingsPage = <AccountSettings />;
    else if (settingsTab === SETTINGS_TAB.FORUM)
        activeSettingsPage = <ForumSettings />;


    // Settings tab component
    function settingsTabComponent(tab, props) {
        return (
            <Box
                sx={{
                    ...props,
                    width: "100%",
                    height: "75px",
                    textAlign: "center",
                    color: (tab === settingsTab) ? theme.palette.olive_drab_7.main : theme.palette.ivory.main,
                    cursor: (tab) ? "pointer" : "default",
                    bgcolor: (tab === settingsTab) ? theme.palette.ivory.main : "transparent",
                    transform: "translateX(+7%)",
                    borderRadius: "15px",
                    paddingRight: "5px"
                }}
            >
                <Box sx={{
                    verticalAlign: "center",
                    position: "relative",
                    top: "50%",
                    transform: "translateY(-50%)",
                }}>
                    {(tab) ? <Typography variant='h6'>{tab}</Typography> : ""}
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{
            height: "100%"
        }}>
            <Box sx={{
                width: "150px",
                height: "100%",
                bgcolor: theme.palette.coffee.main,
                borderRadius: "10px",
                borderSize: "1px",
                borderStyle: "solid",
                borderColor: theme.palette.olive_drab_7.main,
                float: "left"
            }}>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={6}
                >
                    <Grid item xs={12}>
                        {settingsTabComponent()}
                    </Grid>
                    <Grid item xs={12}
                        onClick={() => changeTab(SETTINGS_TAB.PROFILE)}
                    >
                        {settingsTabComponent(SETTINGS_TAB.PROFILE)}
                    </Grid>
                    <Grid item xs={12}
                        onClick={() => changeTab(SETTINGS_TAB.ACCOUNT)}
                    >
                        {settingsTabComponent(SETTINGS_TAB.ACCOUNT)}
                    </Grid>
                    <Grid item xs={12}
                        onClick={() => changeTab(SETTINGS_TAB.FORUM)}
                    >
                        {settingsTabComponent(SETTINGS_TAB.FORUM)}
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{
                width: "calc( 100% - 175px )",
                height: "100%",
                float: "right"
            }}>
                {activeSettingsPage}
            </Box>
        </Box >
    );
}
