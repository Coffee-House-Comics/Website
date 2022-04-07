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
                route: "/auth/register"
            },
            LOGIN: {
                name: "Login",
                route: "/auth/login"
            },
            LOGOUT: {
                name: "Logout",
                route: "/auth/logout"
            }
        }
    },

    APP: {
        name: "App",
        route: "/app",

        children: {
            EXPLORE: {
                name: "Explore",
                route: "/app/explore",
            },
            SUBSCRIPTIONS: {
                name: "Subscriptions",
                route: "/app/subscriptions"
            },
            CONTENT: {
                name: "Content",
                route: "/app/content/:id"
            },
            PROFILE: {
                name: "Profile",
                route: "/app/profile"
            },
        }
    },

    GENERATE_ROUTE: function (name) {
        // Because we ain't in typescript D:
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