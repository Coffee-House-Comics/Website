import { testStories } from "../../../../App";
import PostsSection from "../../../Cards/PostsSection";
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from "../../../../Store";
import API from "../../../../API";
import { Typography } from '@mui/material'

function Subscriptions() {

    const { store } = useContext(GlobalStoreContext);
    const [subscriptionSections, setSubscriptionSections] = useState([]);
    const [subscribedPosts, setSubscribedPosts] = useState([]);

    function organizePostsByAuthor() {
        let currAuthors = [];
        let sections = [];
        subscribedPosts.forEach(post => {
            if (currAuthors.includes(post.author)) {
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
            if (store.app === "Comics") {
                resp = (await API.Comic.viewPublished(id));
            }
            else {
                resp = (await API.Story.viewPublished(id));
            }
            if (resp.error) {
                //Post wont be added to post array
                return;
            }

            const newSubscribedPosts = subscribedPosts.concat(resp.data.content);
            setSubscribedPosts(newSubscribedPosts);
        }

        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        async function getSubscriptionPosts() {
            try {
                let resp;
                if (store.app === "Comics") {
                    resp = (await API.Comic.subscriptions());
                }

                else {
                    resp = (await API.Story.subscriptions());
                }

                if (resp.error) {
                    store.createModal({
                        title: "Error fetching subscriptions page",
                        body: "Subscriptions data could not be retrieved. Please try again.",
                        action: ""
                    });
                    return;
                }

                // console.log("Subscription response:", resp);
                console.log("Subscription data:", resp.data.content);

                setSubscriptionSections(resp.data.content);
            }

            catch (err) {
                console.log(err);
            }
        }
        getSubscriptionPosts();
    }, []);

    console.log("Subscriptions:", subscriptionSections)

    //Build PostSections
    const postSections = subscriptionSections.map((subscriptionSection, index) => {
        return (<PostsSection key={index} posts={subscriptionSection.posts} name={subscriptionSection.author} />);
    })

    return (
        <div style={{ padding: 40, paddingInline: 25 }}>
            {postSections.length === 0 ?
                <Typography variant="h5" sx={{ marginBottom: "5px", marginTop: "20px" }}>
                    There are no subscription posts. Try subscribing to a creator!
                </Typography> :
                <div>
                    {postSections}
                </div>
            }
        </div>
    );
}

export default Subscriptions;