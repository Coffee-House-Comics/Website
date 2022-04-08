import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import types from '../Common/Types'

const GlobalStoreContext = createContext({});

const GlobalStoreActionType = {
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    CHANGE_MODAL: "CHANGE_MODAL",
    CHANGE_CONTENT_MODE: "CHANGE_CONTENT_MODE"
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
            // Sets loggedIn to true, sets userId, sets content mode to home
            case GlobalStoreActionType.LOGIN_USER: {
                return setStore({

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

    // Auxilliary Information

    const navigate = useNavigate();

    // Store functions


    store.reRoute = function (fullRoute) {
        console.log("Store reroute:", fullRoute);
        if (fullRoute)
            navigate(fullRoute, { replace: true });
    }


    // Modal Related Functions ------------------------------------
    store.createModal = function (metadata, callback = null) {
        const { title, body, action } = metadata;
        
        const modalInfo = {
            title: title,
            body: body,

            // Supply action with a string if you want an option besides just `close`
            action: action,
            hook: callback
        };

        storeReducer({
            type: GlobalStoreActionType.CHANGE_MODAL,
            payload: modalInfo
        });
    }

    store.closeModal = function () {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_MODAL,
            payload: null
        });
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