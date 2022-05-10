import { Grid, List, ListItem, Typography } from '@mui/material';
import React from 'react'
import { testStories } from '../../../../../App';
import PostCard from '../../../../Cards/PostCard';
import PostsSection, { PADDING_BTWN_CARDS } from '../../../../Cards/PostsSection';

export default function Saved(props) {
    
    const { user } = props;

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
