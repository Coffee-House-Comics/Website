import { testStories } from "../../../../App";
import PostsSection from "../../../Cards/PostsSection";


function Subscriptions() {

    //TODO
    /**
     * Type:
     *  [{
     *      posts: [PostMetadata],
     *      name: String
     *  }]
     */
    console.log("Subscriptions")
    let postSets = [{
        posts: testStories,
        name: "Section 1"
    }, {
        posts: testStories,
        name: "Section 2"
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

export default Subscriptions;