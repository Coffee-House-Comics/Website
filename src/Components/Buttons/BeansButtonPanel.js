import {useState} from 'react'
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
 *  onUpvote: function
 *  onDownvote: function
 *  numBeans: Number
 *  currentVote: Number (-1, 0, 1)
 */
export default function BeansButtonPanel(props) {

    const [vote, setVote] = useState(props.currentVote);
    const [beans, setBeans] = useState(props.numBeans);
    const { store } = React.useContext(GlobalStoreContext);



    let upIcon = (vote == 1) ? <UpArrowIcon style={{filter: Theme.palette.green.filter, overflow: "visible"}} fontSize="small" /> : <UpArrowIcon fontSize="small" sx={{overflow: "visible"}}/>
    let downIcon = (vote == -1) ? <DownArrowIcon style={{filter: Theme.palette.red.filter, overflow: "visible"}} fontSize="small" /> : <DownArrowIcon fontSize="small" sx={{overflow: "visible"}}/>

    const handleUpvoteClick = function(event){
        if (event.stopPropagation) {
            event.stopPropagation();
        }

        if(vote == 1){
            setVote(0);
            setBeans(beans - 1);
        }
        else{
            let inc = 1;
            if(vote < 0)
                inc = 2;

            setVote(1);
            setBeans(beans + inc);
        }
        
        props.onUpvote();
    }

    const handleDownvoteClick = function(event){
        if (event.stopPropagation) {
            event.stopPropagation();
        }

        if(vote == -1){
            setVote(0);
            setBeans(beans + 1);
        }
        else{
            let dec = 1;
            if(vote > 0)
                dec = 2;

            setVote(-1);
            setBeans(beans - dec);
        }

        props.onDownvote();
    }
    return (
        store.isLoggedIn?
        <Grid container direction="row" justifyContent="center" alignItems="center" wrap="nowrap" width="max-content">
                <IconButton onClick={handleUpvoteClick} sx={{ marginInline: -1 }}>
                    {upIcon}
                </IconButton>

            <Grid container direction="column" justifyContent="center" alignItems="center">
                <BeansIcon sx={{marginLeft: 0.25}}/>
                <Typography variant="caption">
                    {beans}
                </Typography>
            </Grid>
                <IconButton onClick={handleDownvoteClick} sx={{ marginInline:-1}}>
                    {downIcon}
                </IconButton>
        </Grid>:<div></div>
    )
}
