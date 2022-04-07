// Each Type has its own enumeration

const types = {};

// Tab Type - Information associated with each tab
types.TabType = {
    AUTH: {
        name: "Auth",
        route: "auth",
        fullRoute: "/auth",

        children: {
            REGISTER: {
                name: "Register",
                route: "register",
                fullRoute: "/auth/register",
            },
            LOGIN: {
                name: "Login",
                route: "login",
                fullRoute: "/auth/login"
            },
            FORGOTPASSWORD: {
                name: "Forgot Password",
                route: "forgot-password",
                fullRoute: "/auth/forgot-password"
            },
            RESETPASSWORD: {
                name: "Reset Password",
                route: "reset-password",
                fullRoute: "/auth/reset-password"
            }
        }
    },

    APP: {
        name: "App",
        route: "/app",

        children: {
            EXPLORE: {
                name: "Explore",
                route: "explore",
                fullRoute: "/app/explore",
            },
            SUBSCRIPTIONS: {
                name: "Subscriptions",
                route: "subscriptions",
                fullRoute: "/app/subscriptions"
            },
            CONTENT: {
                name: "Content",
                route: "content/:id",
                fullRoute: "/app/content/:id"
            },
            PROFILE: {
                name: "Profile",
                route: "profile",
                fullRoute: "/app/profile"
            },
        }
    }
};

// Types of authenitcation states - Essentially logged in and not
types.authType = {
    LOGGEDIN: 1,
    GUEST: 0
};

// Export
export default types;