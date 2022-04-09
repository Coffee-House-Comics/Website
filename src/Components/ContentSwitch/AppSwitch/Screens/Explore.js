import { testStories } from "../../../../App";
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

    //Build PostSections
    let postSections = []
    for(let postSet of postSets){
        postSections.push(<PostsSection posts={postSet.posts} name={postSet.name}/>)
    }

    return (
        <div style={{padding: 40, paddingInline: 25}}>
            {postSections}
        </div>
    );
}

export default Explore;