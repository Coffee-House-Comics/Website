import { testStories } from "../../../../App";
import PostsSection from "../../../Cards/PostsSection";
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from "../../../../Store";
import API from "../../../../API";

function Subscriptions() {

    const { store } = useContext(GlobalStoreContext);

     useEffect(() => {
        async function getSubscriptionPosts() {
            let resp;
            if(store.app === "Comics") {
                resp = (await API.Comic.subscriptions()).data;
            }

            else {
                resp = (await API.Story.subscriptions()).data;
            }

            if(resp.error) {
                store.createModal({
                    title: "Error fetching subscriptions page",
                    body: "Subscriptions data could not be retrieved. Please try again.",
                    action: ""
                });
                return;
            }

            //TODO call async function to get posts based on their ids returned in resp
        }
        getSubscriptionPosts();
    }, []);

    return <div>Subscriptions page</div>


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