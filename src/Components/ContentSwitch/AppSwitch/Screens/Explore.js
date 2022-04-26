import { testStories } from "../../../../App";
import PostsSection from "../../../Cards/PostsSection";
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from "../../../../Store";
import API from "../../../../API";

function Explore() {

    const { store } = useContext(GlobalStoreContext);
    const [recentPosts, setRecentPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);

    async function getPostFromId(id, type) {
        let resp;
        if(store.app === "Comics") {
            resp = (await API.Comic.viewPublished(id)).data;
        }
        else {
            resp = (await API.Story.viewPublished(id)).data;
        }
        if(resp.error) {
            //Post wont be added to post array
            return;
        }

        if(type === "recent") {
            const newRecentPosts = recentPosts.concat(resp.content);
            setRecentPosts(newRecentPosts);
        }

        else  {
            const newPopularPosts = popularPosts.concat(resp.content);
            setPopularPosts(newPopularPosts);
        }
    }

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

            resp.mostRecent.forEach(recentId => getPostFromId(recentId, "recent"));
            resp.mostLiked.forEach(likedId => getPostFromId(likedId, "liked"));
        }
        getExplorePosts();
    }, []);

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