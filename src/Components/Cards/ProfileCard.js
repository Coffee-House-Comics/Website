import React from 'react'
import { Grid, Image, Typography, ThemeProvider, Avatar, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BeansIcon from '../Icons/BeansIcon';
import { useTheme } from '@mui/material/styles';
import CoffeeIcon from '@mui/icons-material/Coffee';

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
                border: "3px solid " + theme.palette.olive_drab_7.main,
                borderRadius: "5px",
                overflow: "hidden",
                boxShadow: "1px 3px 10px grey",
                width: "90%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                paddingLeft: "4px",
                paddingRight: "4px",
                position: "relative"
            }}
        >
            <Grid container direction="column" justifyContent="center" alignItems="center" width="100%" marginBottom="10px">
                <Grid item xs={12}>
                    {/* TODO Change this to profile picture image */}
                    <Avatar
                        alt="profilePicture"
                        src="/Images/krtek2.png"
                        sx={{
                            width: 200,
                            height: 200,
                            marginTop: '10px',
                            border: "1px solid black",
                            boxShadow: "1px 3px 10px grey",
                            objectFit: "cover"
                        }}
                    ></Avatar>
                </Grid>
                <Grid item>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: '10px' }}> Krtek </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">@krtek</Typography>
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

                </Grid>
            </Grid>
            <Box sx={{
                position: "absolute",
                bottom: "0",
                width: "90%",
                left: "5%",
                justifyContent: "center",
                paddingBottom: "40px",
            }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '10px' }}>Communities</Typography>
                <Grid container direction="column"
                    sx={{
                        border: "1px solid " + theme.palette.olive_drab_7.main,
                        borderRadius: "10px",
                        padding: "1px"
                    }}
                >
                    <Grid item>
                        <Grid container direction="row" justifyContent="flex-start" sx={{ padding: "8px" }} spacing={8}>
                            <Grid item>
                                <Grid container direction="row" justifyContent="center" alignItem="center" spacing={2}>
                                    <Grid item width="80px">
                                        <Grid container direction="row" justifyContent="center" alignItems="center">
                                            <Grid item>
                                                <BeansIcon />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="caption">{comicBeans}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption" fontWeight="bold">Comic Caf{"\xE9"}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justifyContent="flex-start" sx={{ padding: "8px" }} spacing={8}>
                            <Grid item>
                                <Grid container direction="row" justifyContent="center" alignItem="center" spacing={2}>
                                    <Grid item width="80px">
                                        <Grid container direction="row" justifyContent="center" alignItems="center">
                                            <Grid item>
                                                <BeansIcon />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="caption">{storyBeans}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption" fontWeight="bold">Story Caf{"\xE9"}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}