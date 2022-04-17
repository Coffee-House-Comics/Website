import React from 'react'
import { Grid, Image, Typography, ThemeProvider, Avatar, Box, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BeansIcon from '../Icons/BeansIcon';
import { useTheme } from '@mui/material/styles';
import CoffeeIcon from '@mui/icons-material/Coffee';
import styled from '@emotion/styled';
import { GlobalStoreContext } from '../../Store';

export default function ProfileCard(props) {
    const { user } = props;

    const theme = useTheme();

    const { store } = React.useContext(GlobalStoreContext)

    //Remove the following hardcoded values
    let userName = user.userName;
    let displayName = user.displayName;
    let comicBeans = user.comicBeans;
    let storyBeans = user.storyBeans;
    let comicSubscribers = user.comicSubscribers;
    let storySubscribers = user.storySubscribers;
    let description = user.bio;

    let SubscribeButton = store.isLoggedIn && !props.isMyProfile ?
    styled(Button)(({ theme }) => ({
        color: theme.palette.ivory.main,
        backgroundColor: theme.palette.cg_blue.main,
        '&:hover': {
            backgroundColor: theme.palette.cadet_blue.main
        }
    })):"";

    const profileStatistics =
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" width="100%" sx={{border: "0px solid black", borderRadius:"4px", marginTop: "10px", marginBottom: "10px", padding: "10px"}}>
            <Grid item width="100%">
                <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                    <Grid item>
                        <Typography variant="subtitle1">
                            Comic Caf{"\xE9"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                            <Grid item>
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
                                <Grid container direction="row" justifyContent="center" alignItems="center">
                                    <Grid item>
                                        <PersonIcon />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption">{comicSubscribers}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item width="100%">
                <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                    <Grid item>
                        <Typography variant="subtitle1">
                            Story Caf{"\xE9"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                            <Grid item>
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
                                <Grid container direction="row" justifyContent="center" alignItems="center">
                                    <Grid item>
                                        <PersonIcon />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption">{storySubscribers}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    return (
        <div
            style={{
                border: "3px solid " + theme.palette.olive_drab_7.main,
                borderRadius: "5px",
                overflow: "hidden",
                boxShadow: "1px 3px 10px grey",
                width: "100%",
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
                    <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: '10px' }}> {displayName} </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">{"@" + userName}</Typography>
                </Grid>
                <Grid item width="100%">
                    {profileStatistics}
                </Grid>
                <Grid item>
                    <Typography sx={{ marginTop: '10px', paddingLeft: 1, paddingRight: 1 }}>{description}</Typography>
                </Grid>
                <Grid item sx={{ width: "100%", paddingLeft: 1, paddingRight: 1 }}>

                </Grid>
            </Grid>

            {/* Bottom */}
            <Box sx={{
                position: "absolute",
                bottom: "0",
                width: "90%",
                left: "5%",
                justifyContent: "center",
                paddingBottom: "40px",
            }}>
                <SubscribeButton sx={{width:"100%"}} variant="contained" color="cg_blue">
                    SUBSCRIBE
                </SubscribeButton>
            </Box>
        </div>
    )
}