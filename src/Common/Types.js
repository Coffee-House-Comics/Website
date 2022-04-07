// Each Type has its own enumeration

const types = {};

// Tab Type - Information associated with each tab
types.TabType = {
    AUTH: {
        name: "Auth",
        route: "/auth",

        children: {
            REGISTER: {
                name: "Register",
                route: "register"
            },
            LOGIN: {
                name: "Login",
                route: "login"
            },
            LOGOUT: {
                name: "Logout",
                route: "logout"
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
            },
            SUBSCRIPTIONS: {
                name: "Subscriptions",
                route: "subscriptions"
            },
            CONTENT: {
                name: "Content",
                route: "content/:id"
            },
            PROFILE: {
                name: "Profile",
                route: "profile"
            },
        }
    },

    GENERATE_ROUTE: function (name) {
        // Because we aint in typescript D:
        if (!(name instanceof String))
            return null;

        console.log("GENERATE_ROUTE:", name);
        const evalKey = function (val) {
            if (name == val.name){
                console.log("MATCH with:", val.name);
                return val.route;
            }
                
            if (val.children) {
                Object.values(val.children).forEach( function (val) {
                    const res = evalKey(val);
                    if (res != null)
                        return res;
                })
            }

            return null;
        }

        Object.values(this).forEach(function (val) {
            const res = evalKey(val);
            if (res != null) {
                return res;
            }

            return null;
        });
    }
};

// Types of authenitcation states - Essentially logged in and not
types.authType = {
    LOGGEDIN: 1,
    GUEST: 0
};

// Export
export default types;