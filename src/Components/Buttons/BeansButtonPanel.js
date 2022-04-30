import { useState } from 'react'
import React from 'react'
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import UpArrowIcon from '../Icons/UpArrowIcon';
import DownArrowIcon from '../Icons/DownArrowIcon';
import { Grid, IconButton, Typography } from '@mui/material';
import BeansIcon from '../Icons/BeansIcon';
import { Theme } from '../../Common/Theme';
import { GlobalStoreContext } from '../../Store';


/**
 * Expected props:
 *  onVoteChange: function
 *  numBeans: Number
 *  currentVote: Number (-1, 0, 1)
 */
export default function BeansButtonPanel(props) {

    const [vote, setVote] = useState(props.currentVote);
    const [beans, setBeans] = useState(props.numBeans);
    const { store } = React.useContext(GlobalStoreContext);

    let upIcon = store.isLoggedIn ? (vote == 1) ? <UpArrowIcon style={{ filter: Theme.palette.green.filter, overflow: "visible" }} fontSize="small" /> : <UpArrowIcon fontSize="small" sx={{ overflow: "visible" }} /> : <UpArrowIcon fontSize="small" sx={{ overflow: "visible", opacity: .4 }} />

    let downIcon = store.isLoggedIn ? (vote == -1) ? <DownArrowIcon style={{ filter: Theme.palette.red.filter, overflow: "visible" }} fontSize="small" /> : <DownArrowIcon fontSize="small" sx={{ overflow: "visible" }} /> : <DownArrowIcon fontSize="small" sx={{ overflow: "visible", opacity: .4 }} />

    const handleUpvoteClick = function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }

        if (store.isLoggedIn) {
            let newCurrent = 0;

            if (vote == 1) {
                setVote(newCurrent);
                setBeans(beans - 1);
            }
            else {
                let inc = 1;
                if (vote < 0)
                    inc = 2;

                newCurrent = 1;

                setVote(newCurrent);
                setBeans(beans + inc);
            }

            props.onVoteChange(newCurrent);
        }
        // props.onUpvote();
    }

    const handleDownvoteClick = function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }

        if (store.isLoggedIn) {
            let newCurrent = 0;

            if (vote == -1) {
                setVote(newCurrent);
                setBeans(beans + 1);
            }
            else {
                let dec = 1;
                if (vote > 0)
                    dec = 2;

                newCurrent = -1;

                setVote(newCurrent);
                setBeans(beans - dec);
            }

            props.onVoteChange(newCurrent);
        }

        // props.onDownvote();
    }
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" wrap="nowrap" width="max-content">
            <IconButton onClick={handleUpvoteClick} sx={{ marginInline: -1 }}>
                {upIcon}
            </IconButton>

            <Grid container direction="column" justifyContent="center" alignItems="center">
                <BeansIcon sx={{ marginLeft: 0.25 }} />
                <Typography variant="caption">

                    {beans}
                </Typography>
            </Grid>
            <IconButton onClick={handleDownvoteClick} sx={{ marginInline: -1 }}>
                {downIcon}
            </IconButton>
        </Grid>
    )
}
