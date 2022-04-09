import { GlobalStoreContext } from '../../../../../../Store';
import { useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Typography,
    Grid,
    Box,
    Button
} from '@mui/material';
import { styled } from '@mui/material/styles';

const DisabledColorButton = styled(Button)(({ theme }) => ({
    marginTop: "20px",
    width: "200px",
    color: 'black',
    backgroundColor: theme.palette.forest_green_crayola.main,
    '&:hover': {
        backgroundColor: theme.palette.forest_green_crayola.hover,
    },
}));

const EnabledColorButton = styled(Button)(({ theme }) => ({
    marginTop: "20px",
    width: "200px",
    color: 'black',
    backgroundColor: theme.palette.fuzzy_wuzzy.main,
    '&:hover': {
        backgroundColor: theme.palette.fuzzy_wuzzy.hover,
    },
}));


export default function ForumSettings() {
    const { store } = useContext(GlobalStoreContext);
    const theme = useTheme();

    const hardCodedInit = true;

    const [forumText, setForumText] = useState((hardCodedInit) ? 'Enabled' : 'Disabled');

    let isEnabled = (forumText === 'Enabled');

    const handleChange = function () {
        if (isEnabled) {
            const metadata = {
                title: "Are you sure that you want to delete your forum?",
                body: "All current forum posts will be deleted.",
                action: "Yes, delete it."
            };

            store.createModal(metadata, function () {
                setForumText('Disabled');
            })
        }
        else {
            // Enabling doesn't require confirmation
            setForumText('Enabled');
        }
    }

    const getText = (
        <Grid container spacing={1}>
            <Grid item>
                <Typography variant="h6">
                    {"Your " + store.app + " forum is currently"}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant='h6'
                    sx={{
                        color: (forumText === 'Enabled') ? theme.palette.forest_green_crayola.main : theme.palette.fuzzy_wuzzy.main,
                    }}
                >
                    {forumText}
                </Typography>
            </Grid>
        </Grid>
    );

    return (
        <Box sx={{
            width: "100%"
        }}>
            <Grid container sx={{
                maxWidth: "100%"
            }}>
                <Grid item xs={12}>
                    {getText}
                </Grid>
                <Grid item xs={12}>
                    {
                        (forumText === 'Enabled') ?
                            <EnabledColorButton onClick={handleChange} >DISABLE</EnabledColorButton> :
                            <DisabledColorButton onClick={handleChange}>ENABLE</DisabledColorButton>
                    }
                </Grid>
            </Grid>
        </Box>
    );
}