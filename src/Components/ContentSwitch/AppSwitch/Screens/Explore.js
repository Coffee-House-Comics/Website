import { Grid, Typography } from "@mui/material";
import HorizontalScroll from "react-scroll-horizontal";
import { testStories } from "../../../../App";
import PostCard, { PostCardHeight } from "../../../Cards/PostCard";
import PostsSection from "../../../Cards/PostsSection";


function Explore() {

    //TODO
    let recentPosts = testStories;

    //TODO
    let popularPosts = testStories;

    //Build PostCards
    const paddingBtwnCards = 5;
    const buildCards = function (posts) {
        return posts.map((post, index) => {
            return <div key={index} style={{ paddingInline: paddingBtwnCards }}>
                <PostCard key={index} post={post} />
            </div>
        });
    }
    let recentPostCards = buildCards(recentPosts);
    let popularPostCards = buildCards(popularPosts);


    return (
        <div style={{padding: 40, paddingInline: 25}}>
            <PostsSection posts={recentPostCards} name="Recent Releases" />
            <PostsSection posts={popularPostCards} name="Popular Posts" />
        </div>
    );
}

export default Explore;