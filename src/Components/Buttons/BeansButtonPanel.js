import React from 'react'
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import UpArrowIcon from '../Icons/UpArrowIcon';
import DownArrowIcon from '../Icons/DownArrowIcon';
import { Grid, IconButton, Typography } from '@mui/material';
import BeansIcon from '../Icons/BeansIcon';


/**
 * Expected props:
 *  onUpvote: function
 *  onDownvote: function
 *  numBeans: Number
 *  currentVote: Number (-1, 0, 1)
 */
export default function BeansButtonPanel(props) {
    console.log(props.currentVote)
    let upIcon = (props.currentVote == 1) ? <UpArrowIcon color="green" fontSize="small" /> : <UpArrowIcon fontSize="small" />
    let downIcon = (props.currentVote == -1) ? <DownArrowIcon color="fuzzy_wuzzy" fontSize="small" /> : <DownArrowIcon fontSize="small" />

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" wrap="nowrap" width="max-content">
                <IconButton onClick={props.onUpvote} sx={{ marginInline: -1 }}>
                    {upIcon}
                </IconButton>

            <Grid container direction="column" justifyContent="center" alignItems="center">
                <BeansIcon sx={{marginLeft: 0.25}}/>
                <Typography variant="caption">
                    {props.numBeans}
                </Typography>
            </Grid>
                <IconButton onClick={props.onDownvote} sx={{ marginInline:-1}}>
                    {downIcon}
                </IconButton>
        </Grid>
    )
}
