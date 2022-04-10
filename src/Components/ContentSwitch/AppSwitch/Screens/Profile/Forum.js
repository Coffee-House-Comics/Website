import ForumPost from "../../../../Cards/ForumPost";


export default function Forum(props) {

    let allPosts = [
        {
            heading : "You're comics are awesome!!!",
            beanCount: 5,
            currentVote: 1,
            body: "I love your content!!!",
            author:{
                name: "Jerry"
            },
            comments : [
                {
                    beanCount: 52,
                    currentVote: 1,
                    author: {
                        name: "Bob"
                    },
                    body: "Agreed!"
                },
                {
                    beanCount: -2,
                    currentVote: -1,
                    author: {
                        name: "James"
                    },
                    body: "Wroooooong!"
                },
                {
                    beanCount: 32,
                    currentVote: 0,
                    author: {
                        name: "Bob"
                    },
                    body: "Your wrong!"
                },
                {
                    beanCount: 13,
                    currentVote: 1,
                    author: {
                        name: "James"
                    },
                    body: "You're*** so stupid"
                }
            ]
        },
    
        {
            heading : "You suck!",
            beanCount: -6,
            currentVote: 0,
            body: "Stop making comics!",
            author:{
                name: "Larry"
            },
            comments : [
                {
                    beanCount: 17,
                    currentVote: -1,
                    author: {
                        name: "Tyler"
                    },
                    body: "Be Nice!"
                },
                {
                    beanCount: -3,
                    currentVote: -1,
                    author: {
                        name: "Larry"
                    },
                    body: "YOO SUCK!"
                },
                {
                    beanCount: -1,
                    currentVote: 0,
                    author: {
                        name: "Tyler"
                    },
                    body: ":("
                }
            ]
        },
    
        {
            heading : "Hes mediocre at comics",
            beanCount: 45,
            currentVote: -1,
            body: "^^^^^Title says it all^^^^^",
            author:{
                name: "Morty"
            },
            comments:[]
        },
    
        {
            heading : "This is trash.",
            beanCount: -15,
            currentVote: -1,
            body: "waste of time",
            author:{
                name: "Zack"
            },
            comments : [
                {
                    beanCount: -62,
                    currentVote: 1,
                    author: {
                        name: "Zack"
                    },
                    body: "This isn't even recycling, just pure trash!"
                },
                {
                    beanCount: -21,
                    currentVote: 1,
                    author: {
                        name: "Larry"
                    },
                    body: "Definitly"
                }
            ]
        },
    
        {
            heading : "ThIS is N0t a 5cam p05t",
            beanCount: -6,
            currentVote: 0,
            body: "Whats app for bitcoing 1(234)678-9900",
            author:{
                name: "Meet Kevin"
            },
            comments:[]
        },
    
        {
            heading : "Idk how this forum post thing works....",
            beanCount: 150,
            currentVote: 1,
            body: "They should have programmed this better",
            author:{
                name: "Rico"
            },
            comments : [
                {
                    beanCount: 1003,
                    currentVote: 0,
                    author: {
                        name: "RicoFan4Life"
                    },
                    body: "Rico we loveeee youuu!"
                },
                {
                    beanCount: 347,
                    currentVote: -1,
                    author: {
                        name: "Larry"
                    },
                    body: "Woooooooooo!"
                }
            ]
            
        }
    ]


    const ret = allPosts.map((post, index) =>
    <ForumPost key={index} heading={post.heading} currentVote={post.currentVote} beanCount={post.beanCount} body={post.body} author={post.author} comments={post.comments}>
    </ForumPost>
    );



  return ret;
}