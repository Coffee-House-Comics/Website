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


API.Auth.register = function (username, pass, email, confirmPass, displayName) {
    /*
        method: POST,
        route: /auth/register
        payload: { userName, pass, confirmPass }    
    */

    return backend.post('/auth/register', {
        userName: username,
        password: pass,
        email: email,
        confirmPassword: confirmPass,
        displayName: displayName,
        bio: "This User prefers to keep things mysterious..."
    });
}

API.Auth.loginUser = function (email, password) {
    /* 
        method: POST
        route: /auth/login
        Request body: {
            userName: String
            password: String
        }
    */
}

API.Auth.forgotPassword = function (userName, email) {
    /* 
        method: post
        route: /auth/forgotPassword
        Request body: {
            userName: String,
            email: String 
        }
    */
}

API.Auth.logoutUser = function () {
    /* 
        method: POST
        route: /auth/logout
        Request body: {}
    */
}

API.Auth.confirmCode = function () {
    /* 
        method: get
        route: /auth/confirmCode/${id}
        Request body: {}
    */
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
}

API.Auth.changeUserName = function (newUserName) {
    /* Chnage Username ------------
        method: put
        route: /auth/changeUserName
        Request body: {
            newUserName: String
        }
    */
}

// unsubscribe(id) {
//     method: DELETE,
//         route: /comic/
// }

export default API;



