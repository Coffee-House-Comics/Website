import { Grid, Typography } from "@mui/material";
import HorizontalScroll from "react-scroll-horizontal";
import { testStories } from "../../../../App";
import PostCard, { PostCardHeight } from "../../../Cards/PostCard";
import PostsSection from "../../../Cards/PostsSection";


function Explore() {

    //TODO
    /**
     * Type:
     *  [{
     *      posts: [PostMetadata],
     *      name: String
     *  }]
     */
    console.log("Explore")
    let postSets = [{
        posts: testStories,
        name: "Recent Releases"
    }, {
        posts: testStories,
        name: "Popular Posts"
    },]

    //Build PostCards
    const paddingBtwnCards = 5;
    const buildCards = function (posts) {
        return posts.map((post, index) => {
            return <div key={index} style={{ paddingInline: paddingBtwnCards }}>
                <PostCard key={index} post={post} />
            </div>
        });
    }

    //Build PostSections
    let postSections = []
    for(let postSet of postSets){
        let postCards = buildCards(postSet.posts);
        postSections.push(<PostsSection posts={postCards} name={postSet.name}/>)
    }

    return (
        <div style={{padding: 40, paddingInline: 25}}>
            {postSections}
        </div>
    );
}

export default Explore;