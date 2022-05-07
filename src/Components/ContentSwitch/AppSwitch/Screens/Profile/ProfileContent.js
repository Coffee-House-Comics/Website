import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import React from 'react'
import { testStories } from '../../../../../App';
import PostCard from '../../../../Cards/PostCard';
import PostsSection, { PADDING_BTWN_CARDS } from '../../../../Cards/PostsSection';

export default function ProfileContent({ user, seriesArray }) {

    //TODO
    /**
     * Format:
     *    [{
     *        name: String,
     *        posts: [PostMetadata]
     *    }]
     */

    if (!seriesArray || seriesArray.length === 0 || seriesArray[0].name === undefined || seriesArray[0].posts === undefined)
        return <Typography>This user has no published content</Typography>


    console.log("SA:", seriesArray);

    const seriesContent = [];
    const nonSeriesContentFilter = [];

    seriesArray.forEach(elem => {
        if (elem.name)
            seriesContent.push(elem);
        else
            nonSeriesContentFilter.push(elem);
    });

    const nonSeriesContent = (nonSeriesContentFilter.length === 1) ? nonSeriesContentFilter[0].posts : null;

    console.log("RES:", seriesContent, nonSeriesContent);

    /**
     * Format:
     *    [PostMetadata]
     */

    //Build post sections for series
    let seriesSections = (seriesContent) ?
        (
            seriesContent.map((series, index) => {
                console.log("mm:", series)

                return <PostsSection key={index} name={series.name} posts={series.posts} />
            }
            )
        )
        : "";

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

        : "";

    return (
        <div style={{ height: "100%", overflowY: "scroll" }} >
            {seriesSections}
            {nonSeriesSection}
            {/* {unPublishedSection} */}
        </div>
    )
}
