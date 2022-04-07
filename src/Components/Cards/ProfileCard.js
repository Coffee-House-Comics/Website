import React from 'react'
import { Grid, Image, Typography, ThemeProvider, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'; 
import BeansIcon from '../Icons/BeansIcon';

export default function ProfileCard(props) {
    const profile = props.profile;

    //Remove the following hardcoded values
    let beans = 25;
    let subscribers = 3;
    let description = "Welcome to my CHC Profile!!! Excited to have fans";

    const profileStatistics = 
        <Grid container direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
            <Grid item>
                <BeansIcon></BeansIcon>
            </Grid>
            <Grid>
                <Typography>{beans}</Typography>
            </Grid>
            <Grid item>
                <PersonIcon></PersonIcon>
            </Grid>
            <Grid>
                <Typography>{subscribers}</Typography>
            </Grid>
        </Grid>

    return (
        <div style={{ border: "3px solid black", borderRadius: "5px", overflow: "hidden", boxShadow: "1px 3px 10px grey", width: "max-content"}}>
            <Grid container direction="column" justifyContent="space-around" alignItems="center" spacing={3} width="250px">
                <Grid item>
                    {/* TODO Change this to profile picture image */}
                    <Avatar alt="profilePicture" src="coverphoto.jpg" sx={{ width:72, height:72, marginTop: '10px' }}></Avatar> 
                </Grid>
                <Grid item>
                    <Typography> Dr. Suess </Typography>
                    <Typography>@dr.suess</Typography>
                </Grid>
                <Grid item>
                    <div style={{ paddingRight: 2, paddingLeft: 2}}>
                        {profileStatistics}
                    </div>
                </Grid>
                <Grid item>
                    <Typography>{description}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}