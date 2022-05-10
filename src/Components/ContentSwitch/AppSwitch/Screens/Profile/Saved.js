import { Grid, List, ListItem, Typography } from '@mui/material';
import React from 'react'
import { testStories } from '../../../../../App';
import PostCard from '../../../../Cards/PostCard';
import PostsSection, { PADDING_BTWN_CARDS } from '../../../../Cards/PostsSection';
import API from '../../../../../API';
import { GlobalStoreContext } from '../../../../../Store';

export default function Saved(props) {

    const { user } = props;

    const { store } = React.useContext(GlobalStoreContext);

    const [toShow, setToShow] = React.useState([]);


    React.useEffect(() => {
        async function getSaved() {
            let resp = store.app === 'Comics' ? await API.Comic.saved() : await API.Story.saved()

            console.log("Saved Page Ids:", resp.data.content)

            setToShow(resp.data.content);
        }
        getSaved();
    }, [])

    return (
        <div style={{ padding: 40, paddingInline: 25 }}>
            <Grid container direction="row" spacing={10}>
                {/* Posts */}
                <Grid item xs={12}>
                    <Grid container direction="row" justifyContent="space-evenly">
                        {toShow.map((post, index) => {
                            return (
                                <Grid item>
                                    <PostCard key={index} post={post} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
