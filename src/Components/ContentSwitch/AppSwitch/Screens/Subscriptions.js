import { testStories } from "../../../../App";
import PostsSection from "../../../Cards/PostsSection";
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from "../../../../Store";
import API from "../../../../API";
import { Typography } from '@mui/material'

function Subscriptions() {

    const { store } = useContext(GlobalStoreContext);
    const [subscriptionSections, setSubscriptionSections ] = useState([]);
    const [subscribedPosts, setSubscribedPosts] = useState([]);

    function organizePostsByAuthor() {
        let currAuthors = [];
        let sections = [];
        subscribedPosts.forEach(post => {
            if(currAuthors.includes(post.author)) {
                const index = subscribedPosts.findIndex((element) => element.author == post.author);
                subscribedPosts[index].posts.push(post);
            }
            else {
                sections.push({
                    author: post.author,
                    posts: [post]
                });
                currAuthors.push(post.author);
            }
        });

        setSubscriptionSections(sections);
    }

    async function getPostFromId(id) {
        try {
            let resp;
            if(store.app === "Comics") {
                resp = (await API.Comic.viewPublished(id));
            }
            else {
                resp = (await API.Story.viewPublished(id));
            }
            if(resp.error) {
                //Post wont be added to post array
                return;
            }

            const newSubscribedPosts = subscribedPosts.concat(resp.data.content);
            setSubscribedPosts(newSubscribedPosts);
        }

        catch(err) {
            console.log(err);
        }
    }

     useEffect(() => {
        async function getSubscriptionPosts() {
            try {
                let resp;
                if(store.app === "Comics") {
                    resp = (await API.Comic.subscriptions());
                }

                else {
                    resp = (await API.Story.subscriptions());
                }

                if(resp.error) {
                    store.createModal({
                        title: "Error fetching subscriptions page",
                        body: "Subscriptions data could not be retrieved. Please try again.",
                        action: ""
                    });
                    return;
                }

                //TODO call async function which makes viewPublished call to get posts based on their ids returned in resp
                await resp.data.content.forEach(subscribedId => getPostFromId(subscribedId));
                organizePostsByAuthor();
            }

            catch(err) {
                console.log(err);
            }
        }
        getSubscriptionPosts();
    }, []);

    console.log("Subscriptions")

    //Build PostSections
    let postSections = []
    for(let subscriptionSection of subscriptionSections){
        postSections.push(<PostsSection posts={subscriptionSection.posts} name={subscriptionSection.author}/>)
    }

    return (
        <div style={{padding: 40, paddingInline: 25}}>
            {postSections.length == 0?
                <Typography variant="h5" sx={{ marginBottom: "5px", marginTop: "20px" }}>
                    There are no subscription posts. Try subscribing to a creator!
                </Typography>: 
                {postSections}
            }
        </div>
    );
}

export default Subscriptions;