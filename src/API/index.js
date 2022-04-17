import axios from 'axios'

// TODO: Set to true once we correct cors on the server to just accept from 
//      coffeehousecomics.com
axios.defaults.withCredentials = false;

const backend = axios.create({
    baseURL: 'https://coffeehousecomics.com',
})

const API = {
    Auth: {},
    Comic: {},
    Story: {}
};


API.Auth.register = function (username, password, email, confirmPassord, displayName) {
    /*
        method: POST,
        route: /auth/register
        payload: { userName, passord, confirmPassord, email, displayName }    
    */

    return backend.post('/auth/register', {
        userName: username,
        password: password,
        email: email,
        confirmPassword: confirmPassord,
        displayName: displayName,
        bio: "I'm gonna be rank one CHC LfG!"
    });
}

API.Auth.loginUser = function (username, password) {
    /* 
        method: POST
        route: /auth/login
        Request body: {
            username: String
            password: String
        }
    */
    return backend.post('/auth/login', {
        userName: username,
        password: password,
    });
}

API.Auth.forgotPassword = function (username, email) {
    /* 
        method: post
        route: /auth/forgotPassword
        Request body: {
            username: String,
            email: String 
        }
    */
    return backend.post('/auth/forgotPassword', {
        userName: username,
        email: email,
    });
}

API.Auth.logoutUser = function () {
    /* 
        method: POST
        route: /auth/logout
        Request body: {}
    */
    return backend.post('/auth/logout', {});
}

API.Auth.confirmCode = function (id) {
    /* 
        method: get
        route: /auth/confirmCode/${id}
        Request body: {}
    */
    return backend.get(`auth/confirmCode/${id}`)
}

API.Auth.updateProfile = function (image, displayName, bio) {
    /* Update Profile ------------
        method: put
        route: /auth/updateProfile
        Request body: {
            image: Image,
            displayName: String,
            bio: String,
        }
    */
    return backend.put('/auth/updateProfile', {
        image: image,
        displayName: displayName,
        bio: bio
    });
}

API.Auth.changePassword = function (oldpass, newpass, confirmnewpass) {
    /* Change Password ------------
        method: put
        route: /auth/changePassword
        Request body: {
            oldPassword: String,
            newPassword: String,
            confirmNewPassword: String,
        }
    */
    return backend.put('/auth/changePassword', {
        oldPassword: oldpass,
        newPassword: newpass,
        confirmNewPassword: confirmnewpass
    });
}

API.Auth.changeUserName = function (newUserName) {
    /* Chnage Username ------------
        method: put
        route: /auth/changeUserName
        Request body: {
            newUserName: String
        }
    */
    return backend.put('/auth/changeUserName', {
        newUserName: newUserName
    });
}

API.Auth.changeEmail = function (newEmail) {
    /* Change Email ------------
       method: put
       route: /auth/changeEmail
       Request body: {
           newEmail: String
       }
   */
    return backend.put('/auth/changeEmail', {
        newEmail: newEmail
    });
}

API.Comic.explore = function () {
    /* Explore Comics ------------
       method: get
       route: /comic/explore
       Request body: {}
   */
    return backend.get('/comic/explore', {});
}

API.Comic.search = function (searchCriteria) {
    /* Search Comics ------------
       method: get
       route: /comic/search
       Request body: {
           searchCriteria: String[]
       }
   */
    return backend.get('/comic/search', {
        searchCriteria: searchCriteria
    });
}

API.Comic.create = function (name, description) {
    /* Create Comic ------------
       method: post
       route: /comic/create
       Request body: {
           name: String,
           description: String
       }
   */
    return backend.get('/comic/create', {
        name: name,
        description: description
    });
}

API.Comic.viewUnpublished = function (id) {
    /* View Unpublished Comics ------------
       method: get
       route: /comic/unpublished/${id}
       Request body: {}
   */
    return backend.get(`/comic/unpublished/${id}`, {});
}

API.Comic.saveContent = function (id, pages) {
    /* Save Comic Content ------------
       method: put
       route: /comic/content/save/${id}
       Request body: {
           pages: JSON[]
       }
   */
    return backend.put(`/comic/content/save/${id}`, {
        pages: pages
    });
}

API.Comic.saveSticker = function (sticker) {
    /* Save Sticker ------------
       method: post
       route: /comic/content/saveSticker
       Request body: {
           sticker: JSON
       }
   */
    return backend.post(`/comic/content/saveSticker`, {
        sticker: sticker
    });
}

API.Comic.editMetadata = function (id, name, description, coverPhoto, series) {
    /* Edit Comic Metadata------------
       method: put
       route: /comic/metadata/update/${id}
       Request body: {
           name: String,
           description: String,
           coverPhoto: String,
           series: String
       }
   */
    return backend.put(`/comic/metadata/update/${id}`, {
        name: name,
        description: description,
        coverPhoto: coverPhoto,
        series: series
    });
}

