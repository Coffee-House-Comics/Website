import { createContext, useEffect, useState } from "react";
import { authType } from '../Common/Types'

const AuthContext = createContext();

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    SET_LOGGED_IN: 0,
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        state: authType.GUEST
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

export default AuthContext;
export { AuthContextProvider };