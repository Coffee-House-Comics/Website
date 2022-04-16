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
    return backend.put('/auth/changePassword', {
        newUserName: newUserName,
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
        newEmail: newEmail,
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
//

export default API;