API.Comic.publish = function (id, series) {
    /* Publish Comic ------------
       method: post
       route: /comic/publish/${id}
       Request body: {
           series: String
       }
   */
    return backend.post(`/comic/publish/${id}`, {
        series: series
    });
}

API.Comic.toggleForum = function () {
    /* Toggle Comic Forum------------
       method: post
       route: /comic/user/toggleForum
       Request body: {}
   */
    return backend.post(`/comic/user/toggleForum`, {});
}

API.Comic.delete = function (id) {
    /* Delete Comic------------
       method: delete
       route: /comic/${id}
       Request body: {}
   */
    return backend.delete(`/comic/${id}`, {});
}

API.Comic.deleteSticker = function (sticker) {
    /* Delete Sticker------------
       method: delete
       route: /comic/sticker
       Request body: {
           sticker: JSON
       }
   */
    return backend.delete(`/comic/sticker`, {
        sticker: sticker
    });
}

API.Comic.bookmark = function (id) {
    /* Bookmark Comic------------
       method: post
       route: /comic/bookmark/${id}
       Request body: {}
   */
    return backend.post(`/comic/bookmark${id}`, {});
}

API.Comic.saved = function () {
    /* Get saved Comics------------
       method: get
       route: /comic/user/saved
       Request body: {}
   */
    return backend.get(`comic/user/saved`, {});
}

API.Comic.viewPublished = function (id) {
    /* View published Comic------------
       method: get
       route: /comic/published/${id}
       Request body: {}
   */
    return backend.get(`/comic/published/${id}`, {});
}

API.Comic.vote = function (id, type) {
    /* Vote on Comic------------
       method: post
       route: /comic/vote/${id}
       Request body: {
           type: String
       }
   */
    return backend.post(`/comic/vote/${id}`, {
        type: type
    });
}

API.Comic.comment = function (id, text) {
    /* Comment on Comic------------
       method: post
       route: /comic/comment/${id}
       Request body: {
           text: String
       }
   */
    return backend.post(`/comic/comment/${id}`, {
        text: text
    });
}

API.Comic.getAllForumPosts = function (id) {
    /* Get all Comic forum posts------------
       method: get
       route: /comic/allForumPosts/${id}
       Request body: {}
   */
    return backend.get(`/comic/allForumPosts/${id}`, {});
}

API.Comic.voteOnForumPost = function (id, type, forumOwnerId) {
    /* Vote on Comic forum posts------------
       method: post
       route: /comic/vote/forumPost/${id}
       Request body: {
           type, String,
           forumOwnerId, Id
       }
   */
    return backend.post(`/comic/vote/forumPost/${id}`, {
        type: type,
        forumOwnerId: forumOwnerId
    });
}

API.Comic.commentOnForumPost = function (id, text, forumOwnerId) {
    /* Comment on Comic forum posts------------
       method: post
       route: /comic/comment/forumPost/${id}
       Request body: {
           text, String,
           forumOwnerId, Id
       }
   */
    return backend.post(`/comic/comment/forumPost/${id}`, {
        text: text,
        forumOwnerId: forumOwnerId
    });
}

API.Comic.voteComment = function (id, type, postId) {
    /* Vote on Comic comment------------
       method: post
       route: /comic/vote/comment/${id}
       Request body: {
           type, String,
           postId, Id
       }
   */
    return backend.post(`/comic/vote/comment/${id}`, {
        type: type,
        postId: postId
    });
}

API.Comic.voteCommentOnForumPost = function (id, type, forumPostId, forumOwnerId) {
    /* Vote on Comic Forum Post comment------------
       method: post
       route: /comic/vote/forumPost/comment/${id}
       Request body: {
           type, String,
           forumPostId, Id,
           forumOwnerId, Id
       }
   */
    return backend.post(`/comic/vote/forumPost/comment/${id}`, {
        type: type,
        forumPostId: forumPostId,
        forumOwnerId: forumOwnerId
    });
}


API.Comic.deleteCommentOnForumPost = function (id, forumPostId, forumOwnerId) {
    /* Delete comment on Comic Forum Post------------
       method: delete
       route: /comic/forumPost/comment/${id}
       Request body: {
           forumPostId, Id,
           forumOwnerId, Id
       }
   */
    return backend.delete(`/comic/forumPost/comment/${id}`, {
        forumPostId: forumPostId,
        forumOwnerId: forumOwnerId
    });
}

API.Comic.viewProfile = function (id) {
    /* View Comic Profile------------
       method: get
       route: /comic/profile/${id}
       Request body: {}
   */
    return backend.get(`/comic/profile/${id}`, {});
}

