import { Global } from '@emotion/react';
import { RepeatOneSharp, StoreTwoTone } from '@mui/icons-material';
import { createContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import types from '../Common/Types';
import AuthAPI from '../API';

const GlobalStoreContext = createContext({});

const GlobalStoreActionType = {
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    CHANGE_MODAL: "CHANGE_MODAL",
    CHANGE_APP: "CHANGE_APP"
}

const AuthActionType = {
    SET_LOGGED_IN: 0,
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
            navigate(fullRoute, { replace: true });
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

    //AUTH related functions

    store.login = async function(loginInfo) {
        const { email, password } = loginInfo;

        const response = await AuthAPI.loginUser(email, password);

        if(response.status == 200) {
            storeReducer({
                type: GlobalStoreActionType.LOGIN_USER,
                payload: response.data.id
            });
            store.reRoute(types.TabType.APP.children.EXPLORE.fullRoute);
        }

        else {
            store.createModal({
                title: "Error logging in",
                body: "You could not be logged in. Please try again.",
                action: ""
            });
        }
    }

    store.logout = async function() {
        const response = await AuthAPI.logoutUser();

        if(response.status == 200) {
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
        const { firstName, lastName, username, email, password, confirmPassword } = registerInfo; //Do fitst, last, email get used?

        const displayName = firstName + " " + lastName;

        const response = await AuthAPI.register(username, password, email, confirmPassword, displayName);

        if(response.status == 200) {
            //User is not logged in until they confirm email
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

    store.forgotPassword = async function() {

    }

    store.changeUsername = async function(newUsername) {

    }

    store.changePassword = async function(newPassword) {

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