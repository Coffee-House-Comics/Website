import { testStories } from "../../../../App";
import PostsSection from "../../../Cards/PostsSection";
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from "../../../../Store";
import API from "../../../../API";

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

        const newSubscribedPosts = subscribedPosts.concat(resp.content);
        setSubscribedPosts(newSubscribedPosts);
    }

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

            //TODO call async function which makes viewPublished call to get posts based on their ids returned in resp
            await resp.content.forEach(subscribedId => getPostFromId(subscribedId));
            organizePostsByAuthor();
        }
        getSubscriptionPosts();
    }, []);

    return <div>Subscriptions page</div>


    console.log("Subscriptions")

    //Build PostSections
    let postSections = []
    for(let subscriptionSection of subscriptionSections){
        postSections.push(<PostsSection posts={subscriptionSection.posts} name={subscriptionSection.author}/>)
    }

    return (
        <div style={{padding: 40, paddingInline: 25}}>
            {postSections}
        </div>
    );
}

export default Subscriptions;