API.Comic.subscribe = function (id) {
    /* Subscribe to Comic creator------------
       method: post
       route: /comic/subscribe/user/${id}
       Request body: {}
   */
    return backend.post(`/comic/subscribe/user/${id}`, {});
}

API.Comic.createForumPost = function (id, title, body) {
    /* Create Comic Forum Post------------
       method: post
       route: /comic/forumPost/${id}
       Request body: {
           title: String,
           body: String
       }
   */
    return backend.post(`/comic/forumPost/${id}`, {
        title: title,
        body: body
    });
}

API.Comic.subscriptions = function () {
    /* Get Comic subscriptions------------
       method: get
       route: /comic/subscriptions
       Request body: {}
   */
    return backend.get(`/comic/subscriptions`, {});
}

API.Comic.deleteForumPost = function (id, forumUserId) {
    /* Delete Comic Forum Post------------
       method: delete
       route: /comic/forumPost/${id}
       Request body: {
           forumUserId: forumUserId
       }
   */
    return backend.delete(`/comic/forumPost/${id}`, {
        forumUserId: forumUserId
    });
}

API.Comic.deleteComment = function (id, postId) {
    /* Delete Comic Comment------------
       method: delete
       route: /comic/comment/${id}
       Request body: {
           postId: id
       }
   */
    return backend.delete(`/comic/comment/${id}`, {
        postId: postId
    });
}

API.Comic.unsave = function (id) {
    /* unsave Comic------------
       method: delete
       route: /comic/bookmark/${id}
       Request body: {}
   */
    return backend.delete(`/comic/bookmark/${id}`, {});
}

API.Comic.unsubscribe = function (id) {
    /* unsubscribe from Comic creator------------
       method: delete
       route: /comic/subscribe/user/${id}
       Request body: {}
   */
    return backend.delete(`/comic/subscribe/user/${id}`, {});
}

API.Story.explore = function () {
    /* Explore Stories ------------
       method: get
       route: /story/explore
       Request body: {}
   */
    return backend.get('/story/explore', {});
}

API.Story.search = function (searchCriteria) {
    /* Search Stories ------------
       method: get
       route: /story/search
       Request body: {
           searchCriteria: String[]
       }
   */
    return backend.get('/story/search', {
        searchCriteria: searchCriteria
    });
}

API.Story.create = function (name, description) {
    /* Create Story ------------
       method: post
       route: /story/create
       Request body: {
           name: String,
           description: String
       }
   */
    return backend.get('/story/create', {
        name: name,
        description: description
    });
}

API.Story.viewUnpublished = function (id) {
    /* View Unpublished Stories ------------
       method: get
       route: /story/unpublished/{:id}
       Request body: {}
   */
    return backend.get(`/story/unpublished/${id}`, {});
}

API.Story.saveContent = function (id, pages, ReactFlowJSON) {
    /* Save Story Content ------------
       method: put
       route: /story/content/save/${id}
       Request body: {
           pages: JSON[]
       }
   */
    return backend.put(`/story/content/save/${id}`, {
        pages: pages,
        ReactFlowJSON: ReactFlowJSON
    });
}

API.Story.editMetadata = function (id, name, description, coverPhoto, series) {
    /* Edit Story Metadata------------
       method: put
       route: /story/metadata/update/${id}
       Request body: {
           name: String,
           description: String,
           coverPhoto: String,
           series: String
       }
   */
    return backend.put(`/story/metadata/update/${id}`, {
        name: name,
        description: description,
        coverPhoto: coverPhoto,
        series: series
    });
}

API.Story.publish = function (id, series) {
    /* Publish Story ------------
       method: post
       route: /story/publish/${id}
       Request body: {
           series: String
       }
   */
    return backend.post(`/story/publish/${id}`, {
        series: series
    });
}

API.Story.toggleForum = function () {
    /* Toggle Story Forum------------
       method: post
       route: /story/user/toggleForum
       Request body: {}
   */
    return backend.post(`/story/user/toggleForum`, {});
}

API.Story.delete = function (id) {
    /* Delete Story------------
       method: delete
       route: /story/${id}
       Request body: {}
   */
    return backend.delete(`/story/${id}`, {});
}

API.Story.bookmark = function (id) {
    /* Bookmark Story------------
       method: post
       route: /story/bookmark/${id}
       Request body: {}
   */
    return backend.post(`/story/bookmark${id}`, {});
}

API.Story.saved = function () {
    /* Get saved Stories------------
       method: get
       route: /story/user/saved
       Request body: {}
   */
    return backend.get(`story/user/saved`, {});
}

API.Story.viewPublished = function (id) {
    /* View published Story------------
       method: get
       route: /story/published/${id}
       Request body: {}
   */
    return backend.get(`/story/published/${id}`, {});
}

