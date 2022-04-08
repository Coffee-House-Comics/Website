import { useParams } from 'react-router-dom';
import { useState, useContext } from 'react'
import { GlobalStoreContext } from '../../../../../Store';
import {
    Typography,
    Grid,
    Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';


export default function Settings() {
    const { store } = useContext(GlobalStoreContext);
    const { id } = useParams();
    const theme = useTheme();

    const SETTINGS_TAB = {
        PROFILE: "Profile",
        ACCOUNT: "Account",
        FORUM: "Forum"
    };

    const [settingsTab, setSettingsTab] = useState();

    function changeTab(tab) {
        console.log("Changing to..:", tab);
        setSettingsTab(tab);
    }

    // Settings tab component
    function settingsTabComponent(text, props) {
        return (
            <Box
                sx={{
                    ...props,
                    width: "100%",
                    height: "100px",
                    textAlign: "center",
                    color: theme.palette.ivory.main,
                    cursor: (text) ? "pointer" : "default",
                }}
            >
                {(text) ? <Typography variant='h6'>{text}</Typography> : ""}
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
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        {settingsTabComponent()}
                    </Grid>
                    <Grid item>
                        {settingsTabComponent(SETTINGS_TAB.PROFILE)}
                    </Grid>
                    <Grid item>
                        {settingsTabComponent(SETTINGS_TAB.ACCOUNT)}
                    </Grid>
                    <Grid item>
                        {settingsTabComponent(SETTINGS_TAB.FORUM)}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
