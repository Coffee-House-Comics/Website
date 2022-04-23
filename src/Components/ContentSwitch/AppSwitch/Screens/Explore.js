import { testStories } from "../../../../App";
import PostsSection from "../../../Cards/PostsSection";
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from "../../../../Store";
import API from "../../../../API";

function Explore() {

    const { store } = useContext(GlobalStoreContext);
    const [recentPosts, setRecentPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);

    useEffect(() => {
        async function getExplorePosts() {
            let resp;
            if(store.app === "Comics") {
                resp = (await API.Comic.explore()).data;
            }

            else {
                resp = (await API.Story.explore()).data;
            }

            if(resp.error) {
                store.createModal({
                    title: "Error fetching explore page",
                    body: "Explore data could not be retrieved. Please try again.",
                    action: ""
                });
                return;
            }

            setRecentPosts(resp.mostRecent);
            setPopularPosts(resp.mostLiked);
        }
    })

    let postSets = [{
        posts: recentPosts,
        name: "Recent Releases"
    }, {
        posts: popularPosts,
        name: "Popular Posts"
    },]

    //Build PostSections
    let postSections = []
    let index = 0;
    for(let postSet of postSets){
        postSections.push(<PostsSection key={index++} posts={postSet.posts} name={postSet.name}/>)
    }

    return (
        <div style={{padding: 40, paddingInline: 25}}>
            {postSections}
        </div>
    );
}

export default Explore;