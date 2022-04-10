// Each Type has its own enumeration

const types = {};

// Tab Type - Information associated with each tab
types.TabType = {
    DEFAULT: {
        name: "Default",
        route: "/",
        fullRoute: "/"
    },

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
            LOGOUT: {
                name: "Logout",
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
            // Used for viewing a published story or comic
            VIEW: {
                name: "View",
                route: "view/:id",
                fullRoute: "/app/view/:id"
            },
            // Used for editing an unpublished story or comic you own,
            EDIT: {
                name: "Edit",
                route: "edit/:id",
                fullRoute: "/app/edit/:id"
            },
            PROFILE: {
                name: "Profile",
                route: "profile/:id",
                fullRoute: "/app/profile/:id",
            },
        }
    },
    CREATION: {
        name: "Creation",
        route: "/edit",

        children: {
            COMIC: {
                name: "Edit Comic",
                route: "comic/:id",
                fullRoute: "/edit/comic/:id",
            },
            STORY: {
                name: "Edit Story",
                route: "story/:id",
                fullRoute: "/edit/story/:id",
            }
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