import { PostAdd } from "@mui/icons-material";
import axios from 'axios'
axios.defaults.withCredentials = true;
const AuthAPI = {};


AuthAPI.register = async function (username, pass, email, confirmPass, displayName) {
    /*
        method: POST,
        route: /auth/register
        payload: { userName, pass, confirmPass }    
    */

    const bio = {}; //Initialize bio to be empty when registering
}

AuthAPI.loginUser = async function (email, password) {
    /* 
        method: POST
        route: /auth/login
        Request body: {
            userName: String
            password: String
        }
    */
}

AuthAPI.forgotPassword = async function (userName, email) {
    /* 
        method: post
        route: /auth/forgotPassword
        Request body: {
            userName: String,
            email: String 
        }
    */
}

AuthAPI.logoutUser = async function () {
    /* 
        method: POST
        route: /auth/logout
        Request body: {}
    */
}

AuthAPI.confirmCode = async function () {
    /* 
        method: get
        route: /auth/confirmCode/${id}
        Request body: {}
    */
}

AuthAPI.updateProfile = async function (image, displayName, bio) {
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

AuthAPI.changePassword = async function (oldpass, newpass, confirmnewpass) {
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

AuthAPI.changeUserName = async function (oldUserName, newUserName) {
    /* Chnage Username ------------
        method: put
        route: /auth/changeUserName
        Request body: {
            oldUserName: String,
            newUserName: String
        }
    */
}

// unsubscribe(id) {
//     method: DELETE,
//         route: /comic/
// }

export default AuthAPI



