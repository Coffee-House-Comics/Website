import { Avatar, Grid, Typography } from '@mui/material'
import React from 'react'

export default function AuthorCard(props) {
    let name = props.name ? props.name : "UNKNOWN"
    let imgURL = props.img ? props.img : "https://coffeehousecomics.com/images/fetch/4752e287bba0c0f51a0ce1900.jpg"
    let id = props.id ? props.id : ""

    return (
        <div style={{backgroundColor: "#FFFFFF", border: "2px solid black", borderRadius: "10px", padding: "20px", cursor:"pointer"}}>
            <Grid direction="column" justifyContent="center" alignItems="center">
                <Grid item>
                    <Avatar src={imgURL} sx={{ width: "100px", height: "100px" }} />
                </Grid>
                <Grid item>
                    <Typography variant="h6">
                        {name}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}
