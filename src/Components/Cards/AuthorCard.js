import { Avatar, Grid, Typography } from '@mui/material'
import React from 'react'

export default function AuthorCard(props) {
    let name = props.name ? props.name : "UNKNOWN"
    let imgURL = props.img ? props.img : "https://coffeehousecomics.com/images/fetch/4752e287bba0c0f51a0ce1900.jpg"

    return (
        <Grid direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Avatar src={imgURL} sx={{ width: "100px", height: "100px" }} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">
                    {name}
                </Typography>
            </Grid>
        </Grid>
    )
}