API.Story.vote = function (id, type) {
    /* Vote on Story------------
       method: post
       route: /story/vote/${id}
       Request body: {
           type: String
       }
   */
    return backend.post(`/story/vote/${id}`, {
        type: type
    });
}

API.Story.comment = function (id, text) {
    /* Comment on Story------------
       method: post
       route: /story/comment/${id}
       Request body: {
           text: String
       }
   */
    return backend.post(`/story/comment/${id}`, {
        text: text
    });
}

API.Story.getAllForumPosts = function (id) {
    /* Get all Story forum posts------------
       method: get
       route: /story/allForumPosts/${id}
       Request body: {}
   */
    return backend.get(`/story/allForumPosts/${id}`, {});
}

API.Story.voteOnForumPost = function (id, type, forumOwnerId) {
    /* Vote on Story forum posts------------
       method: post
       route: /story/vote/forumPost/${id}
       Request body: {
           type, String,
           forumOwnerId, Id
       }
   */
    return backend.post(`/story/vote/forumPost/${id}`, {
        type: type,
        forumOwnerId: forumOwnerId
    });
}

API.Story.commentOnForumPost = function (id, text, forumOwnerId) {
    /* Comment on Story forum posts------------
       method: post
       route: /story/comment/forumPost/${id}
       Request body: {
           text, String,
           forumOwnerId, Id
       }
   */
    return backend.post(`/story/comment/forumPost/${id}`, {
        text: text,
        forumOwnerId: forumOwnerId
    });
}

API.Story.voteComment = function (id, type, postId) {
    /* Vote on Story comment------------
       method: post
       route: /story/vote/comment/${id}
       Request body: {
           type, String,
           postId, Id
       }
   */
    return backend.post(`/story/vote/comment/${id}`, {
        type: type,
        postId: postId
    });
}

API.Story.voteCommentOnForumPost = function (id, type, forumPostId, forumOwnerId) {
    /* Vote on Story Forum Post comment------------
       method: post
       route: /story/vote/forumPost/comment/${id}
       Request body: {
           type, String,
           forumPostId, Id,
           forumOwnerId, Id
       }
   */
    return backend.post(`/story/vote/forumPost/comment/${id}`, {
        type: type,
        forumPostId: forumPostId,
        forumOwnerId: forumOwnerId
    });
}

API.Story.deleteCommentOnForumPost = function (id, forumPostId, forumOwnerId) {
    /* Delete comment on Story Forum Post------------
       method: delete
       route: /story/forumPost/comment/${id}
       Request body: {
           forumPostId, Id,
           forumOwnerId, Id
       }
   */
    return backend.delete(`/story/forumPost/comment/${id}`, {
        forumPostId: forumPostId,
        forumOwnerId: forumOwnerId
    });
}

API.Story.viewProfile = function (id) {
    /* View Story Profile------------
       method: get
       route: /story/profile/${id}
       Request body: {}
   */
    return backend.get(`/story/profile/${id}`, {});
}

API.Story.subscribe = function (id) {
    /* Subscribe to Story creator------------
       method: post
       route: /story/subscribe/user/${id}
       Request body: {}
   */
    return backend.post(`/story/subscribe/user/${id}`, {});
}

API.Story.createForumPost = function (id, title, body) {
    /* Create Story Forum Post------------
       method: post
       route: /story/forumPost/${id}
       Request body: {
           title: String,
           body: String
       }
   */
    return backend.post(`/story/forumPost/${id}`, {
        title: title,
        body: body
    });
}

API.Story.subscriptions = function () {
    /* Get Story subscriptions------------
       method: get
       route: /story/subscriptions
       Request body: {}
   */
    return backend.get(`/story/subscriptions`, {});
}

API.Story.deleteForumPost = function (id, forumUserId) {
    /* Delete Story Forum Post------------
       method: delete
       route: /story/forumPost/${id}
       Request body: {
           forumUserId: forumUserId
       }
   */
    return backend.delete(`/story/forumPost/${id}`, {
        forumUserId: forumUserId
    });
}

API.Story.deleteComment = function (id, postId) {
    /* Delete Story Comment------------
       method: delete
       route: /story/comment/${id}
       Request body: {
           postId: id
       }
   */
    return backend.delete(`/story/comment/${id}`, {
        postId: postId
    });
}

API.Story.unsave = function (id) {
    /* unsave Story------------
       method: delete
       route: /story/bookmark/${id}
       Request body: {}
   */
    return backend.delete(`/story/bookmark/${id}`, {});
}

API.Story.unsubscribe = function (id) {
    /* unsubscribe from Story creator------------
       method: delete
       route: /story/subscribe/user/${id}
       Request body: {}
   */
    return backend.delete(`/story/subscribe/user/${id}`, {});
}

//

export default API;



