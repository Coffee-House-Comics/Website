import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TabType, authType } from '../Common/Types'

export const GlobalStoreContext = createContext({});

const GlobalStoreActionType = {
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    CHANGE_MODAL: "CHANGE_MODAL",
    CHANGE_CONTENT_MODE: "CHANGE_CONTENT_MODE"
}

// Setting up the Global Store
function GlobalStoreContextProvider(props) {
    // Global State

    // Current Path name
    const path = window.location.pathname;

    // The global store/state
    const [store, setStore] = useState({
        app: "comic",
        userId: null,
        isLoggedIn: false,
        modal: null,
        contentMode: "login"
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


    // Store functions

    //Return the context provider

    return (
        <GlobalStoreContext.Provider
            value={{ store }}
        >
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };