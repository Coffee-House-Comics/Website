import { createContext, useState, useEffect, useRef } from 'react'
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

            case GlobalStoreActionType.CHANGE_CONTENT_MODE: {
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

    store.closeModal = function () {
        if (!store.modal)
            return;

        if (store.modal.specialMode)
            storeReducer({
                type: GlobalStoreActionType.CHANGE_CONTENT_MODE,
            });
        else
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