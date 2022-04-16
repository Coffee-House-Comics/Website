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


API.Auth.register = function (username, password, email, confirmPassord, displayName, bio) {
    /*
        method: POST,
        route: /auth/register
        payload: { userName, passord, confirmPassord, email, displayName, bio }    
    */

    return backend.post('/auth/register', {
        userName: username,
        password: password,
        email: email,
        confirmPassword: confirmPassord,
        displayName: displayName,
        bio: bio
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

// unsubscribe(id) {
//     method: DELETE,
//         route: /comic/
// }

export default API;



