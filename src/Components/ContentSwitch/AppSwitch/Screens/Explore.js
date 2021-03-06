import { testStories } from "../../../../App";
import PostsSection from "../../../Cards/PostsSection";
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from "../../../../Store";
import API from "../../../../API";

function Explore() {

    const { store } = useContext(GlobalStoreContext);
    const [recentPosts, setRecentPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);

    // async function getPostFromId(id, type) {
    //     let resp;
    //     try {
    //         if (store.app === "Comics") {
    //             resp = (await API.Comic.viewPublished(id));
    //         }
    //         else {
    //             resp = (await API.Story.viewPublished(id));
    //         }

    //         if (resp.status != 200) {
    //             //Post wont be added to post array
    //             console.log("Error fetching post from id:", id);
    //             console.log(resp.error);
    //             return;
    //         }

    //         if (type === "recent") {
    //             // const newRecentPosts = recentPosts.concat(resp.data.content);
    //             setRecentPosts([...recentPosts, resp.data.content]);
    //         }

    //         else {
    //             const newPopularPosts = popularPosts.concat(resp.data.content);
    //             setPopularPosts(newPopularPosts);
    //         }
    //     }

    //     catch (err) {
    //         console.log(err)
    //     }
    // }

    useEffect(() => {
        async function getExplorePosts() {
            try {
                let resp;
                if (store.app === "Comics") {
                    resp = (await API.Comic.explore());
                }

                else {
                    resp = (await API.Story.explore());
                }

                if (resp.status != 200) {
                    store.createModal({
                        title: "Error fetching explore page",
                        body: "Explore data could not be retrieved. Please try again.",
                        action: ""
                    });
                    return;
                }

                const mostRecent = resp.data.mostRecent;
                const mostLiked = resp.data.mostLiked;

                setRecentPosts(mostRecent);
                setPopularPosts(mostLiked);

                // resp.data.mostRecent.forEach(recentId => getPostFromId(recentId, "recent"));
                // resp.data.mostLiked.forEach(likedId => getPostFromId(likedId, "liked"));
            }

            catch (err) {
                console.log(err);
            }
        }
        getExplorePosts();
    }, []);

    const postSets = [{
        posts: recentPosts,
        name: "Recent Releases"
    }, {
        posts: popularPosts,
        name: "Popular Posts"
    },]

    const postSetsComponents = postSets.map((postSet, index) => {
        return (<PostsSection key={index} posts={postSet.posts} name={postSet.name} />)
    });

    return (
        <div style={{ padding: 40, paddingInline: 25 }}>
            {postSetsComponents}
        </div>
    );
}

export default Explore;