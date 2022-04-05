import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TabType, authType } from '../Common/Types'

export const HomeStoreContext = createContext({});

const HomeStoreActionType = {
    CHANGE_CONTENT_MODE: "CHANGE_CONTENT_MODE"
}

//Setting up the Home Store
function HomeStoreContextProvider(props) {
    // Current Path name
    const path = window.location.pathname;

    // The global store/state
    const [store, setStore] = useState({
        contentMode: TabType.EXPLORE //"explore", "profile", "viewing"
    });

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case HomeStoreActionType.CHANGE_CONTENT_MODE: {
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
            case TabType.EXPLORE:
                navigate(TabType.HOME.EXPLORE);
                break;
            case TabType.PROFILE:
                navigate(TabType.PROFILE.route);
                break;
            case TabType.CONTENT:
                navigate(TabType.CONTENT.route);
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