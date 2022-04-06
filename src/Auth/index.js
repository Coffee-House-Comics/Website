import { createContext, useEffect, useState } from "react";
import types from '../Common/Types'

const AuthContext = createContext();

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
const AuthActionType = {
    SET_LOGGED_IN: 0,
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        state: types.authType.GUEST
    });

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            default:
                return auth;
        };
    }

    auth.getLoggedIn = function () {
        return auth.loggedIn;
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export {
    AuthContext,
    AuthContextProvider
}