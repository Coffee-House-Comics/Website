import { createContext, useState, useEffect } from 'react'
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
        contentMode: TabType.LOGIN //login, home
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

    // Once the state changes, now actually change the tab
    useEffect(() => {
        // Change the Page
        switch (store.contentMode) {
            case TabType.HOME:
                navigate(TabType.HOME.route);
                break;
            case TabType.LOGIN:
                navigate(TabType.LOGIN.route);
                break;
            default:
        }
    }, [store.contentMode, navigate]);

    // Sets the current tab by changing the tab state variable
    //      This does not actually change the route, instead the useEffect function
    //      above does the actual routing once the state changes.
    store.setTab = function (tab) {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_CONTENT_MODE,
            payload: tab
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

export default GlobalStoreContext;
export { GlobalStoreContextProvider };