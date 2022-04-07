import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import types from '../Common/Types'

import { ContentSwitch, AppSwitch } from '../Components';


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
        app: "comic",
        user: null,
        isLoggedIn: false,
        modal: null,
    });

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // Sets loggedIn to true, sets userId, sets content mode to home
            case GlobalStoreActionType.LOGIN_USER: {
                return setStore({

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