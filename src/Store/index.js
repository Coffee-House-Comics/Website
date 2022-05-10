import { createContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import types from '../Common/Types';

import API from '../API';
const AuthAPI = API.Auth;


const GlobalStoreContext = createContext({});

const GlobalStoreActionType = {
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    CHANGE_MODAL: "CHANGE_MODAL",
    CHANGE_APP: "CHANGE_APP",
    TOGGLE_LOADING: "TOGGLE_LOADING",
    UPDATE_USER: "UPDATE_USER",
    TOGGLE_FORUM: "TOGGLE_FORUM"
}

// Setting up the Global Store
function GlobalStoreContextProvider(props) {
    // Global State

    // The global store/state
    const [store, setStore] = useState({
        app: JSON.parse(window.localStorage.getItem('app')) || "Comics",
        user: null,
        isLoggedIn: false,
        modal: null,
        isEditing: false,
        loading: false,
        trigger: false
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
                    modal: null,
                    loading: store.loading,
                    trigger: store.trigger
                });
            }

            case GlobalStoreActionType.LOGOUT_USER: {
                return setStore({
                    app: store.app,
                    user: null,
                    isLoggedIn: false,
                    modal: null,
                    loading: store.loading,
                    trigger: store.trigger
                })
            }

            case GlobalStoreActionType.CHANGE_APP: {
                return setStore({
                    app: (store.app === "Comics") ? "Stories" : "Comics",
                    user: store.user,
                    isLoggedIn: store.isLoggedIn,
                    modal: null,
                    loading: store.loading,
                    trigger: store.trigger
                });
            }


            case GlobalStoreActionType.CHANGE_MODAL: {
                return setStore({
                    app: store.app,
                    user: store.user,
                    isLoggedIn: store.isLoggedIn,
                    modal: payload,
                    loading: store.loading,
                    trigger: store.trigger
                });
            }

            case GlobalStoreActionType.TOGGLE_LOADING: {
                return setStore({
                    app: store.app,
                    user: store.user,
                    isLoggedIn: store.isLoggedIn,
                    modal: store.modal,
                    loading: !store.loading,
                    trigger: store.trigger
                });
            }

            case GlobalStoreActionType.UPDATE_USER: {
                return setStore({
                    app: store.app,
                    user: payload,
                    isLoggedIn: store.isLoggedIn,
                    modal: store.modal,
                    loading: store.loading,
                    trigger: true,
                });
            }

            case GlobalStoreActionType.TOGGLE_FORUM: {
                const new_user = store.user;

                if (store.app === 'Comics')
                    new_user.storyForum = payload;
                else
                    new_user.comicForum = payload;

                return setStore({
                    app: store.app,
                    user: new_user,
                    isLoggedIn: store.isLoggedIn,
                    modal: store.modal,
                    loading: store.loading,
                    trigger: true,
                });
            }

            default:
                return store;
        }
    }

    // Auxilliary Information

    const navigate = useNavigate();
    // const location = useLocation();

    // On load lets start the session if possible
    useEffect(function () {
        async function startupHelper() {
            try {
                const response = await AuthAPI.currentProfile();

                if (response.status === 200) {
                    console.log("Logged in with user:", response.data, response.data.id);
                    storeReducer({
                        type: GlobalStoreActionType.LOGIN_USER,
                        // Set the whole user TODO: maybe reduce to id???
                        payload: response.data
                    });

                    // Allow the route to wherever we wanted to go
                    return;
                }
            }
            catch (err) {
                /* Do nothing - pass error down */
            }

            console.log("We didnt have a session...");
        }

        startupHelper();
    }, []);

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => { ref.current = value });

        return ref.current
    }

    const useLocationChange = (action) => {
        const location = useLocation()
        const prevLocation = usePrevious(location)
        useEffect(() => {
            action(location, prevLocation)
        }, [location])
    }

    useLocationChange((location, prevLocation) => {
        if (!prevLocation || !location)
            return;

        console.log('changed from', prevLocation.pathname, 'to', location.pathname)

        if (location.pathname !== prevLocation.pathname)
            store.reRoute(location.pathname);
    })

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
    };

    store.isUserSubscribed = function (userID) {
        console.log("Getting if user is subscribed:", userID, store.user.comicSubscriptions, store.user.storySubscriptions);

        if (!store.user || !store.user.comicSubscriptions || !store.user.storySubscriptions)
            return false;

        console.log("Searching...");

        const whichSub = (store.app === 'Comics') ? store.user.comicSubscriptions : store.user.storySubscriptions;

        const reduced = whichSub.filter(elem => {
            return elem === userID;
        })

        console.log("RES:", reduced, reduced.length);

        return reduced.length > 0;
    };

    store.subscribeToUser = async function (subscribed, userID) {
        if (!store.user)
            return false;

        try {
            let res = null;
            if (store.app === 'Comics') {
                res = (subscribed) ? await API.Comic.subscribe(userID) : await API.Comic.unsubscribe(userID);
            }
            else {
                res = (subscribed) ? await API.Story.subscribe(userID) : await API.Story.unsubscribe(userID);
            }

            if (res.status === 200) {
                const response2 = await AuthAPI.currentProfile(store.user.id)

                if (response2.status === 200) {
                    store.updateUser(response2.data);
                    store.reRoute(types.TabType.APP.children.SUBSCRIPTIONS.fullRoute);
                    return true;
                }
            }
        }
        catch (err) { console.error("Error subscribing to user:", err) }

        return false;
    }

    store.triggerUserRefresh = async function () {
        console.log("Refreshing the user...");

        try {
            const response = await AuthAPI.currentProfile();

            if (response.status === 200) {
                console.log("Logged in with user:", response.data, response.data.id);
                storeReducer({
                    type: GlobalStoreActionType.LOGIN_USER,
                    payload: response.data
                });

                // Allow the route to wherever we wanted to go
                // Do not change any route
                return;
            }
        }
        catch (err) {
            /* Do nothing - pass error down */
        }

        console.log("Trouble refreshing the user...");
    }

    store.reRoute = function (fullRoute, id) {
        console.log("Store reroute:", fullRoute);
        fullRoute = "" + fullRoute;
        if (fullRoute.indexOf(':id') !== -1 && id) {
            console.log("replacing id...");
            let modifiedRoute = fullRoute.slice(0, fullRoute.length - 3);
            console.log(modifiedRoute);
            modifiedRoute = "" + modifiedRoute + id;
            console.log(modifiedRoute);
            fullRoute = modifiedRoute;
        }

        if (fullRoute) {
            console.log("Navigating to ");
            navigate(fullRoute);
        }
    }

    store.newContent = async function () {
        console.log("Trying to create a comic (or story lol)");

        // Create the comic/story on the backend
        if (store.app === "Comics") {
            console.log("Creating a Comic");

            try {
                // Get the id via an api call
                const response = await API.Comic.create("Untitled", "A mysterious comic this must be...");

                if (response.status === 200) {
                    console.log("ID of the new Comic:", response.data, response.data.id);

                    store.reRoute(types.TabType.CREATION.children.COMIC.fullRoute, response.data.id);
                    return;
                }
            }
            catch (err) { }

            // Reach here only on error
            store.createModal({
                title: "Error!",
                body: "There was an error creating the comic."
            });
        }
        else {
            console.log("Creating a Story");

            try {
                // Get the id via an api call
                const response = await API.Story.create("Untitled", "A mysterious story this must be...");
                console.log("response: ", response)

                if (response.status === 200) {
                    console.log("ID of the new Story:", response.data, response.data.id);

                    store.reRoute(types.TabType.CREATION.children.STORY.fullRoute, response.data.id);
                    return;
                }
            }
            catch (err) { }

            // Reach here only on error
            store.createModal({
                title: "Error!",
                body: "There was an error creating the story."
            });
        }
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

        if (store.modal.specialMode && special) {
            window.localStorage.setItem('app', JSON.stringify((store.app === "Comics") ? "Stories" : "Comics"));
            storeReducer({
                type: GlobalStoreActionType.CHANGE_APP,
            });
        }
        else
            storeReducer({
                type: GlobalStoreActionType.CHANGE_MODAL,
                payload: null
            });
    }

    store.toggleLoading = function () {
        storeReducer({
            type: GlobalStoreActionType.TOGGLE_LOADING,
        });
    }

    store.updateLocalUser = async function () {
        console.log("Updating local user...");
        try {
            const response2 = await AuthAPI.getProfile(store.user.id)

            if (response2.status === 200) {
                store.updateUser(response2.data);
                return;
            }            
        }
        catch (err){
            console.log("ulu:", updateLocalUser);
        }
        
        console.log("Error updating local user");
    }


    store.changeProfileImage = async function (image) {
        try {
            const response = await AuthAPI.updateProfile(image, store.user.displayName, store.user.bio);

            if (response.status === 200) {
                try {
                    const response2 = await AuthAPI.getProfile(store.user.id)

                    if (response2.status === 200)
                        store.updateUser(response2.data);
                    return;
                }
                catch (err) { }
            }
        }
        catch (err) { }

        console.log("Error updating the image");
    }

    store.updateUser = function (newUser) {
        console.log("Store update user: ", newUser);
        storeReducer({
            type: GlobalStoreActionType.UPDATE_USER,
            payload: newUser
        });
    }

    useEffect(function () {
        if (store.trigger === true) {
            store.reRoute(types.TabType.APP.children.PROFILE.fullRoute, store.user.id);
        }
    }, [store.trigger]);

    store.getMyId = function () {
        if (store.user && store.user.id) {
            return store.user.id;
        }

        // The case of not being logged in.
        return -1;
    }

    //AUTH related functions ------------------------------------

    // Once the state logged in stuff is complete - run this code
    // useEffect(function () {
    //     if (store.isLoggedIn === true) {
    //         console.log("Logged in...");
    //         store.reRoute(types.TabType.APP.children.EXPLORE.fullRoute);
    //     }
    //     else {
    //         console.log("Logging out...");
    //     }
    // }, [store.isLoggedIn]);

    store.login = async function (loginInfo) {
        console.log("Store login function...");
        const { username, password } = loginInfo;

        try {
            store.toggleLoading()
            const response = await AuthAPI.loginUser(username, password);
            store.toggleLoading()

            if (response.status === 200) {
                console.log("Logged in with user:", response.data, response.data.id);
                storeReducer({
                    type: GlobalStoreActionType.LOGIN_USER,
                    // Set the whole user TODO: maybe reduce to id???
                    payload: response.data
                });
                store.reRoute(types.TabType.APP.children.EXPLORE.fullRoute);
                return;
            }
        }
        catch (err) {
            /* Do nothing - pass error down */
        }

        console.log("Not logged in :/");
        store.createModal({
            title: "Error logging in",
            body: "You could not be logged in. Please try again.",
            action: ""
        });
    }

    store.logout = async function () {

        try {
            store.toggleLoading()
            const response = await AuthAPI.logoutUser();
            store.toggleLoading()

            if (response.status === 200) {
                storeReducer({
                    type: GlobalStoreActionType.LOGOUT_USER,
                    payload: null
                });
                store.reRoute(types.TabType.AUTH.children.LOGIN.fullRoute);
                return;
            }
        }
        catch (err) {
            /* Do nothing here...pass error down */
        }

        store.createModal({
            title: "Error logging out",
            body: "You could not be logged out. Please try again.",
            action: ""
        });
    }

    store.register = async function (registerInfo) {
        const { firstName, lastName, username, email, password, confirmPass } = registerInfo; //Do fitst, last, email get used?

        const displayName = firstName + " " + lastName;

        try {
            store.toggleLoading()
            const response = await AuthAPI.register(username, password, email, confirmPass, displayName);
            store.toggleLoading()
            if (response.status === 200) {
                //User is not logged in until they confirm email
                console.log("Registering a success");
                store.createModal({
                    title: "Register Sucessful",
                    body: "Check your email to confirm your account. Most emails arrive within a few minutes",
                    action: "Continue to login"
                }, function () {
                    store.reRoute(types.TabType.AUTH.children.LOGIN.fullRoute);
                });

                return;
            }
        }
        catch (err) {
            /* Do nothing here...pass error down */
        }

        store.createModal({
            title: "Error registering",
            body: "Please try again.",
            action: ""
        });
    }

    store.forgotPassword = async function (forgotPasswordInfo) {
        const { username, email } = forgotPasswordInfo;

        try {
            const response = await AuthAPI.forgotPassword(username, email);

            if (response.status === 200) {
                //Create modal to confirm success
                store.createModal({
                    title: "Password reset successfully",
                    body: "Check your email for a temporary password to use. Most emails arrive within a few minutes",
                    action: ""
                });

                store.reRoute(types.TabType.AUTH.children.LOGIN.fullRoute);
                return;
            }
        }
        catch (err) { }

        store.createModal({
            title: "Password reset error",
            body: "Server error in reseting the password",
            action: ""
        });
    }

    store.changeUsername = async function (newUsername) {

        //Provide new username to request
        console.log("Changeing user store");

        try {
            const response = await AuthAPI.changeUserName(newUsername);

            if (response.status === 200) {
                //Create modal to confirm success
                store.createModal({
                    title: "Username change",
                    body: "Your username has been successfully changed!",
                    action: ""
                });
                return;
            }
        }
        catch (err) { }

        store.createModal({
            title: "Error changing username",
            body: "Error when trying to change username",
            action: ""
        });
    }

    store.changePassword = async function (passwordInfo) {
        const { oldPassword, newPassword, confirmNewPass } = passwordInfo;

        try {
            const response = await AuthAPI.changePassword(oldPassword, newPassword, confirmNewPass);

            if (response.status === 200) {
                //Create modal to confirm success
                store.createModal({
                    title: "Password change",
                    body: "Your password has been successfully changed!",
                    action: ""
                });
                return;
            }
        }
        catch (err) { }

        store.createModal({
            title: "Error changing password",
            body: "",
            action: ""
        });
    }

    store.changeEmail = async function (newEmail) {
        try {
            const response = await AuthAPI.changeEmail(newEmail);

            if (response.status === 200) {
                //Create modal to confirm success
                store.createModal({
                    title: "Email change",
                    body: "Your email has been successfully changed!",
                    action: ""
                });
                return;
            }
        }
        catch (err) { }

        store.createModal({
            title: "Error changing email",
            body: "",
            action: ""
        });
    }

    store.toggleForum = async function () {
        try {
            let response;

            if (store.app === 'Comics')
                response = await API.Comic.toggleForum();
            else
                response = await API.Story.toggleForum();

            console.log("Toggle forum response: ", response.status, response.data);

            if (response.status === 200) {
                const response2 = await API.Comic.getProfile(store.user.id)

                if (response2.status === 200) {
                    store.updateUser(response2.data);
                    return;
                }
            }
        }
        catch (err) {
            console.log("Error trying to toggle forum: ", err);
        }

        store.createModal({
            title: "Error toggling forum"
        });
    }

    store.changeDisplayName = async function (newDisplayName) {
        try {
            const response = await AuthAPI.updateProfile(store.user.profileImage, newDisplayName, store.user.bio)

            if (response.status === 200) {
                try {
                    const response2 = await AuthAPI.currentProfile(store.user.id)

                    if (response2.status === 200) {
                        store.updateUser(response2.data);
                        return;
                    }
                }
                catch (err) {
                    /* Do nothing - pass error down */
                }
            }
        }
        catch (err) {
            /* Do nothing - pass error down */
        }
    }

    store.changeBio = async function (newBio) {
        try {
            const response = await AuthAPI.updateProfile(store.user.profileImage, store.user.displayName, newBio)

            if (response.status === 200) {
                try {
                    const response2 = await AuthAPI.currentProfile(store.user.id)

                    if (response2.status === 200)
                        store.updateUser(response2.data);
                    return;
                }
                catch (err) {
                    /* Do nothing - pass error down */
                }
            }
        }
        catch (err) {
            /* Do nothing - pass error down */
        }
    }

    store.fetchProfile = async function (id) {
        try {
            const response = await API.Comic.viewProfile(id);

            if (response.status === 200) {
                console.log("Response:", response);

                return response.data;
            }
        }
        catch (err) { }

        // Give this default title
        return ({
            id: -1,
            displayName: "Profile does not exist",
            bio: "This user does not exist.",
            profileImage: null,

            storyBeans: 0,
            comicBeans: 0,
        });
    }

    store.fetchForumPosts = async function (id) {
        console.log("Trying to fetch the forum posts for user with id:", id);

        try {
            const response = (store.app === 'Comics') ?
                await API.Comic.getAllForumPosts(id) :
                await API.Story.getAllForumPosts(id);

            if (response.status === 200) {
                return response.data;
            }
        }
        catch (err) { }

        store.createModal({
            title: "Error fetching the forum posts"
        });

        return null;
    }

    store.createForumPost = async function (idOfForumOwner, title, body) {
        console.log("Trying to create forum post:", idOfForumOwner, title, body);

        try {
            const res = (store.app === 'Comics') ?
                await API.Comic.createForumPost(idOfForumOwner, title, body) :
                await API.Story.createForumPost(idOfForumOwner, title, body);

            if (res.status === 200) {
                console.log("Success creating forum post");
                return true;
            }
        }
        catch (err) { }

        console.error("Error creating a forum post");

        return null;
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