import React from 'react'
import { Grid, Image, Typography, ThemeProvider, Avatar, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BeansIcon from '../Icons/BeansIcon';
import { useTheme } from '@mui/material/styles';

export default function ProfileCard(props) {
    const profile = props.profile;

    const theme = useTheme();

    //Remove the following hardcoded values
    let beans = 25;
    let comicBeans = 17;
    let storyBeans = 8;
    let subscribers = 3;
    let description = "Welcome to my CHC Profile!!! Excited to have fans.  BTW Shadow is the cutest dog... :D :D";

    const profileStatistics =
        <Grid container direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
            <Grid item>
                <BeansIcon></BeansIcon>
            </Grid>
            <Grid>
                <Typography>{beans}</Typography>
            </Grid>
            <Grid item>
                <PersonIcon sx={{ marginLeft: '10px' }}></PersonIcon>
            </Grid>
            <Grid>
                <Typography>{subscribers}</Typography>
            </Grid>
        </Grid>

    return (
        <div
            style={{
                border: "3px solid black",
                borderRadius: "5px",
                overflow: "hidden",
                boxShadow: "1px 3px 10px grey",
                left: "5%",
                width: "90%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                paddingLeft: "4px",
                paddingRight: "4px",
            }}
        >
            <Grid container direction="column" justifyContent="center" alignItems="center" width="100%" marginBottom="10px">
                <Grid item xs={12}>
                    {/* TODO Change this to profile picture image */}
                    <Avatar
                        alt="profilePicture"
                        src="coverphoto.jpg"
                        sx={{
                            width: 200,
                            height: 200,
                            marginTop: '10px',
                            border: "1px solid black",
                            boxShadow: "1px 3px 10px grey"
                        }}
                    ></Avatar>
                </Grid>
                <Grid item>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: '10px' }}> Dr. Suess </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">@dsuess</Typography>
                </Grid>
                <Grid item>
                    <div style={{ paddingRight: 2, paddingLeft: 2, marginTop: '15px' }}>
                        {profileStatistics}
                    </div>
                </Grid>
                <Grid item>
                    <Typography sx={{ marginTop: '10px', paddingLeft: 1, paddingRight: 1 }}>{description}</Typography>
                </Grid>
                <Grid item sx={{ width: "100%", paddingLeft: 1, paddingRight: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '10px' }}>Communities</Typography>
                    <Box container sx={{ border: "1px solid black", borderRadius: "5px" }}>
                        <Grid container direction="row" justifyContent="space-evenly" sx={{ paddingLeft: 1, paddingRight: 1, paddingTop: 1 }}>
                            <Grid item>
                                <Typography variant="caption" fontWeight="bold">Comic Caf{"\xE9"}</Typography>
                            </Grid>
                            <Grid item>
                                <BeansIcon />
                                <Typography variant="caption">{comicBeans}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-evenly" sx={{ paddingLeft: 1, paddingRight: 1 }}>
                            <Grid item>
                                <Typography variant="caption" fontWeight="bold">Story Caf{"\xE9"}</Typography>
                            </Grid>
                            <Grid item>
                                <BeansIcon />
                                <Typography variant="caption">{storyBeans}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}