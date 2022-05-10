import { Grid, List, ListItem, Typography } from '@mui/material';
import React from 'react'
import { testStories } from '../../../../../App';
import PostCard from '../../../../Cards/PostCard';
import PostsSection, { PADDING_BTWN_CARDS } from '../../../../Cards/PostsSection';
import API from '../../../../../API';

export default function Saved(props) {

    const { user } = props;

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
                        {toShow.map((post) => {
                            return (
                                <Grid item>
                                    <PostCard post={post} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </div>

    );


    return <Typography>Community Implementation not done.</Typography>

    //TODO
    /**
     * Format:
     *    [{
     *        name: String,
     *        posts: [PostMetadata]
     *    }]
     */
    let seriesContent = [{
        name: "Series 1",
        posts: testStories
    },
    {
        name: "Series 2",
        posts: testStories
    },
    {
        name: "Series 3",
        posts: testStories
    },
    {
        name: "Series 4",
        posts: testStories
    },];

    //TODO
    /**
     * Format:
     *    [PostMetadata]
     */
    let nonSeriesContent = testStories;

    //Build post sections for series
    let seriesSections = seriesContent.map((series, index) =>
        <PostsSection key={index} name={series.name} posts={series.posts} />
    );

    //Build section for non-series content
    let nonSeriesSection = (nonSeriesContent) ?
        <div style={{ alignText: "center" }}>
            <hr style={{ margin: 30, marginBottom: 50 }} />
            <Typography variant="h4" sx={{ marginBottom: "5px", marginTop: "20px" }}>
                {"Individual Posts"}
            </Typography>

            <Grid container direction="row" justifyContent="flex-start" width="100%">
                {
                    nonSeriesContent.map((post, index) => {
                        return <div key={index} style={{ padding: PADDING_BTWN_CARDS }}>
                            <PostCard post={post} />
                        </div>
                    })
                }
            </Grid>
        </div>

        : ""

    return (
        <div style={{ height: "100%", overflowY: "scroll" }} >
            {seriesSections}
            {nonSeriesSection}
        </div>
    )
}
