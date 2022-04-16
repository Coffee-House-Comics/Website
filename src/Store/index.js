import { Global } from '@emotion/react';
import { RepeatOneSharp, StoreTwoTone } from '@mui/icons-material';
import { createContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import types from '../Common/Types';

import API from '../API';
const AuthAPI = API.Auth;


const GlobalStoreContext = createContext({});

const GlobalStoreActionType = {
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    CHANGE_MODAL: "CHANGE_MODAL",
    CHANGE_APP: "CHANGE_APP"
}

// Setting up the Global Store
function GlobalStoreContextProvider(props) {
    // Global State

    // The global store/state
    const [store, setStore] = useState({
        app: "Comics",
        user: null,
        isLoggedIn: false,
        modal: null
    });

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // Sets loggedIn to true, sets userId
            case GlobalStoreActionType.LOGIN_USER: {
                return setStore({
                    app: store.app,
                    user: payload,
                    isLoggedIn: true,
                    modal: null
                });
            }

            case GlobalStoreActionType.LOGOUT_USER: {
                return setStore({
                    app: store.app,
                    user: null,
                    isLoggedIn: false,
                    modal: null
                })
            }

            case GlobalStoreActionType.CHANGE_APP: {
                return setStore({
                    app: (store.app === "Comics") ? "Stories" : "Comics",
                    user: store.user,
                    isLoggedIn: store.isLoggedIn,
                    modal: null
                });
            }


            case GlobalStoreActionType.CHANGE_MODAL: {
                return setStore({
                    app: store.app,
                    user: store.user,
                    isLoggedIn: store.isLoggedIn,
                    modal: payload
                });
            }

            default:
                return store;
        }
    }

    const ref = useRef(store);

    // Auxilliary Information

    const navigate = useNavigate();

    // Store functions
    store.switchAppMode = function () {
        const singularOpp = (store.app === "Comics") ? "Story" : "Comic";
        const metadata = {
            title: "Are you sure you want to switch to " + singularOpp + " Café?",
            body: "You may be redirected to a different page.",
            action: "Yeah, switch!"
        }

        store.createModal(metadata, function () {
            store.reRoute("/");
        }, true);
    }

    store.reRoute = function (fullRoute) {
        console.log("Store reroute:", fullRoute);
        if (fullRoute)
            navigate(fullRoute);
    }

    store.newContent = function () {
        const route = (store.app === "Comics") ?
            types.TabType.CREATION.children.COMIC.fullRoute :
            types.TabType.CREATION.children.STORY.fullRoute;

        store.reRoute(route);
    }


    // Modal Related Functions ------------------------------------
    store.createModal = function (metadata, callback = null, specialMode = false) {
        const { title, body, action } = metadata;

        const modalInfo = {
            title: title,
            body: body,

            // Supply action with a string if you want an option besides just `close`
            action: action,
            hook: callback,
            specialMode: specialMode
        };

        storeReducer({
            type: GlobalStoreActionType.CHANGE_MODAL,
            payload: modalInfo
        });
    }

    store.closeModal = function (special) {
        if (!store.modal)
            return;

        if (store.modal.specialMode && special)
            storeReducer({
                type: GlobalStoreActionType.CHANGE_APP,
            });
        else
            storeReducer({
                type: GlobalStoreActionType.CHANGE_MODAL,
                payload: null
            });
    }

    //AUTH related functions ------------------------------------

    store.login = async function(loginInfo) {
        const { email, password } = loginInfo;

        const response = await AuthAPI.loginUser(email, password);

        if(response.status === 200) {
            console.log("Logged in!")
            storeReducer({
                type: GlobalStoreActionType.LOGIN_USER,
                payload: response.data.id
            });
            store.reRoute(types.TabType.APP.children.EXPLORE.fullRoute);
        }

        else {
            console.log("Not logged in :/");
            store.createModal({
                title: "Error logging in",
                body: "You could not be logged in. Please try again.",
                action: ""
            });
        }
    }

    store.logout = async function() {
        const response = await AuthAPI.logoutUser();

        if(response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.LOGOUT_USER,
                payload: null
            });
            store.reRoute(types.TabType.AUTH.fullRoute);
        } 

        else {
            store.createModal({
                title: "Error logging out",
                body: "You could not be logged out. Please try again.",
                action: ""
            });
        }
    }

    store.register = async function(registerInfo) {
        const { firstName, lastName, username, email, password, confirmPass } = registerInfo; //Do fitst, last, email get used?

        const displayName = firstName + " " + lastName;

        const response = await AuthAPI.register(username, password, email, confirmPass, displayName);

        if(response.status === 200) {
            //User is not logged in until they confirm email
            console.log("Registering a success");
            store.reRoute(types.TabType.DEFAULT.fullRoute);
        }
        else {
            const errorMessage = response.data.error;
            store.createModal({
                title: "Error registering",
                body: errorMessage + ". Please try again.",
                action: ""
            });
        } 
    }

    store.forgotPassword = async function(forgotPasswordInfo) {

        const {username, email} = forgotPasswordInfo;

        const response = await AuthAPI.forgotPassword(username, email);

        if(response.status === 200) {
            //Create modal to confirm success
            store.createModal({
                title: "Password reset successfully",
                body: "Check your email for a temporary password to use. Most emails arrive within a few minutes",
                action: ""
            });
        }
        else {
            const errorMessage = response.data.error;
            store.createModal({
                title: "Password reset error",
                body: errorMessage,
                action: ""
            });
        } 

    }

    store.changeUsername = async function(newUsername) {

        //Provide new username to request
        const response = await AuthAPI.changeUsername(newUsername);

        if(response.status === 200) {
            //Create modal to confirm success
            store.createModal({
                title: "Username change",
                body: "Your username has been successfully changed!",
                action: ""
            });
        }
        else {
            const errorMessage = response.data.error;
            store.createModal({
                title: "Error changing username",
                body: errorMessage,
                action: ""
            });
        } 
    }

    store.changePassword = async function(passwordInfo) {
        const {oldPassword, newPassword, confirmNewPass} = passwordInfo;

        const response = await AuthAPI.changePassword(oldPassword, newPassword, confirmNewPass);

        if(response.status === 200) {
            //Create modal to confirm success
            store.createModal({
                title: "Password change",
                body: "Your password has been successfully changed!",
                action: ""
            });
        }

        else {
            const errorMessage = response.data.error;
            store.createModal({
                title: "Error changing password",
                body: errorMessage,
                action: ""
            });
        }
    }


    //Return the context provider

    return (
        <GlobalStoreContext.Provider
            value={{ store }}
        >
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export {
    GlobalStoreContext,
    GlobalStoreContextProvider
}